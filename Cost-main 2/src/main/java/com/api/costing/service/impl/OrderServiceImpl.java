package com.api.costing.service.Impl;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;

import com.api.costing.client.CheckoutItemDto;
import com.api.costing.io.repositories.*;
import com.api.costing.ui.model.request.*;
import com.api.costing.ui.model.response.TransactionHistoryResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.jboss.logging.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.api.costing.exception.AppException;
import com.api.costing.io.entity.CompanyEntity;
import com.api.costing.io.entity.InventoryCostPriceListEntity;
import com.api.costing.io.entity.InventoryEntity;
import com.api.costing.io.entity.InventorySellPriceListEntity;
import com.api.costing.io.entity.InventoryTransactionDetailEntity;
import com.api.costing.io.entity.OrderEntity;
import com.api.costing.io.entity.OrderItemEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.service.OrderService;
import com.api.costing.shared.GenerateRandomString;
import com.api.costing.ui.model.response.OrderDetailResponseModel;
import com.api.costing.ui.model.response.OrderItemResponseModel;
@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	InventoryRepository inventoryRepository;
	
	@Autowired
	InventoryCostPriceListRepository inventoryCostPriceListRepository;
	
	@Autowired
	InventoryTransactionDetailRepository inventoryTransactionDetailRepository;
	
	@Autowired
	GenerateRandomString generateRandomString;
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	EntityManager entityManager;

	@Autowired
	SupplierRepository supplierRepository;
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	DepartmentRepository departmentRepository;
	
	@Autowired
	OrderItemRepository orderItemRepository;

	@Autowired
	InventorySellPriceListRepository inventorySellPriceListRepository;
	
	private String rootDirectory = "src";

	private String uploadDir = rootDirectory + "/uploadedOrderDocuments/";
	@Value("${BASE_URL}")
	private String baseURL;

	@Value("${STRIPE_SECRET_KEY}")
	private String apiKey;

	Logger LOGGER = Logger.getLogger(OrderServiceImpl.class.getName());

	@Override
	public OrderDetailResponseModel createOrder(OrderDetailRequestModel orderDetail) {
		
		OrderDetailResponseModel returnValue = new OrderDetailResponseModel();
		OrderEntity newOrder = new OrderEntity();
		BeanUtils.copyProperties(orderDetail, newOrder);

		List<OrderItemEntity> orderItems = new ArrayList<>();		
	    for(OrderItemRequestModel item : orderDetail.getOrderItems()) {
	    	OrderItemEntity newOrderItemEntity = new OrderItemEntity(); 
	    	BeanUtils.copyProperties(item, newOrderItemEntity); 
			InventoryEntity inventoryEntity=inventoryRepository.findByInventoryId(item.getInventoryId());
	    	if(inventoryEntity.getAvailableQuantity() < item.getOrderQuantity()) {
	    		double unavailableQuantity = item.getOrderQuantity() - inventoryEntity.getAvailableQuantity();
	    		newOrderItemEntity.setOrderQuantity(item.getOrderQuantity() - unavailableQuantity);
	    		newOrderItemEntity.setPreOrderQuantity(item.getPreOrderQuantity() + unavailableQuantity);
	    	}
	    	orderItems.add(newOrderItemEntity);
	    }
		newOrder.setOrderItems(orderItems);
		
		String orderNumber = "";
		boolean orderIdUnique = false;
		while(!orderIdUnique) {
			orderNumber = generateRandomString.generateOrderNumber(7);
			if (orderRepository.findByOrderNumber(orderNumber) == null) {
				orderIdUnique = true;
			}
			
		}
		newOrder.setOrderNumber(orderNumber);
		newOrder.setOrderDateTime(Instant.now());
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		newOrder.setCreatedBy(auth.getName());
		OrderEntity savedOrderEntity = orderRepository.save(newOrder);
		

		for(OrderItemEntity orderItemEntity: savedOrderEntity.getOrderItems()) {
			OrderItemEntity orderItemSEntity=new OrderItemEntity();
            BeanUtils.copyProperties(orderItemEntity, orderItemSEntity);
            orderItemSEntity.setOrderId(savedOrderEntity.getOrderId());
            orderItemSEntity.setOrderQuantity(orderItemEntity.getOrderQuantity());
            orderItemSEntity.setInventoryId(orderItemEntity.getInventoryId());
			orderItemRepository.save(orderItemSEntity);
		}
		
		List<OrderItemEntity> orderItemEntities = orderItemRepository.findByOrderId(savedOrderEntity.getOrderId());
		for (OrderItemEntity orderItemEntity : orderItemEntities) {
			InventoryEntity inventoryEntity=inventoryRepository.findByInventoryId(orderItemEntity.getInventoryId());
			inventoryEntity.setAvailableQuantity(inventoryEntity.getAvailableQuantity() - orderItemEntity.getOrderQuantity());
			inventoryRepository.save(inventoryEntity);
			InventoryCostPriceListEntity inventoryCostPriceListEntity = inventoryCostPriceListRepository.findTopByInventoryIdAndIsDeletedOrderByInventoryCostPriceListIdDesc(inventoryEntity.getInventoryId(), false);
			InventorySellPriceListEntity inventorySellPriceListEntity = inventorySellPriceListRepository.findTopByInventoryIdAndIsDeletedOrderByInventorySellPriceListIdDesc(orderItemEntity.getInventoryId(), false);
			InventoryTransactionDetailEntity inventoryTransactionDetailEntity=new InventoryTransactionDetailEntity();
			inventoryTransactionDetailEntity.setInventoryId(orderItemEntity.getInventoryId());
			inventoryTransactionDetailEntity.setQuantity(orderItemEntity.getOrderQuantity() + orderItemEntity.getPreOrderQuantity());
			if(inventoryCostPriceListEntity!=null) {
				inventoryTransactionDetailEntity.setCostOfInventory(inventoryCostPriceListEntity.getCostOfInventory());
	    	}
	    	if(inventorySellPriceListEntity!=null) {
	    		inventoryTransactionDetailEntity.setSoldPrice(inventorySellPriceListEntity.getSellPrice());
				inventoryTransactionDetailEntity.setDiscountAmount(inventorySellPriceListEntity.getDiscountAmount());
	    	}

			inventoryTransactionDetailEntity.setTransactionType("Out");
			inventoryTransactionDetailEntity.setTransactionTime(Instant.now());
	    	inventoryTransactionDetailRepository.save(inventoryTransactionDetailEntity);
		}
		
		BeanUtils.copyProperties(savedOrderEntity, returnValue);
		
		return returnValue;
	}

	@Override
	public OrderDetailResponseModel getOrderByOrderId(long orderId) {
		
		OrderDetailResponseModel returnValue = new OrderDetailResponseModel();
		OrderEntity orderEntity = orderRepository.findByOrderId(orderId);
		if (orderEntity == null)
			throw new AppException("Order not found.");
		
		BeanUtils.copyProperties(orderEntity, returnValue);
		UserEntity userEntity = userRepository.findByUserId(orderEntity.getUserId());
		if(userEntity != null) {
	    	String fullName = userEntity.getFirstName() + " " + userEntity.getLastName();
	    	returnValue.setFullName(fullName);
    	}

    	CompanyEntity companyEntity = companyRepository.findByCompanyId(orderEntity.getCompanyId());
    	if(companyEntity != null) {
    		returnValue.setCompanyName(companyEntity.getCompanyName());
    	}


		List<OrderItemEntity> orderItemEntities = orderItemRepository.findByOrderIdAndIsDeleted(orderId, false);
		List<OrderItemResponseModel> orderItemsResponseModel = new ArrayList<OrderItemResponseModel>();
		for (OrderItemEntity orderItemEntity : orderItemEntities) {
			OrderItemResponseModel orderItemResponseModel = new OrderItemResponseModel();
			BeanUtils.copyProperties(orderItemEntity, orderItemResponseModel);
			InventoryEntity inventoryEntity=inventoryRepository.findByInventoryId(orderItemEntity.getInventoryId());
			if(inventoryEntity!=null)
				orderItemResponseModel.setInventoryGenericName(inventoryEntity.getInventoryGenericName());
			orderItemsResponseModel.add(orderItemResponseModel);
		}
		returnValue.setOrderItems(orderItemsResponseModel);

		returnValue.setCreatedDateTime(Instant.now());
		returnValue.setOrderedDateTime(orderEntity.getOrderDateTime());
		return returnValue;
	}

	@Override
	public List<OrderDetailResponseModel> getOrders(SearchRequestModel searchDetail, int page,
													int limit) {
		List<OrderDetailResponseModel> returnValue = new ArrayList<>();
	    
	    if(page > 0) page = page - 1;

		double totalProducts=0;
		double totalSuppliers=0;
		double totalCategorys=0;
		double totalEmpployees=0;
		double totalDepartments=0;
		 totalProducts = inventoryRepository.count();
		 totalCategorys = categoryRepository.count();
		 totalDepartments = departmentRepository.count();
		 totalEmpployees = employeeRepository.count();
		 totalSuppliers = supplierRepository.count();

		 List<InventoryTransactionDetailEntity> inventoryTransactionDetailEntities = inventoryTransactionDetailRepository.findByTransactionTimeNotNull();
		 List<TransactionHistoryResponse> transactionHistoryResponses = new ArrayList<>();
		 for (InventoryTransactionDetailEntity inventoryTransactionDetailEntity: inventoryTransactionDetailEntities){
			 TransactionHistoryResponse transactionHistoryResponse = new TransactionHistoryResponse();
			 BeanUtils.copyProperties(inventoryTransactionDetailEntity,transactionHistoryResponse);
			 transactionHistoryResponses.add(transactionHistoryResponse);
		 }
		int limitP=3;
		Page<InventoryEntity> pagesss = inventoryRepository.findAll(PageRequest.of(0, limitP, Sort.by(Sort.Order.desc("availableQuantity"))));

		List<InventoryEntity> inventoryEntities =  pagesss.getContent();
		List<InventoryDetailRequestModel> inventoryDetailRequestModels = new ArrayList<>();
		for(InventoryEntity inventoryEntity:inventoryEntities){
			InventoryDetailRequestModel inventoryDetailRequestModel = new InventoryDetailRequestModel();
			BeanUtils.copyProperties(inventoryEntity, inventoryDetailRequestModel);
			inventoryDetailRequestModels.add(inventoryDetailRequestModel);
		}

		String fromDate = searchDetail.getFromDate().trim().toLowerCase();
		String toDate = searchDetail.getToDate().trim().toLowerCase();
	    Instant toDateInstant = null;
		Instant fromDateInstant = null;

		if (!fromDate.equals("")) {
			LocalDate startDateInLocal = LocalDate.parse(fromDate.split("\\s+")[0]);
			fromDateInstant = startDateInLocal.atStartOfDay(ZoneId.systemDefault()).toInstant();
		}else {
			LocalDate startDateInLocal = LocalDate.now().minusYears(1000);
			fromDateInstant = startDateInLocal.atStartOfDay(ZoneId.systemDefault()).toInstant();
		}

		if (!toDate.equals("")) {
			LocalDate endDateInLocal = LocalDate.parse(toDate.split("\\s+")[0]);
			toDateInstant = endDateInLocal.atStartOfDay(ZoneId.systemDefault()).toInstant();
		}else {
			LocalDate endDateInLocal = LocalDate.now().plusYears(1000);
			toDateInstant = endDateInLocal.atStartOfDay(ZoneId.systemDefault()).toInstant();			
		}

		long totalRows = 0;
	    PageRequest.of(page, limit,Sort.by("orderId").descending());

	    List<Object> results = entityManager.createQuery(
				"SELECT DISTINCT o.orderId FROM orders o WHERE o.isDeleted=false AND o.createdAt>=:fromDateInstant AND o.createdAt<:toDateInstant ORDER BY o.orderId DESC",
				Object.class).setParameter("fromDateInstant", fromDateInstant).setParameter("toDateInstant", toDateInstant)
			.setFirstResult((page) * limit).setMaxResults(limit).getResultList();

		totalRows = (long) entityManager.createQuery(
				"SELECT count(*) FROM orders o WHERE o.isDeleted=false AND o.createdAt>=:fromDateInstant AND o.createdAt<:toDateInstant").setParameter("fromDateInstant", fromDateInstant).setParameter("toDateInstant", toDateInstant).getSingleResult();
		  
		List<Long> orderIds = new ArrayList<>();		
		for(Object result: results) {
			long orderId = (Long)result;
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			UserEntity userEntity = userRepository.findByUserId(auth.getName());

			orderIds.add(orderId);
		}
	    List<OrderEntity> orderEntities = orderRepository.findByOrderIdInAndIsDeletedOrderByOrderIdDesc(orderIds, false);
	    List<OrderEntity> filteredOrderEntities;
	    if(searchDetail.getOrderStatusTypeId() == null || searchDetail.getOrderStatusTypeId() == 0)
	    	filteredOrderEntities= orderEntities;
	    else {
		    filteredOrderEntities = orderEntities.stream().filter(o->{


		    	List<OrderItemEntity> validOrderItemEntities=orderItemRepository.findByOrderId(o.getOrderId()).stream().filter(oi->{
		    			return true;
		    	}).collect(Collectors.toList());
		    	//List<OrderItemStatusEntity> orderDetailStatusEntities=orderItemStatusRepository.findByOrderItemIdInAndOrderStatusTypeId(orderItemIds, orderStatusTypeId);
		    	return o.getOrderItems().size() == validOrderItemEntities.size();
		    }).collect(Collectors.toList());
	    }

	    for(OrderEntity orderEntity : filteredOrderEntities) {
	    	OrderDetailResponseModel orderDetailResponseModel = new OrderDetailResponseModel();
	    	BeanUtils.copyProperties(orderEntity, orderDetailResponseModel);

	    	UserEntity userEntity = userRepository.findByUserId(orderEntity.getUserId());
	    	if(userEntity != null) {
		    	String fullName = userEntity.getFirstName() + " " + userEntity.getLastName();
		    	orderDetailResponseModel.setFullName(fullName);
	    	}
	    	CompanyEntity companyEntity = companyRepository.findByCompanyId(orderEntity.getCompanyId());
	    	if(companyEntity != null) {
	    		orderDetailResponseModel.setCompanyName(companyEntity.getCompanyName());
	    	}
	    	if(returnValue.size() == 0) {
	    		orderDetailResponseModel.setTotalPages((int) Math.floor(totalRows / limit) + 1);
	    	}
			orderDetailResponseModel.setInventoryDetailRequestModels(inventoryDetailRequestModels);
			orderDetailResponseModel.setTotalCategorys(totalCategorys);
			orderDetailResponseModel.setTotalDepartments(totalDepartments);
			orderDetailResponseModel.setTotalEmpployees(totalEmpployees);
			orderDetailResponseModel.setTotalSuppliers(totalSuppliers);
			orderDetailResponseModel.setTotalProducts(totalProducts);
			orderDetailResponseModel.setTransactionHistoryResponses(transactionHistoryResponses);
	    	returnValue.add(orderDetailResponseModel);
	    }
	    
		return returnValue;
	}


	@Override
	public OrderItemStatusRequestModel changeOrderStatus(long orderId, OrderItemStatusRequestModel orderStatus) {
		
		OrderItemStatusRequestModel returnValue = new OrderItemStatusRequestModel();
		OrderEntity orderEntity = orderRepository.findByOrderId(orderId);
		
		if(orderEntity == null) 
			throw new AppException("Order not found.");
		//		if(!"".equals(orderStatus.getOrderStatus()) && orderStatus.getOrderStatus()!=null) 
		//		     orderEntity.setOrderStatus(orderStatus.getOrderStatus());	
		//		else if(!"".equals(orderStatus.getPreOrderStatus()) && orderStatus.getPreOrderStatus()!=null)
		//			orderEntity.setPreOrderStatus(orderStatus.getPreOrderStatus());
		OrderEntity updatesOrderEntity = orderRepository.save(orderEntity);
		
		BeanUtils.copyProperties(updatesOrderEntity, returnValue); 
		return returnValue;
	}

	@Override
	public OrderDetailResponseModel getOrdersByOrderNumber(String orderNumber) {
		OrderDetailResponseModel returnValue = new OrderDetailResponseModel();

		OrderEntity orderEntity;

			orderEntity = orderRepository.findByOrderNumberAndIsDeleted(orderNumber, false);

		if(orderEntity == null) throw new AppException("Order not found.");
		
		BeanUtils.copyProperties(orderEntity, returnValue);
		
		UserEntity userEntity = userRepository.findByUserId(orderEntity.getUserId());
		if(userEntity != null) {
	    	String fullName = userEntity.getFirstName() + " " + userEntity.getLastName();
	    	returnValue.setFullName(fullName);
    	}
    	CompanyEntity companyEntity = companyRepository.findByCompanyId(orderEntity.getCompanyId());
    	if(companyEntity != null) {
    		returnValue.setCompanyName(companyEntity.getCompanyName());
    	}
    	return returnValue;
	}

	@Override
	public List<OrderDetailResponseModel> getMyOrderHistory(String userId, int page, int limit) {
		
		List<OrderDetailResponseModel> returnValue = new ArrayList<>();
	    
	    if(page > 0) page = page - 1;

	    Pageable pageableRequest = PageRequest.of(page, limit,Sort.by("orderId").descending());
	    Page<OrderEntity> orderPage = orderRepository.findByUserId(userId, pageableRequest);
	    int totalPages = orderPage.getTotalPages();
	    List<OrderEntity> orderEntities = orderPage.getContent();
	    for(OrderEntity orderEntity : orderEntities) {
	    	OrderDetailResponseModel orderDetailResponseModel = new OrderDetailResponseModel();
	    	BeanUtils.copyProperties(orderEntity, orderDetailResponseModel);
	    	if(returnValue.size() == 0) {
	    		orderDetailResponseModel.setTotalPages(totalPages);
	    	}

//	    	orderDetailResponseModel.setOrderItems(this.getOrderItemResponseModels(orderEntity));
			returnValue.add(orderDetailResponseModel);
		}
		return returnValue;
	}

	public Session createSession(List<CheckoutItemDto> checkoutItemDtoList) throws StripeException {
		String successURL = baseURL + "/pages/payment/success";
		String failedURL = baseURL + "/pages/payment/failed";

		Stripe.apiKey = apiKey;
		List<SessionCreateParams.LineItem> sessionItemsList = new ArrayList<>();
		for (CheckoutItemDto checkoutItemDto : checkoutItemDtoList) {
			sessionItemsList.add(createSessionLineItem(checkoutItemDto));
		}
		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setCancelUrl(failedURL)
				.addAllLineItem(sessionItemsList)
				.setSuccessUrl(successURL)
				.build();
		return Session.create(params);
	}

	SessionCreateParams.LineItem createSessionLineItem(CheckoutItemDto checkoutItemDto) {
		return SessionCreateParams.LineItem.builder()
				// set price for each product
				.setPriceData(createPriceData(checkoutItemDto))
				// set quantity for each product
				.setQuantity(Long.parseLong(String.valueOf(checkoutItemDto.getQuantity())))
				.build();
	}

	SessionCreateParams.LineItem.PriceData createPriceData(CheckoutItemDto checkoutItemDto) {
		return SessionCreateParams.LineItem.PriceData.builder()
				.setCurrency("usd")
				.setUnitAmount((long)(checkoutItemDto.getPrice()*100))
				.setProductData(
						SessionCreateParams.LineItem.PriceData.ProductData.builder()
								.setName(checkoutItemDto.getProductName())
								.build())
				.build();
	}

}

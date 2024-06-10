
package com.api.costing.ui.model.response;

import com.api.costing.ui.model.request.InventoryDetailRequestModel;

import java.time.Instant;
import java.util.List;

public class OrderDetailResponseModel {
	
	private long orderId;
	
	private long companyId;
	
	private String companyName;
	
	private String fullName;
	
	private String userId;
	
	private String orderNumber;
	
	private String deliveryAddress;

	private Instant orderDateTime;
	
	private Instant createdDateTime;

	private Instant deliveryDateTime;
	
	private double totalPrice;
	
	private Instant orderedDateTime;
	
	private int totalPages;
	
	private String paymentOption;
	
	private double amountTobePaid;
	
	private Integer siteId;

	private Integer orderTypeId;
	private String orderType;
	
	private String siteName;

	private double totalProducts;
	private double totalSuppliers;
	private double totalCategorys;
	private double totalEmpployees;
	private double totalDepartments;
	
	List<OrderItemResponseModel> orderItems;

	List<InventoryDetailRequestModel> inventoryDetailRequestModels;
	List<TransactionHistoryResponse> transactionHistoryResponses;
	List<TransactionHistoryResponse> weekleyTransactionReports;
	private PaymentResponse paymentResponse;

	public PaymentResponse getPaymentResponse() {
		return paymentResponse;
	}

	public void setPaymentResponse(PaymentResponse paymentResponse) {
		this.paymentResponse = paymentResponse;
	}

	public void setTransactionHistoryResponses(List<TransactionHistoryResponse> transactionHistoryResponses) {
		this.transactionHistoryResponses = transactionHistoryResponses;
	}

	public void setWeekleyTransactionReports(List<TransactionHistoryResponse> weekleyTransactionReports) {
		this.weekleyTransactionReports = weekleyTransactionReports;
	}

	public List<TransactionHistoryResponse> getTransactionHistoryResponses() {
		return transactionHistoryResponses;
	}

	public List<TransactionHistoryResponse> getWeekleyTransactionReports() {
		return weekleyTransactionReports;
	}

	public void setTotalProducts(double totalProducts) {
		this.totalProducts = totalProducts;
	}

	public void setTotalSuppliers(double totalSuppliers) {
		this.totalSuppliers = totalSuppliers;
	}

	public void setTotalCategorys(double totalCategorys) {
		this.totalCategorys = totalCategorys;
	}

	public void setTotalEmpployees(double totalEmpployees) {
		this.totalEmpployees = totalEmpployees;
	}

	public void setTotalDepartments(double totalDepartments) {
		this.totalDepartments = totalDepartments;
	}

	public double getTotalProducts() {
		return totalProducts;
	}

	public double getTotalSuppliers() {
		return totalSuppliers;
	}

	public double getTotalCategorys() {
		return totalCategorys;
	}

	public double getTotalEmpployees() {
		return totalEmpployees;
	}

	public double getTotalDepartments() {
		return totalDepartments;
	}

	public void setInventoryDetailRequestModels(List<InventoryDetailRequestModel> inventoryDetailRequestModels) {
		this.inventoryDetailRequestModels = inventoryDetailRequestModels;
	}

	public List<InventoryDetailRequestModel> getInventoryDetailRequestModels() {
		return inventoryDetailRequestModels;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	
	public String getCompanyName() {
		return companyName;
	}
	
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	public String getFullName() {
		return fullName;
	}
	
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	public long getOrderId() {
		return orderId;
	}
	
	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}
	
	public long getCompanyId() {
		return companyId;
	}
	
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getOrderNumber() {
		return orderNumber;
	}
	
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	
	public String getDeliveryAddress() {
		return deliveryAddress;
	}
	
	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}
	
	public Instant getOrderDateTime() {
		return orderDateTime;
	}

	public void setOrderDateTime(Instant orderDateTime) {
		this.orderDateTime = orderDateTime;
	}

	public Instant getDeliveryDateTime() {
		return deliveryDateTime;
	}
	
	public void setDeliveryDateTime(Instant deliveryDateTime) {
		this.deliveryDateTime = deliveryDateTime;
	}
	
	public Instant getOrderedDateTime() {
		return orderedDateTime;
	}
	
	public void setOrderedDateTime(Instant orderedDateTime) {
		this.orderedDateTime = orderedDateTime;
	}
	
	public int getTotalPages() {
		return totalPages;
	}
	
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	
	public String getPaymentOption() {
		return paymentOption;
	}
	
	public void setPaymentOption(String paymentOption) {
		this.paymentOption = paymentOption;
	}
	
	public double getTotalPrice() {
		return totalPrice;
	}
	
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
	public double getAmountTobePaid() {
		return amountTobePaid;
	}

	public void setAmountTobePaid(double amountTobePaid) {
		this.amountTobePaid = amountTobePaid;
	}
	
	public Integer getSiteId() {
		return siteId;
	}
	
	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}
	
	public String getSiteName() {
		return siteName;
	}
	
	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}
	
	public List<OrderItemResponseModel> getOrderItems() {
		return orderItems;
	}
	
	public void setOrderItems(List<OrderItemResponseModel> orderItems) {
		this.orderItems = orderItems;
	}
	
	public Integer getOrderTypeId() {
		return orderTypeId;
	}
	
	public void setOrderTypeId(Integer orderTypeId) {
		this.orderTypeId = orderTypeId;
	}

	public Instant getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Instant createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	
}

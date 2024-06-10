package com.api.costing.controller;

import java.util.List;


import com.api.costing.client.CheckoutItemDto;
import com.api.costing.client.StripeResponse;
import com.api.costing.ui.model.response.PaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.api.costing.service.OrderService;
import com.api.costing.ui.model.request.OrderDetailRequestModel;
import com.api.costing.ui.model.request.OrderItemStatusRequestModel;
import com.api.costing.ui.model.request.SearchRequestModel;
import com.api.costing.ui.model.response.OrderDetailResponseModel;
@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	OrderService orderService;


	@PostMapping("/create-checkout-session")
	public ResponseEntity<StripeResponse> checkoutList(@RequestBody List<CheckoutItemDto>
																   checkoutItemDtoList)
			throws StripeException {
		// create the stripe session
		Session session = orderService.createSession(checkoutItemDtoList);
		StripeResponse stripeResponse = new StripeResponse(session.getId());
		// send the stripe session id in response
		return new ResponseEntity<StripeResponse>(stripeResponse, HttpStatus.OK);
	}
	@GetMapping(path="/{orderId}")
	public OrderDetailResponseModel getOrderByOrderId(@PathVariable long orderId) {

		OrderDetailResponseModel returnValue = orderService.getOrderByOrderId(orderId);
		return returnValue;
	}
	
	@GetMapping(path="search/{orderNumber}/{orderTypeId}")
	public OrderDetailResponseModel getOrdersByOrderNumber(@PathVariable String orderNumber, @PathVariable(required = false) Integer orderTypeId) {

		OrderDetailResponseModel returnValue = orderService.getOrdersByOrderNumber(orderNumber);
		return returnValue;
	}
	
	@GetMapping
	public List<OrderDetailResponseModel> getOrders(
			@RequestParam(value="searchKey", defaultValue = "") String searchKey, 
			@RequestParam(value="orderTypeId", defaultValue = "") Integer orderTypeId, 
			@RequestParam(value="orderStatusTypeId", defaultValue = "") Integer orderStatusTypeId, 
			@RequestParam(value="fromDate", defaultValue = "") String fromDate, 
			@RequestParam(value="toDate", defaultValue = "") String toDate, 
			@RequestParam(value="page", defaultValue = "1") int page,
			@RequestParam(value="limit", defaultValue = "25") int limit){
		
		SearchRequestModel searchDetail=new SearchRequestModel();
		searchDetail.setSearchKey(searchKey);
		searchDetail.setOrderTypeId(orderTypeId);
		searchDetail.setOrderStatusTypeId(orderStatusTypeId);
		searchDetail.setFromDate(fromDate);
		searchDetail.setToDate(toDate);
		List<OrderDetailResponseModel> returnValue = orderService.getOrders(searchDetail,page,limit);
		
		return returnValue;
	}
	
	@GetMapping(path="/myorderhistory/{userId}")
	public List<OrderDetailResponseModel> getMyOrderHistory(@PathVariable("userId") String userId, @RequestParam(value="page", defaultValue = "1") int page,
			@RequestParam(value="limit", defaultValue = "25") int limit){
		
		List<OrderDetailResponseModel> returnValue= orderService.getMyOrderHistory(userId,page,limit);
		
		return returnValue;
	}

	@PostMapping
	public OrderDetailResponseModel orderItems(@RequestBody OrderDetailRequestModel orderList) throws StripeException {
		OrderDetailResponseModel returnValue = orderService.createOrder(orderList);
		return returnValue;
	}
	
	@PutMapping(path="/changeorderstatus/{orderId}")
	public OrderItemStatusRequestModel changeOrderStatus(@PathVariable long orderId, @RequestBody OrderItemStatusRequestModel orderStatus) {
		
		
		OrderItemStatusRequestModel  returnValue = orderService.changeOrderStatus(orderId, orderStatus);
		 
		return returnValue;
	}

}

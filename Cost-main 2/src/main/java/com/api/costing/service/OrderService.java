package com.api.costing.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.api.costing.client.CheckoutItemDto;
import com.api.costing.ui.model.request.*;
import com.api.costing.ui.model.response.OrderDetailResponseModel;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

public interface OrderService {

	OrderDetailResponseModel createOrder(OrderDetailRequestModel orderList);
	OrderDetailResponseModel getOrderByOrderId(long orderId);
	List<OrderDetailResponseModel> getOrders(SearchRequestModel searchDetail, int page, int limit);
	OrderItemStatusRequestModel changeOrderStatus(long orderId, OrderItemStatusRequestModel orderStatus);
	OrderDetailResponseModel getOrdersByOrderNumber(String orderNumber);
	List<OrderDetailResponseModel> getMyOrderHistory(String userId, int page, int limit);
	Session createSession(List<CheckoutItemDto> checkoutItemDtoList) throws StripeException;
}

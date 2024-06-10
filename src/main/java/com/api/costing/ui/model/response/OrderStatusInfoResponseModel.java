package com.api.costing.ui.model.response;

import java.util.List;

public class OrderStatusInfoResponseModel {

	List<OrderItemsStatusResponseModel> orderItemsStatusInfo;

	public List<OrderItemsStatusResponseModel> getOrderItemsStatusInfo() {
		return orderItemsStatusInfo;
	}

	public void setOrderItemsStatusInfo(List<OrderItemsStatusResponseModel> orderItemsStatusInfo) {
		this.orderItemsStatusInfo = orderItemsStatusInfo;
	}


}

package com.api.costing.ui.model.request;

public class SingleOrderItemStatusRequestModel extends OrderItemStatusRequestModel {
	private long orderItemId;

	public long getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(long orderItemId) {
		this.orderItemId = orderItemId;
	}

}

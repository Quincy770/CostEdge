package com.api.costing.ui.model.request;

public class ProductPriceRequestModel {

	private Integer productId;
	private float price;

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getPrice() {
		return price;
	}
}

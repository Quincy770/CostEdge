package com.api.costing.ui.model.request;

public class RegionPriceRequestModel {
	private Integer regionId;
	private Integer productId;
	private float price;
	private float discount;

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public void setDiscount(float discount) {
		this.discount = discount;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public Integer getProductId() {
		return productId;
	}

	public float getPrice() {
		return price;
	}

	public float getDiscount() {
		return discount;
	}
}

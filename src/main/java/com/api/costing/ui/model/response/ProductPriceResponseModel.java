package com.api.costing.ui.model.response;

import java.time.Instant;

public class ProductPriceResponseModel {

	private Integer productPriceId;
	private Integer productId;
	private String productName;
	private float price;
	private String createdBy;
	private Instant createdAt;
	private String updatedBy;
	private Instant updatedAt;
	private Integer totalPage;

	public void setProductPriceId(Integer productPriceId) {
		this.productPriceId = productPriceId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}

	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getProductPriceId() {
		return productPriceId;
	}

	public Integer getProductId() {
		return productId;
	}

	public String getProductName() {
		return productName;
	}

	public float getPrice() {
		return price;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public Integer getTotalPage() {
		return totalPage;
	}
}

package com.api.costing.ui.model.response;

import java.time.Instant;

public class SupplierResponseModel {

	private Integer supplierId;
	private String name;
	private String email;
	private String phone;

	private String createdBy;
	private Instant createdAt;
	private String updatedBy;
	private Instant updatedAt;
	private Integer totalPage;

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}


	public String getUpdatedBy() {
		return updatedBy;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}


	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getSupplierId() {
		return supplierId;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPhone() {
		return phone;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Integer getTotalPage() {
		return totalPage;
	}
}

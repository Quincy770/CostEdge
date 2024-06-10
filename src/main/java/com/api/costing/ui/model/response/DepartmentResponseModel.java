package com.api.costing.ui.model.response;
import java.time.Instant;
public class DepartmentResponseModel {
	private Integer departmentId;
	private String name;
	private String createdBy;
	private Instant createdAt;
	private String updatedBy;
	private Instant updatedAt;
	private Integer totalPage;
	private String description;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDescription() {
		return description;
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
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}


}

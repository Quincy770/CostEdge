package com.api.costing.io.entity;

import com.api.costing.model.audit.Audit;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "supplier")
public class SupplierEntity extends Audit implements Serializable{

	private static final long serialVersionUID = -7949700668992132228L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer supplierId;
	@Column
	private String name;
	@Column
	private String email;

	@Column
	private String phone;
	
	@Column
	private boolean isDeleted = false;

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

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
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

	public boolean isDeleted() {
		return isDeleted;
	}
}

package com.api.costing.io.entity;


import com.api.costing.model.audit.Audit;

import javax.persistence.*;
import java.io.Serializable;
@Entity(name = "department")
public class DepartmentEntity extends Audit implements Serializable{

	private static final long serialVersionUID = 5699029109191668206L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer departmentId;
	
	@Column
	private String name;

	@Column(length = 15)
	private boolean isDeleted=false;

	private String description;

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public String getName() {
		return name;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public void setName(String name) {
		this.name = name;
	}
}

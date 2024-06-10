package com.api.costing.io.entity;

import com.api.costing.model.audit.Audit;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "region")
public class RegionEntity extends Audit implements Serializable{
	private static final long serialVersionUID = -7949700668992132228L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer regionId;
	@Column(nullable = false)
	private String name;
	@Column
	private String description;

	@Column
	private boolean isDeleted=false;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}
	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getRegionId() {
		return regionId;
	}
	public String getName() {
		return name;
	}
}

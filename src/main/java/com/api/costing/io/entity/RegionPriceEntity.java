package com.api.costing.io.entity;

import com.api.costing.model.audit.Audit;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name ="region_price")
public class RegionPriceEntity extends Audit implements Serializable{
	private static final long serialVersionUID = 5244277275781598812L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer regionPriceId;
	@Column
	private Integer regionId;
	@Column
	private Integer productId;
	@Column
	private float price;
	@Column
	private float discount;
	@Column
	private boolean isDeleted=false;

	public void setRegionPriceId(Integer regionPriceId) {
		this.regionPriceId = regionPriceId;
	}

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

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}

	public Integer getRegionPriceId() {
		return regionPriceId;
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

	public boolean isDeleted() {
		return isDeleted;
	}
}

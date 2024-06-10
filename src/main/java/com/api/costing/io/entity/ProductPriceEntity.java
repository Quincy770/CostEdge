package com.api.costing.io.entity;


import com.api.costing.model.audit.Audit;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "productPrice")
public class ProductPriceEntity extends Audit implements Serializable{

	private static final long serialVersionUID = -3078307816085732075L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productPriceId;
	@Column
	private Integer productId;
	@Column
	private float price;
	@Column
	private boolean isDeleted = false;

	public void setProductPriceId(Integer productPriceId) {
		this.productPriceId = productPriceId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}

	public Integer getProductPriceId() {
		return productPriceId;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getPrice() {
		return price;
	}

	public boolean isDeleted() {
		return isDeleted;
	}
}

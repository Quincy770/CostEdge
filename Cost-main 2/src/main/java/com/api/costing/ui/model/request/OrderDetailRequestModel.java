
package com.api.costing.ui.model.request;

import java.time.Instant;
import java.util.List;

public class OrderDetailRequestModel {

	private long companyId;
	private String companyName;
	private String fullName;
	private String userId;
	private double totalPrice;
	
	private Instant orderDateTime;
	private int totalPages;

	private double amountTobePaid;
	private String transactionID;
	List<OrderItemRequestModel> orderItems;
	
	public long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Instant getOrderDateTime() {
		return orderDateTime;
	}
	public void setOrderDateTime(Instant orderDateTime) {
		this.orderDateTime = orderDateTime;
	}

	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public double getAmountTobePaid() {
		return amountTobePaid;
	}
	public void setAmountTobePaid(double amountTobePaid) {
		this.amountTobePaid = amountTobePaid;
	}

	public String getTransactionID() {
		return transactionID;
	}
	public void setTransactionID(String transactionID) {
		this.transactionID = transactionID;
	}
	
	public List<OrderItemRequestModel> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<OrderItemRequestModel> orderItems) {
		this.orderItems = orderItems;
	}

}
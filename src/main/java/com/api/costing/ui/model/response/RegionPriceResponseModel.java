package com.api.costing.ui.model.response;

import java.time.Instant;

public class RegionPriceResponseModel {

    private Integer regionId;
    private Integer productId;
    private float price;
    private float discount;


    private String createdBy;
    private Instant createdAt;
    private String updatedBy;
    private Instant updatedAt;
    private Integer totalPage;

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

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getTotalPage() {
        return totalPage;
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

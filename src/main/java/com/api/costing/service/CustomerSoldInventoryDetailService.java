package com.api.costing.service;

import com.api.costing.ui.model.request.CustomerSoldInventoryDetailRequestModel;
import com.api.costing.ui.model.response.CustomerSoldInventoryDetailResponseModel;

public interface CustomerSoldInventoryDetailService {

	CustomerSoldInventoryDetailResponseModel updateCustomerSoldInventoryDetail(
			CustomerSoldInventoryDetailRequestModel customerSoldInventoryDetail, long customerSoldInventoryDetailId);

	CustomerSoldInventoryDetailResponseModel getCustomerSoldInventoryDetail(long customerSoldInventoryDetailId);

	String deleteCustomerSoldInventoryDetail(long customerSoldInventoryDetailId);

}

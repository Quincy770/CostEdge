package com.api.costing.service;

import java.util.List;

import com.api.costing.ui.model.request.CustomerSoldInventoryRequestModel;
import com.api.costing.ui.model.response.CustomerSoldInventoryResponseModel;

public interface CustomerSoldInventoryService {

	CustomerSoldInventoryResponseModel saveCustomerSoldInventory(
			CustomerSoldInventoryRequestModel customerSoldInventoryDetail);

//	List<CustomerSoldInventoryResponseModel> getAllCustomerSoldInventories(int page, int limit, String searchKey);

	CustomerSoldInventoryResponseModel getCustomerSoldInventory(long customerSoldInventoryId);

	CustomerSoldInventoryResponseModel updateCustomerInventoryTransaction(long customerSoldInventoryId,
			CustomerSoldInventoryRequestModel customerSoldInventoryDetail);

	String deleteCustomerSoldInventory(long customerSoldInventoryId);

	List<CustomerSoldInventoryResponseModel> getAllCustomerSoldInventories(int page, int limit, String searchKey,
			long companyId, String userType);

}

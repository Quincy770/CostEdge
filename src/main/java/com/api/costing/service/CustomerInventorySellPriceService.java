package com.api.costing.service;

import java.util.List;

import com.api.costing.ui.model.request.CustomerInventorySellPriceRequestModel;
import com.api.costing.ui.model.response.CustomerInventorySellPriceResponseModel;

public interface CustomerInventorySellPriceService {

	String deleteCustomerInventorySellPrice(long customerInventorySellPriceId);

	CustomerInventorySellPriceResponseModel updateCustomerInventorySellPrice(long customerInventorySellPriceId,
			CustomerInventorySellPriceRequestModel customerInventorySellPriceDetail);

	CustomerInventorySellPriceResponseModel getCustomerInventorySellPrice(long customerInventorySellPriceId);

	List<CustomerInventorySellPriceResponseModel> getAllCustomerInventorySellPrices(int page, int limit,
			long inventoryId, long companyId);

	CustomerInventorySellPriceResponseModel saveCustomerInventorySelllPrice(
			CustomerInventorySellPriceRequestModel customerInventorySellPriceDetail);

}

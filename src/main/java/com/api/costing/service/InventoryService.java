
package com.api.costing.service;

import java.io.IOException;
import java.util.List;

import com.api.costing.ui.model.request.ImportInventoryDataRequestModel;
import com.api.costing.ui.model.request.ImportInventoryRequestModel;
import com.api.costing.ui.model.request.InventoryCategoryRequestModel;
import com.api.costing.ui.model.request.InventoryRequestModel;
import com.api.costing.ui.model.request.SearchRequestModel;
import com.api.costing.ui.model.response.InventoryCategoryResponse;

public interface InventoryService {

	InventoryRequestModel insertNewInventory(InventoryRequestModel inventoryDetails) throws IOException;

	InventoryRequestModel getInventoryByInventoryId(long inventoryId);

	List<InventoryRequestModel> getInventeryItems(String customerType, int page, int limit);

	InventoryRequestModel updateInventoryItem(long inventoryId, InventoryRequestModel inventoryItem) throws IOException;

	List<InventoryRequestModel> searchInventeryItems(SearchRequestModel searchkeyDetail, int page, int limit);

	List<InventoryCategoryResponse> getInventoryCategories();

	String importInventoryItems(ImportInventoryRequestModel importInventoryDetails) throws IOException;

	List<InventoryRequestModel> getSelectedInventeryItems(Long[] inventoryIds);

	String importPatientData(ImportInventoryDataRequestModel requestDetail) throws IOException;

	String importInventoryCategory(InventoryCategoryRequestModel importInventoryCategoryDetails) throws IOException;	

}

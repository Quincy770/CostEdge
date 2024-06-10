package com.api.costing.service;

import com.api.costing.ui.model.response.InventorySellPriceDetail;

public interface InventoryPriceListService {

	InventorySellPriceDetail getInventoryItemPriceList(long inventoryId, Integer page, Integer limit);

}

package com.api.costing.io.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.api.costing.io.entity.InventoryCostPriceListEntity;

public interface InventoryCostPriceListRepository extends PagingAndSortingRepository<InventoryCostPriceListEntity, Long> {

	InventoryCostPriceListEntity findByInventoryIdAndCostOfInventory(long inventoryId, double d);
	
	List<InventoryCostPriceListEntity> findByInventoryId(long inventoryId);
		
	List<InventoryCostPriceListEntity> findByInventoryId(long inventoryId, Sort ascending);

	InventoryCostPriceListEntity findTopByInventoryIdAndIsDeletedOrderByInventoryCostPriceListIdDesc(long inventoryId, boolean isDeleted);
}


package com.api.costing.io.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.api.costing.io.entity.InventoryTransactionDetailEntity;

import java.time.Instant;
import java.util.List;

public interface InventoryTransactionDetailRepository extends PagingAndSortingRepository<InventoryTransactionDetailEntity, Long>{

	InventoryTransactionDetailEntity findByInventoryTransactionDetailId(long inventoryTransactionDetailId);

	Page<InventoryTransactionDetailEntity> findByInventoryId(long inventoryId, Pageable pageableRequest);

    List<InventoryTransactionDetailEntity> findByTransactionTimeNotNull();

    List<InventoryTransactionDetailEntity> findByCreatedAtBetween(Instant currentDate, Instant lastYear);
}

package com.api.costing.io.repositories;

import com.api.costing.io.entity.SupplierEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SupplierRepository extends PagingAndSortingRepository<SupplierEntity, Integer> {

	Page<SupplierEntity> findByIsDeleted(boolean b, Pageable pageableRequest);

	SupplierEntity findBySupplierIdAndIsDeleted(Integer supplierId, boolean b);

	Page<SupplierEntity> findByIsDeletedAndNameContaining(boolean b, String searchKey, Pageable pageableRequest);

}

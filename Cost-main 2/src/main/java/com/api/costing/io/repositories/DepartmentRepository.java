package com.api.costing.io.repositories;

import com.api.costing.io.entity.DepartmentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DepartmentRepository extends PagingAndSortingRepository<DepartmentEntity, Integer> {

	DepartmentEntity findByDepartmentIdAndIsDeleted(Integer departmentId, boolean b);

	Page<DepartmentEntity> findByIsDeleted(boolean b, Pageable pageableRequest);

    Page<DepartmentEntity> findByIsDeletedAndNameContainingOrDescriptionContaining(boolean b, String searchKey, String searchKey1, Pageable pageableRequest);
}

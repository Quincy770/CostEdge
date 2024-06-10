package com.api.costing.io.repositories;

import com.api.costing.io.entity.EmployeeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
public interface EmployeeRepository extends PagingAndSortingRepository<EmployeeEntity, Integer> {

	Page<EmployeeEntity> findByIsDeleted(boolean b, Pageable pageableRequest);
	EmployeeEntity findByEmployeeIdAndIsDeleted(Integer employeeId, boolean b);
	Page<EmployeeEntity> findByIsDeletedAndFirstNameContaining(boolean b, String searchKey,
			Pageable pageableRequest);
    Page<EmployeeEntity> findByIsDeletedAndFirstNameContainingOrMiddleNameContainingOrLastNameContainingOrEmailContainingOrPhoneNumberContaining(boolean b, String searchKey, String searchKey1, String searchKey2, String searchKey3, String searchKey4, Pageable pageableRequest);
}

package com.api.costing.io.repositories;

import com.api.costing.io.entity.RegionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RegionRepository extends PagingAndSortingRepository<RegionEntity, Integer> {

	Page<RegionEntity> findByIsDeleted(boolean b, Pageable pageableRequest);

	RegionEntity findByRegionIdAndIsDeleted(Integer regionId, boolean b);
	Page<RegionEntity> findByIsDeletedAndNameContaining(boolean b, String searchKey, Pageable pageableRequest);

	
	

}

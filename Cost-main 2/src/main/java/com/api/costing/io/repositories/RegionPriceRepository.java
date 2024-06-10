package com.api.costing.io.repositories;

import com.api.costing.io.entity.RegionPriceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
public interface RegionPriceRepository extends PagingAndSortingRepository<RegionPriceEntity, Integer> {
	Page<RegionPriceEntity> findByIsDeleted(boolean b, Pageable pageableRequest);
	RegionPriceEntity findByRegionPriceIdAndIsDeleted(Integer collectionSiteId, boolean b);
	List<RegionPriceEntity> findByIsDeleted(boolean b);
	

}

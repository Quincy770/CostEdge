package com.api.costing.io.repositories;

import com.api.costing.io.entity.ProductPriceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductPriceRepository extends PagingAndSortingRepository<ProductPriceEntity, Integer> {

	Page<ProductPriceEntity> findByIsDeleted(boolean b, Pageable pageableRequest);

	ProductPriceEntity findByProductPriceIdAndIsDeleted(Integer productPriceId, boolean b);

}

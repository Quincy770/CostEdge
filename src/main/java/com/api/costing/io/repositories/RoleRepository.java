package com.api.costing.io.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.api.costing.io.entity.RoleEntity;

@Repository
public interface RoleRepository extends PagingAndSortingRepository<RoleEntity, Long> {
//    Optional<RoleEntity> findByName(RoleName roleUser);

	RoleEntity findByRoleName(String userRole);

}

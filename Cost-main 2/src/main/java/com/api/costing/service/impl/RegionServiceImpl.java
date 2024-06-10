package com.api.costing.service.Impl;

import com.api.costing.exception.AppException;
import com.api.costing.io.entity.RegionEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.io.repositories.RegionRepository;
import com.api.costing.io.repositories.UserRepository;
import com.api.costing.service.RegionService;
import com.api.costing.ui.model.request.RegionRequestModel;
import com.api.costing.ui.model.response.RegionResponseModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RegionServiceImpl implements RegionService {
	@Autowired
	RegionRepository regionRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public String saveRegion(RegionRequestModel regionDetail) {
		RegionEntity regionEntity = new RegionEntity();
		BeanUtils.copyProperties(regionDetail, regionEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		regionEntity.setCreatedBy(auth.getName());
		RegionEntity savedRegion = regionRepository.save(regionEntity);
//		BeanUtils.copyProperties(savedRegion, returnValue);
		return "Region saved successfully!";
	}

	@Override
	public RegionResponseModel getRegion(Integer regionId) {
		RegionResponseModel returnValue = new RegionResponseModel();
		RegionEntity regionEntity = regionRepository.findByRegionIdAndIsDeleted(regionId, false);
		if (regionEntity == null)
			throw new AppException("No region with this id");
	BeanUtils.copyProperties(regionEntity, returnValue);
		UserEntity userEntity = userRepository.findByUserId(regionEntity.getCreatedBy());
		if (userEntity != null)
			returnValue.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
		else
			returnValue.setCreatedBy("");
		return returnValue;
	}

	@Override
	public RegionResponseModel updateRegion(Integer regionId, RegionRequestModel regionDetail) {
		RegionResponseModel returnValue = new RegionResponseModel();
		RegionEntity regionEntity = regionRepository.findByRegionIdAndIsDeleted(regionId, false);
		if (regionEntity == null)
			throw new AppException("the Region is not available");
		BeanUtils.copyProperties(regionDetail, regionEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		regionEntity.setCreatedBy(auth.getName());
		RegionEntity savedRegion = regionRepository.save(regionEntity);
		BeanUtils.copyProperties(savedRegion, returnValue);
		return returnValue;
	}

	@Override
	public String deleteRegion(Integer regionId) {
		RegionEntity regionEntity = regionRepository.findByRegionIdAndIsDeleted(regionId, false);
		if (regionEntity == null)
			throw new AppException("Invalid region");
		regionEntity.setDeleted(true);
		regionRepository.save(regionEntity);
		return "region Deleted";
	}

	@Override
	public List<RegionResponseModel> getAllRegions(String searchKey, int page, int limit) {
		List<RegionResponseModel> returnValue = new ArrayList<>();
		if (page > 0)
			page = page - 1;
		Pageable pageableRequest = PageRequest.of(page, limit,Sort.by("regionId").descending());
		Page<RegionEntity> regionPage = null;
		if ("".equals(searchKey))
			regionPage = regionRepository.findByIsDeleted(false, pageableRequest);// .findAll(pageableRequest);
		else
			regionPage = regionRepository.findByIsDeletedAndNameContaining(false, searchKey, pageableRequest);// .findAll(pageableRequest);
		List<com.api.costing.io.entity.RegionEntity> regions = regionPage.getContent();
		int totalPages = regionPage.getTotalPages();
		for (RegionEntity regionEntity : regions) {
			RegionResponseModel regionResponseModel = new RegionResponseModel();
			BeanUtils.copyProperties(regionEntity, regionResponseModel);
			UserEntity userEntity = userRepository.findByUserId(regionEntity.getCreatedBy());
			if (userEntity != null)
				regionResponseModel.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
			else
				regionResponseModel.setCreatedBy("");
			if (returnValue.size() == 0) {
				regionResponseModel.setTotalPage(totalPages);
			}

			returnValue.add(regionResponseModel);
		}
		return returnValue;
	}
}

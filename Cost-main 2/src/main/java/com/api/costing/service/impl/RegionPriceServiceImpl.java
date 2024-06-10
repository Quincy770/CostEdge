package com.api.costing.service.Impl;

import com.api.costing.exception.AppException;
import com.api.costing.io.entity.RegionPriceEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.io.repositories.RegionPriceRepository;
import com.api.costing.io.repositories.UserRepository;
import com.api.costing.service.RegionPriceService;
import com.api.costing.ui.model.request.RegionPriceRequestModel;
import com.api.costing.ui.model.response.RegionPriceResponseModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RegionPriceServiceImpl implements RegionPriceService{
	@Autowired
	RegionPriceRepository regionPriceRepository;

	@Autowired
	UserRepository userRepository;
	@Override
	public List<RegionPriceResponseModel> getAllRegionPrices(int page, int limit, String searchKey) {
		
		List<RegionPriceResponseModel> returnValue = new ArrayList<>();
	    if(page > 0) page = page - 1;
	    Pageable pageableRequest = PageRequest.of(page, limit);
	    Page<RegionPriceEntity> regionPricesPage = null;
	    	regionPricesPage = regionPriceRepository.findByIsDeleted(false,pageableRequest);
		List<RegionPriceEntity> regionPrices = regionPricesPage.getContent();
	    int totalPages = regionPricesPage.getTotalPages();	    
	    for(RegionPriceEntity regionPriceEntity : regionPrices) {
	    	RegionPriceResponseModel regionPriceResponseModel = new RegionPriceResponseModel(); 
	    	BeanUtils.copyProperties(regionPriceEntity, regionPriceResponseModel);
//	    	if(returnValue.size() == 0) {
//	    		regionPriceResponseModel.setTotalPage(totalPages);
//	    	}
			UserEntity userEntity = userRepository.findByUserId(regionPriceEntity.getCreatedBy());
			if (userEntity != null)
				regionPriceResponseModel.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
			else
				regionPriceResponseModel.setCreatedBy("");
	    	returnValue.add(regionPriceResponseModel);

	    }
		return returnValue;
	}

	@Override
	public RegionPriceResponseModel getRegionPrice(Integer regionPriceId) {
		RegionPriceResponseModel returnValue = new RegionPriceResponseModel();
		RegionPriceEntity regionPriceEntity = regionPriceRepository.findByRegionPriceIdAndIsDeleted(regionPriceId,false);
		if(regionPriceEntity == null)
			throw new AppException("No Region price with this id");
		BeanUtils.copyProperties(regionPriceEntity, returnValue);
		UserEntity userEntity = userRepository.findByUserId(regionPriceEntity.getCreatedBy());
		if (userEntity != null)
			returnValue.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
		else
			returnValue.setCreatedBy("");
		return returnValue;
	}

	@Override
	public RegionPriceResponseModel saveRegionPrice(RegionPriceRequestModel regionPriceDEtailDetail) {
		RegionPriceResponseModel returnValue = new RegionPriceResponseModel();
		RegionPriceEntity regionPriceEntity = new RegionPriceEntity();
		BeanUtils.copyProperties(regionPriceDEtailDetail, regionPriceEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		regionPriceEntity.setCreatedBy(auth.getName());
		RegionPriceEntity savedDetail = regionPriceRepository.save(regionPriceEntity);
		BeanUtils.copyProperties(savedDetail, returnValue);
		return returnValue;
	}

	@Override
	public RegionPriceResponseModel updateRegionPrice(Integer regionPriceId, RegionPriceRequestModel regionPriceDetail) {
		RegionPriceResponseModel returnValue = new RegionPriceResponseModel();
		RegionPriceEntity regionPriceEntity = regionPriceRepository.findByRegionPriceIdAndIsDeleted(regionPriceId, false);
		if(regionPriceEntity==null)
			throw new AppException("No region price with this id");
		BeanUtils.copyProperties(regionPriceDetail, regionPriceEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		regionPriceEntity.setCreatedBy(auth.getName());
		RegionPriceEntity savedDetail = regionPriceRepository.save(regionPriceEntity);
		BeanUtils.copyProperties(savedDetail, returnValue);
		return returnValue;
	}

	@Override
	public String deleteRegionPrice(Integer orderId) {
		RegionPriceEntity regionPriceEntity = regionPriceRepository.findByRegionPriceIdAndIsDeleted(orderId, false);
		if(regionPriceEntity == null)
			throw new AppException("Invalid region price Id");
		regionPriceEntity.setDeleted(true);;
		regionPriceRepository.save(regionPriceEntity);
		return "Result Deleted";
	}

	
}

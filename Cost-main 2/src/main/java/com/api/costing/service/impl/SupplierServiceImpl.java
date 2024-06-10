package com.api.costing.service.Impl;

import com.api.costing.exception.AppException;
import com.api.costing.io.entity.SupplierEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.io.repositories.SupplierRepository;
import com.api.costing.io.repositories.UserRepository;
import com.api.costing.service.SupplierService;
import com.api.costing.ui.model.request.SupplierRequestModel;
import com.api.costing.ui.model.response.SupplierResponseModel;
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
public class SupplierServiceImpl implements SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public SupplierResponseModel saveSupplier(SupplierRequestModel supplierDetail) {
		SupplierResponseModel returnValue = new SupplierResponseModel();
		SupplierEntity supplierEntity = new SupplierEntity();
		BeanUtils.copyProperties(supplierDetail, supplierEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		supplierEntity.setCreatedBy(auth.getName());
		SupplierEntity savedSupplierEntity = supplierRepository.save(supplierEntity);
		BeanUtils.copyProperties(savedSupplierEntity, returnValue);
		return returnValue;
	}

	@Override
	public List<SupplierResponseModel> getAllSuppliers(String searchKey, int page, int limit) {
		
		 List<SupplierResponseModel> returnValue = new ArrayList<>();
		    if(page > 0) page = page - 1;
		    Pageable pageableRequest = PageRequest.of(page, limit,Sort.by("supplierId").ascending());
		    Page<SupplierEntity> supplierPage = null;
		    if("".equals(searchKey))
		    	supplierPage = supplierRepository.findByIsDeleted(false, pageableRequest);//.findAll(pageableRequest);
		    else
		    	supplierPage = supplierRepository.findByIsDeletedAndNameContaining(false,searchKey, pageableRequest);//.findAll(pageableRequest);
		    List<SupplierEntity> suppliers = supplierPage.getContent();
		    int totalPages = supplierPage.getTotalPages();	    
		    for(SupplierEntity supplierEntity : suppliers) {
		    	SupplierResponseModel supplierResponseModel = new SupplierResponseModel(); 
		    	BeanUtils.copyProperties(supplierEntity, supplierResponseModel);
		    	UserEntity userEntity= userRepository.findByUserId(supplierEntity.getCreatedBy());
				if(userEntity!=null)
					supplierResponseModel.setCreatedBy(userEntity.getFirstName()+" "+userEntity.getLastName());
		    	else
		    		supplierResponseModel.setCreatedBy("");
		    	if(returnValue.size() == 0) {
		    		supplierResponseModel.setTotalPage(totalPages);
		    	}

		    	returnValue.add(supplierResponseModel);
		    }
		return returnValue;
	}

	@Override
	public SupplierResponseModel getSupplier(Integer supplierId) {
		SupplierResponseModel returnValue = new SupplierResponseModel();
		SupplierEntity supplierEntity = supplierRepository.findBySupplierIdAndIsDeleted(supplierId,false);
		if(supplierEntity == null)
			throw new AppException("No supplier with this id");
		BeanUtils.copyProperties(supplierEntity, returnValue);
		UserEntity userEntity = userRepository.findByUserId(supplierEntity.getCreatedBy());
		if (userEntity != null)
			returnValue.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
		else
			returnValue.setCreatedBy("");
		return returnValue;
	}

	@Override
	public SupplierResponseModel updateSupplier(Integer supplierId, SupplierRequestModel supplierDetail) {
		SupplierResponseModel returnValue = new SupplierResponseModel();
		SupplierEntity supplierEntity = supplierRepository.findBySupplierIdAndIsDeleted(supplierId, false);
		BeanUtils.copyProperties(supplierDetail, supplierEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		supplierEntity.setCreatedBy(auth.getName());
		SupplierEntity savedSupplier = supplierRepository.save(supplierEntity);
		BeanUtils.copyProperties(savedSupplier, returnValue);
		return returnValue;
	}

	@Override
	public String deleteSupplier(Integer supplierId) {
		SupplierEntity supplierEntity = supplierRepository.findBySupplierIdAndIsDeleted(supplierId,false);
		if(supplierEntity == null)
			throw new AppException("Invalid supplierId");
		supplierEntity.setDeleted(true);
		supplierRepository.save(supplierEntity);
		return "Supplier Deleted";
	}
	
}

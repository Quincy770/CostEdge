package com.api.costing.service.Impl;

import com.api.costing.exception.AppException;
import com.api.costing.io.entity.DepartmentEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.io.repositories.DepartmentRepository;
import com.api.costing.io.repositories.UserRepository;
import com.api.costing.service.DepartmentService;
import com.api.costing.ui.model.request.DepartmentRequestModel;
import com.api.costing.ui.model.response.DepartmentResponseModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService{
	
	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public List<DepartmentResponseModel> getAllDepartments(int page, int limit, String searchKey) {
		List<com.api.costing.ui.model.response.DepartmentResponseModel> returnValue = new ArrayList<>();
	    if(page > 0) page = page - 1;
	    Pageable pageableRequest = PageRequest.of(page, limit);
	    Page<DepartmentEntity> departmentsPage = null;
	    if("".equals(searchKey))    
	    	departmentsPage = departmentRepository.findByIsDeleted(false,pageableRequest);
	    departmentsPage = departmentRepository.findByIsDeletedAndNameContainingOrDescriptionContaining(false, searchKey,searchKey,pageableRequest);
	    List<com.api.costing.io.entity.DepartmentEntity> departments = departmentsPage.getContent();
	    int totalPages = departmentsPage.getTotalPages();	    
	    for(DepartmentEntity departmentEntity : departments) {
	    	DepartmentResponseModel departmentResponseModel = new DepartmentResponseModel();
	    	BeanUtils.copyProperties(departmentEntity, departmentResponseModel);
	    	if(returnValue.size() == 0) {
	    		departmentResponseModel.setTotalPage(totalPages);
	    	}
			UserEntity userEntity = userRepository.findByUserId(departmentEntity.getCreatedBy());
			if (userEntity != null)
				departmentResponseModel.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
			else
				departmentResponseModel.setCreatedBy("");
	    	returnValue.add(departmentResponseModel);
	    }
		return returnValue;
	}

	@Override
	public DepartmentResponseModel getDepartment(Integer departmentId) {
		DepartmentResponseModel returnValue = new DepartmentResponseModel();
		DepartmentEntity departmentEntity = departmentRepository.findByDepartmentIdAndIsDeleted(departmentId,false);
		if(departmentEntity == null)
			throw new AppException("No department with this id");
		BeanUtils.copyProperties(departmentEntity, returnValue);
		UserEntity userEntity = userRepository.findByUserId(departmentEntity.getCreatedBy());
		if (userEntity != null)
			returnValue.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
		else
			returnValue.setCreatedBy("");
		return returnValue;
	}
	@Override
	public DepartmentResponseModel saveDepartment(DepartmentRequestModel departmentDetail) {
		DepartmentResponseModel returnValue = new DepartmentResponseModel();
		DepartmentEntity departmentEntity = new DepartmentEntity();
		BeanUtils.copyProperties(departmentDetail, departmentEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		departmentEntity.setCreatedBy(auth.getName());
		DepartmentEntity savedDetail = departmentRepository.save(departmentEntity);
		BeanUtils.copyProperties(savedDetail, returnValue);
		return returnValue;
	}

	@Override
	public DepartmentResponseModel updateDepartment(Integer departmentId, DepartmentRequestModel departmentDetail) {
		DepartmentResponseModel returnValue = new DepartmentResponseModel();
		DepartmentEntity departmentEntity = departmentRepository.findByDepartmentIdAndIsDeleted(departmentId, false);
		if(departmentEntity==null)
			throw new AppException("No department with this id");
		BeanUtils.copyProperties(departmentDetail, departmentEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		departmentEntity.setUpdatedBy(auth.getName());
		DepartmentEntity savedDetail = departmentRepository.save(departmentEntity);
		BeanUtils.copyProperties(savedDetail, returnValue);
		return returnValue;
	}

	@Override
	public String deleteDepartment(Integer departmentId) {
		DepartmentEntity departmentEntity = departmentRepository.findByDepartmentIdAndIsDeleted(departmentId, false);
		if(departmentEntity == null)
			throw new AppException("Invalid department Id");
		departmentEntity.setDeleted(true);;
		departmentRepository.save(departmentEntity);
		return "Result Deleted";
	}

}

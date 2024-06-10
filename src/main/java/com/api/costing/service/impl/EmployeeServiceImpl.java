package com.api.costing.service.Impl;

import com.api.costing.exception.AppException;
import com.api.costing.io.entity.EmployeeEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.io.repositories.EmployeeRepository;
import com.api.costing.io.repositories.UserRepository;
import com.api.costing.service.EmployeeService;
import com.api.costing.ui.model.request.EmployeeRequestModel;
import com.api.costing.ui.model.response.EmployeeResponseModel;
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
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	EmployeeRepository employeeRepository;

	@Override
	public EmployeeResponseModel saveEmployee(EmployeeRequestModel employeeDetail) {
		
		EmployeeResponseModel returnValue = new EmployeeResponseModel();
		EmployeeEntity employeeEntity = new com.api.costing.io.entity.EmployeeEntity();
		
		BeanUtils.copyProperties(employeeDetail, employeeEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		employeeEntity.setCreatedBy(auth.getName());
		EmployeeEntity savedEmployeeEntity = employeeRepository.save(employeeEntity);
		BeanUtils.copyProperties(savedEmployeeEntity, returnValue);
		return returnValue;
	}

	@Override
	public List<EmployeeResponseModel> getAllEmployees(String searchKey, int page, int limit) {
		
		 List<EmployeeResponseModel> returnValue = new ArrayList<>();
		    
		    if(page > 0) page = page - 1; 
		   
		    Pageable pageableRequest = PageRequest.of(page, limit,Sort.by("employeeId").ascending());
		    Page<com.api.costing.io.entity.EmployeeEntity> employeePage = null;
		    
		    if("".equals(searchKey))
		    	employeePage = employeeRepository.findByIsDeleted(false, pageableRequest);//.findAll(pageableRequest);
		    else
		    	employeePage = employeeRepository.
						findByIsDeletedAndFirstNameContainingOrMiddleNameContainingOrLastNameContainingOrEmailContainingOrPhoneNumberContaining(false,
								searchKey,searchKey,searchKey,searchKey,searchKey, pageableRequest);//.findAll(pageableRequest);
		    
		    List<com.api.costing.io.entity.EmployeeEntity> employees = employeePage.getContent();
		    
		    
		    
		    int totalPages = employeePage.getTotalPages();	    
		    for(com.api.costing.io.entity.EmployeeEntity employeeEntity : employees) {
		    	
		    	EmployeeResponseModel employeeResponseModel = new EmployeeResponseModel(); 
		    	BeanUtils.copyProperties(employeeEntity, employeeResponseModel);
		    	
		    	UserEntity userEntity= userRepository.findByUserId(employeeEntity.getCreatedBy());
				if(userEntity!=null)
					employeeResponseModel.setCreatedBy(userEntity.getFirstName()+" "+userEntity.getLastName());
		    	else
		    		employeeResponseModel.setCreatedBy("");
				
		    	if(returnValue.size() == 0) {
		    		employeeResponseModel.setTotalPage(totalPages);
		    	}
		    	
		    	returnValue.add(employeeResponseModel);
		    }
		return returnValue;
	}

	@Override
	public EmployeeResponseModel getEmployee(Integer employeeId) {
		EmployeeResponseModel returnValue = new EmployeeResponseModel();
		com.api.costing.io.entity.EmployeeEntity employeeEntity = employeeRepository.findByEmployeeIdAndIsDeleted(employeeId,false);
		if(employeeEntity == null)
			throw new AppException("No employee with this id");
		BeanUtils.copyProperties(employeeEntity, returnValue);
		UserEntity userEntity = userRepository.findByUserId(employeeEntity.getCreatedBy());
		if (userEntity != null)
			returnValue.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
		else
			returnValue.setCreatedBy("");
		return returnValue;
	}

	@Override
	public EmployeeResponseModel updateEmployee(Integer employeeId, EmployeeRequestModel employeeDetail) {
		EmployeeResponseModel returnValue = new EmployeeResponseModel();
		com.api.costing.io.entity.EmployeeEntity employeeEntity = employeeRepository.findByEmployeeIdAndIsDeleted(employeeId, false);
		
		BeanUtils.copyProperties(employeeDetail, employeeEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		employeeEntity.setCreatedBy(auth.getName());
		com.api.costing.io.entity.EmployeeEntity savedEmployee = employeeRepository.save(employeeEntity);
		BeanUtils.copyProperties(savedEmployee, returnValue);
		return returnValue;
	}

	@Override
	public String deleteEmployee(Integer employeeId) {
		EmployeeEntity employeeEntity = employeeRepository.findByEmployeeIdAndIsDeleted(employeeId,false);
		if(employeeEntity == null)
			throw new AppException("Invalid employeeId");
		employeeEntity.setDeleted(true);
		employeeRepository.save(employeeEntity);
		return "Employee Deleted";
	}
	
}

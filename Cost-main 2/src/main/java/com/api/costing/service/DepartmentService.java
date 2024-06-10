package com.api.costing.service;

import com.api.costing.ui.model.request.DepartmentRequestModel;
import com.api.costing.ui.model.response.DepartmentResponseModel;

import java.util.List;

public interface DepartmentService {

	DepartmentResponseModel saveDepartment(DepartmentRequestModel departmentDetail);
	List<DepartmentResponseModel> getAllDepartments(int page, int limit, String searchKey);
	DepartmentResponseModel getDepartment(Integer departmentId);
	DepartmentResponseModel updateDepartment(Integer departmentId, DepartmentRequestModel departmentDetail);
	String deleteDepartment(Integer departmentId);

}

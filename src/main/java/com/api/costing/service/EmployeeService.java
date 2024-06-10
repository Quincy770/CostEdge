package com.api.costing.service;

import com.api.costing.ui.model.request.EmployeeRequestModel;
import com.api.costing.ui.model.response.EmployeeResponseModel;

import java.util.List;

public interface EmployeeService {

	EmployeeResponseModel saveEmployee(EmployeeRequestModel employeeDetail);
	List<EmployeeResponseModel> getAllEmployees(String searchKey, int page, int limit);
	EmployeeResponseModel getEmployee(Integer employeeId);
	EmployeeResponseModel updateEmployee(Integer employeeId, EmployeeRequestModel employeeDetail);
	String deleteEmployee(Integer employeeId);

}

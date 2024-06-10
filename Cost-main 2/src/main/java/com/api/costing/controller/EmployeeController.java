package com.api.costing.controller;

import com.api.costing.service.EmployeeService;
import com.api.costing.ui.model.request.EmployeeRequestModel;
import com.api.costing.ui.model.response.EmployeeResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping
	public EmployeeResponseModel saveEmployee(@RequestBody EmployeeRequestModel employeeDetail) {
		EmployeeResponseModel returnValue = employeeService.saveEmployee(employeeDetail);
		return returnValue; 
		
	}
	
	@GetMapping
	public List<EmployeeResponseModel> getAllEmployees(@RequestParam(value="searchKey", defaultValue = "") String searchKey, @RequestParam(value="page", defaultValue = "1") int page,
			   @RequestParam(value="limit", defaultValue = "1000") int limit){
		
		List<EmployeeResponseModel> returnValue = employeeService.getAllEmployees(searchKey, page,limit);
		
		return returnValue;
		
	}
	@GetMapping(path = "/{employeeId}")
	public EmployeeResponseModel getEmployee(@PathVariable Integer employeeId) {
		EmployeeResponseModel returnValue = employeeService.getEmployee(employeeId); 
		return returnValue;
	}
	
	@PutMapping(path="/{employeeId}")
	public EmployeeResponseModel updateEmployee(@PathVariable Integer employeeId,@RequestBody EmployeeRequestModel employeeDetail) {
		EmployeeResponseModel returnValue = employeeService.updateEmployee(employeeId,employeeDetail);
		return returnValue;
	}
	@DeleteMapping(path="/{employeeId}")
	public String deleteEmployee(@PathVariable Integer employeeId) {
		
		String returnValue=employeeService.deleteEmployee(employeeId);
		return returnValue;
	}

}

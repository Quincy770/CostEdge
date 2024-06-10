package com.api.costing.controller;

import com.api.costing.service.SupplierService;
import com.api.costing.ui.model.request.SupplierRequestModel;
import com.api.costing.ui.model.response.SupplierResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
	
	@Autowired
	SupplierService supplierService;
	
	@PostMapping
	public SupplierResponseModel saveSupplier(@RequestBody SupplierRequestModel supplierDetail) {
		SupplierResponseModel returnValue = supplierService.saveSupplier(supplierDetail);
		return returnValue; 
		
	}
	
	@GetMapping
	public List<SupplierResponseModel> getAllSuppliers(@RequestParam(value="searchKey", defaultValue = "") String searchKey, @RequestParam(value="page", defaultValue = "1") int page,
													   @RequestParam(value="limit", defaultValue = "1000") int limit){
		
		List<SupplierResponseModel> returnValue = supplierService.getAllSuppliers(searchKey, page,limit);
		
		return returnValue;
		
	}
	@GetMapping(path = "/{supplierId}")
	public SupplierResponseModel getSupplier(@PathVariable Integer supplierId) {
		SupplierResponseModel returnValue = supplierService.getSupplier(supplierId);
		return returnValue;
	}
	
	@PutMapping(path="/{supplierId}")
	public SupplierResponseModel updateSupplier(@PathVariable Integer supplierId, @RequestBody SupplierRequestModel supplierDetail) {
		SupplierResponseModel returnValue = supplierService.updateSupplier(supplierId,supplierDetail);
		return returnValue;
	}
	@DeleteMapping(path="/{supplierId}")
	public String deleteSupplier(@PathVariable Integer supplierId) {
		
		String returnValue=supplierService.deleteSupplier(supplierId);
		return returnValue;
	}

}

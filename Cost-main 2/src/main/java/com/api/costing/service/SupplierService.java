package com.api.costing.service;

import com.api.costing.ui.model.request.SupplierRequestModel;
import com.api.costing.ui.model.response.SupplierResponseModel;

import java.util.List;

public interface SupplierService {

	SupplierResponseModel saveSupplier(SupplierRequestModel supplierDetail);
	List<SupplierResponseModel> getAllSuppliers(String searchKey, int page, int limit);
	SupplierResponseModel getSupplier(Integer supplierId);
	SupplierResponseModel updateSupplier(Integer supplierId, SupplierRequestModel supplierDetail);
	String deleteSupplier(Integer supplierId);

}

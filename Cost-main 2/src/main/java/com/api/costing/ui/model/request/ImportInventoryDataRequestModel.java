package com.api.costing.ui.model.request;

import org.springframework.web.multipart.MultipartFile;

public class ImportInventoryDataRequestModel {

	private MultipartFile importExcel;

	public MultipartFile getImportExcel() {
		return importExcel;
	}

	public void setImportExcel(MultipartFile importExcel) {
		this.importExcel = importExcel;
	}
}
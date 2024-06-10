package com.api.costing.service;

import com.api.costing.ui.model.request.RegionRequestModel;
import com.api.costing.ui.model.response.RegionResponseModel;

import java.util.List;

public interface RegionService {

	String saveRegion(RegionRequestModel regionDetail);
	RegionResponseModel getRegion(Integer regionId);
	RegionResponseModel updateRegion(Integer regionId, RegionRequestModel regionDetail);
	String deleteRegion(Integer regionId);
	List<RegionResponseModel> getAllRegions(String searchKey, int page, int limit);

}

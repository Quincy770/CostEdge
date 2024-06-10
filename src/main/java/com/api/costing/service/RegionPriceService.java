package com.api.costing.service;

import com.api.costing.ui.model.request.RegionPriceRequestModel;
import com.api.costing.ui.model.response.RegionPriceResponseModel;

import java.util.List;

public interface RegionPriceService {
	RegionPriceResponseModel getRegionPrice(Integer regionPriceId);

	List<RegionPriceResponseModel> getAllRegionPrices(int page, int limit, String searchKey);
	RegionPriceResponseModel saveRegionPrice(RegionPriceRequestModel regionPriceDetail);
	RegionPriceResponseModel updateRegionPrice(Integer regionPriceId, RegionPriceRequestModel regionPriceDetail);
	String deleteRegionPrice(Integer regionPriceId);
}

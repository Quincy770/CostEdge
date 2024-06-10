package com.api.costing.controller;

import com.api.costing.service.RegionPriceService;
import com.api.costing.ui.model.request.RegionPriceRequestModel;
import com.api.costing.ui.model.response.RegionPriceResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/region-price")
public class RegionPriceController {
	
	@Autowired
	RegionPriceService regionPriceService;
	
	@PostMapping
	public RegionPriceResponseModel saveRegionPrice(@RequestBody RegionPriceRequestModel regionPriceDetail) {
		RegionPriceResponseModel returnValue = regionPriceService.saveRegionPrice(regionPriceDetail);
		return returnValue;
	}
	
	@PutMapping(path = "/{regionPriceId}")
	public RegionPriceResponseModel updateRegionPrice(@PathVariable Integer regionPriceId, @RequestBody RegionPriceRequestModel regionPriceDetail) {
		RegionPriceResponseModel returnValue = regionPriceService.updateRegionPrice(regionPriceId, regionPriceDetail);
		return returnValue;
	}
	
	@GetMapping(path = "/{regionPriceId}")
	public RegionPriceResponseModel getRegionPrice(@PathVariable Integer regionPriceId) {
		RegionPriceResponseModel returnValue = regionPriceService.getRegionPrice(regionPriceId);
		return returnValue;
	}
	
	@GetMapping
	public List<RegionPriceResponseModel> getAllRegionPrices(@RequestParam(value="searchKey", defaultValue = "") String searchKey, @RequestParam(value="page", defaultValue = "1") int page,
			   @RequestParam(value="limit", defaultValue = "25") int limit){
		
		List<RegionPriceResponseModel> returnValue = regionPriceService.getAllRegionPrices(
				page,limit, searchKey);
		
		return returnValue;
		
	}
	
	@DeleteMapping(path="/{regionPriceId}")
	public String deleteRegionPrice(@PathVariable Integer regionPriceId) {
		
		String returnValue=regionPriceService.deleteRegionPrice(regionPriceId);
		return returnValue;
	}

}

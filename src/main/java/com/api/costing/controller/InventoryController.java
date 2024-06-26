package com.api.costing.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.costing.service.InventoryService;
import com.api.costing.ui.model.request.ImportInventoryRequestModel;
import com.api.costing.ui.model.request.InventoryCategoryRequestModel;
import com.api.costing.ui.model.request.InventoryRequestModel;
import com.api.costing.ui.model.request.SearchRequestModel;
import com.api.costing.ui.model.response.InventoryCategoryResponse;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

	@Autowired
	InventoryService inventoryService;
	
	@GetMapping(path="/{inventoryId}")
	public InventoryRequestModel getInventoryByInventoryId(@PathVariable long inventoryId) {

		InventoryRequestModel requestedInventory = inventoryService.getInventoryByInventoryId(inventoryId);
		return requestedInventory;
	}
	
	@GetMapping(path="/category")
	public List<InventoryCategoryResponse> getInventoryCategories() {

		List<InventoryCategoryResponse> returnValue = inventoryService.getInventoryCategories();
		
		return returnValue;
	}

	@GetMapping(path="/selected-items")
	public List<InventoryRequestModel> getInventerySelectedItems(@RequestParam Long[] inventoryIds){
		List<InventoryRequestModel> inventoryItems= inventoryService.getSelectedInventeryItems(inventoryIds);
		
		return inventoryItems;
	}

	@GetMapping
	public List<InventoryRequestModel> getInventeryItems(@RequestParam(value="customerType", defaultValue = "") String customerType, @RequestParam(value="page", defaultValue = "1") int page,
								   @RequestParam(value="limit", defaultValue = "25") int limit){
			
		List<InventoryRequestModel> inventoryItems= inventoryService.getInventeryItems(customerType, page,limit);
		
		return inventoryItems;
	}

	@PostMapping(path="/search")
	public List<InventoryRequestModel> searchInventeryItems(@RequestBody SearchRequestModel searchkeyDetail, @RequestParam(value="page", defaultValue = "1") int page,
								   @RequestParam(value="limit", defaultValue = "25") int limit){
			
		List<InventoryRequestModel> inventoryItems= inventoryService.searchInventeryItems(searchkeyDetail,page,limit);
		
		return inventoryItems;
	}
	
	@PostMapping
	public InventoryRequestModel insertNewInventory(@ModelAttribute InventoryRequestModel inventoryDetails) throws IOException {
		
		InventoryRequestModel insertNewInventory = inventoryService.insertNewInventory(inventoryDetails);
		
		return insertNewInventory;
	}
	
	@PostMapping(path="/import")
	public String importInventoryItems(@ModelAttribute ImportInventoryRequestModel importInventoryDetails) throws IOException {
		
		String returnValue = inventoryService.importInventoryItems(importInventoryDetails);
		
		return returnValue;
	}
	
	@PostMapping(path = "/import-category")
	public String importInventoryCategory(@ModelAttribute InventoryCategoryRequestModel importInventoryCategoryDetails)
	        throws IOException {
		
		String returnValue = inventoryService.importInventoryCategory(importInventoryCategoryDetails);
		
		return returnValue;
	}
	
	@PutMapping(path="/{inventoryId}")
	public InventoryRequestModel updateInventoryItem(@PathVariable long inventoryId, @ModelAttribute InventoryRequestModel inventoryItem) throws IOException {
		
		InventoryRequestModel returnValue = inventoryService.updateInventoryItem(inventoryId, inventoryItem);
		return returnValue;
	}
	
	
}

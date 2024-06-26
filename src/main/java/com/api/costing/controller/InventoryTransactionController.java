package com.api.costing.controller;

import java.util.ArrayList;
import java.util.List;

import com.api.costing.ui.model.response.TransactionHistoryForDashboard;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.costing.service.InventoryTransactionService;
import com.api.costing.shared.dto.InventoryItemsDto;
import com.api.costing.ui.model.request.InventoryItemsRequestModel;
import com.api.costing.ui.model.request.InventorySellPriceRequestModel;
import com.api.costing.ui.model.request.InventoryTransactionUpdateRequestModel;
import com.api.costing.ui.model.response.CustomerReportResponseModel;
import com.api.costing.ui.model.response.ManufacturerReportResponseModel;
import com.api.costing.ui.model.response.TransactionHistoryResponse;

@RestController
@RequestMapping("/inventorytransaction")
public class InventoryTransactionController {

	@Autowired
	InventoryTransactionService inventoryTransactionService;
	
	@PostMapping
	public String inserttransaction(@RequestBody List<InventoryItemsRequestModel> inventoryItems) {
		String returnvalue = inventoryTransactionService.InsertInventoryItems(inventoryItems);
		return returnvalue;
	}
	
	@GetMapping(path="/{inventoryTransactionDetailId}")
	public TransactionHistoryResponse getInventoryByInventoryId(@PathVariable long inventoryTransactionDetailId) {

		TransactionHistoryResponse returnValue = inventoryTransactionService.getTransactionByInventoryTransactionDetailId(inventoryTransactionDetailId);
		return returnValue;
	}
	
	@GetMapping
	public List<TransactionHistoryResponse> getTransactionHistory(@RequestParam(value="page", defaultValue = "1") int page,
								   @RequestParam(value="limit", defaultValue = "25") int limit){
		
		List<TransactionHistoryResponse> returnValue = new ArrayList<>();
		
		List<InventoryItemsDto> inventoryItemsDtos= inventoryTransactionService.getTransactionHistory(page,limit);
		
		for(InventoryItemsDto  inventoryItemsDto: inventoryItemsDtos) {
			TransactionHistoryResponse transactionHistory = new TransactionHistoryResponse();
			BeanUtils.copyProperties(inventoryItemsDto, transactionHistory);
			returnValue.add(transactionHistory);
		}
		
		return returnValue;
	}
	
	@GetMapping(path="/search/{inventoryId}")
	public List<TransactionHistoryResponse> searchTransactionHistory(@PathVariable long inventoryId, @RequestParam(value="page", defaultValue = "1") int page,
								   @RequestParam(value="limit", defaultValue = "25") int limit){
		
		List<TransactionHistoryResponse> returnValue = new ArrayList<>();
		
		List<InventoryItemsDto> inventoryItemsDtos= inventoryTransactionService.searchTransactionHistory(inventoryId,page,limit);
		
		for(InventoryItemsDto  inventoryItemsDto: inventoryItemsDtos) {
			TransactionHistoryResponse transactionHistory = new TransactionHistoryResponse();
			BeanUtils.copyProperties(inventoryItemsDto, transactionHistory);
			returnValue.add(transactionHistory);
		}
		
		return returnValue;
	}
	
	@PutMapping(path="/{inventoryTransactionDetailId}")
	public InventoryTransactionUpdateRequestModel updateInventoryItem(@PathVariable long inventoryTransactionDetailId, @RequestBody InventoryTransactionUpdateRequestModel newTransactionDetail) {
		
		InventoryTransactionUpdateRequestModel returnValue = inventoryTransactionService.updateInventoryTransactionHistory(inventoryTransactionDetailId, newTransactionDetail);
		return returnValue;
	}
	
	@PostMapping(path = "/sell-price")
	public InventorySellPriceRequestModel insertInventorySellPrice(
	        @RequestBody InventorySellPriceRequestModel requestDetail) {
		
		InventorySellPriceRequestModel returnValue = inventoryTransactionService.insertInventorySellPrice(requestDetail);
		return returnValue;
	}
	
	@GetMapping(path = "/report")
	public List<ManufacturerReportResponseModel> inventoryReport(@RequestParam(value = "page", defaultValue = "1") int page,
	        @RequestParam(value = "limit", defaultValue = "25") int limit,
	        @RequestParam(value = "fromDate", defaultValue = "") String fromDate,
	        @RequestParam(value = "toDate", defaultValue = "") String toDate,
	        @RequestParam(value = "inventoryId", defaultValue = "0") long inventoryId) {
		System.out.print(fromDate + " " + toDate);
		List<ManufacturerReportResponseModel> returnValue = inventoryTransactionService.inventoryReport(page, limit,
		    fromDate, toDate, inventoryId);
		return returnValue;
	}
	
	@GetMapping(path = "/customer-report")
	public List<CustomerReportResponseModel> customerInventoryReport(
	        @RequestParam(value = "page", defaultValue = "1") int page,
	        @RequestParam(value = "limit", defaultValue = "25") int limit,
	        @RequestParam(value = "fromDate", defaultValue = "") String fromDate,
	        @RequestParam(value = "toDate", defaultValue = "") String toDate,
	        @RequestParam(value = "inventoryId", defaultValue = "0") long inventoryId,
	        @RequestParam(value = "customerId", defaultValue = "") String customerId) {
		
		List<CustomerReportResponseModel> returnValue = inventoryTransactionService.customerInventoryReport(page, limit,
		    fromDate, toDate, inventoryId, customerId);
		return returnValue;
	}

	@GetMapping(path = "/reporting")
	public TransactionHistoryForDashboard getDashboardData(){
		TransactionHistoryForDashboard returnValue = inventoryTransactionService.getDashboardData();
		return returnValue;
	}
}

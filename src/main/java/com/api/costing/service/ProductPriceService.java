package com.api.costing.service;

import com.api.costing.ui.model.request.ProductPriceRequestModel;
import com.api.costing.ui.model.response.ProductPriceResponseModel;

import java.util.List;

public interface ProductPriceService {

	ProductPriceResponseModel saveProductPrice(ProductPriceRequestModel productPriceDetail);
	List<ProductPriceResponseModel> getAllProductPrices(String searchKey, int page, int limit);
	ProductPriceResponseModel getProductPrice(Integer productPriceId);
	ProductPriceResponseModel updateProductPrice(Integer productPriceId, ProductPriceRequestModel productPriceDetail);
	String deleteProductPrice(Integer productPriceId);

}

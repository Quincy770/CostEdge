package com.api.costing.service.Impl;

import com.api.costing.exception.AppException;
import com.api.costing.io.entity.ProductPriceEntity;
import com.api.costing.io.entity.UserEntity;
import com.api.costing.io.repositories.ProductPriceRepository;
import com.api.costing.io.repositories.UserRepository;
import com.api.costing.service.ProductPriceService;
import com.api.costing.ui.model.request.ProductPriceRequestModel;
import com.api.costing.ui.model.response.ProductPriceResponseModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductPriceServiceImpl implements ProductPriceService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	ProductPriceRepository productPriceRepository;


	@Override
	public ProductPriceResponseModel saveProductPrice(ProductPriceRequestModel productPriceDetail) {
		ProductPriceResponseModel returnValue = new ProductPriceResponseModel();
		ProductPriceEntity productPriceEntity = new ProductPriceEntity();
		BeanUtils.copyProperties(productPriceDetail, productPriceEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		productPriceEntity.setCreatedBy(auth.getName());
		ProductPriceEntity savedProductPriceEntity = productPriceRepository.save(productPriceEntity);
		BeanUtils.copyProperties(savedProductPriceEntity, returnValue);
		return returnValue;
	}

	@Override
	public List<ProductPriceResponseModel> getAllProductPrices(String searchKey, int page, int limit) {
        List<ProductPriceResponseModel> returnValue = new ArrayList<>();
	    if(page > 0) page = page - 1;
	    Pageable pageableRequest = PageRequest.of(page, limit,Sort.by("productPriceId").descending());
	    Page<ProductPriceEntity> productPricePage = null;
		productPricePage = productPriceRepository.findByIsDeleted(false, pageableRequest);//.findAll(pageableRequest);

	    List<ProductPriceEntity> productPrices = productPricePage.getContent();
	    int totalPages = productPricePage.getTotalPages();	    
	    for(ProductPriceEntity productPriceEntity : productPrices) {
	    	ProductPriceResponseModel productPriceResponseModel = new ProductPriceResponseModel(); 
	    	BeanUtils.copyProperties(productPriceEntity, productPriceResponseModel);
	    	UserEntity userEntity= userRepository.findByUserId(productPriceEntity.getCreatedBy());
			if(userEntity!=null)
				productPriceResponseModel.setCreatedBy(userEntity.getFirstName()+" "+userEntity.getLastName());
	    	else
	    		productPriceResponseModel.setCreatedBy("");
	    	if(returnValue.size() == 0) {
	    		productPriceResponseModel.setTotalPage(totalPages);
	    	}


	    	returnValue.add(productPriceResponseModel);
	    }
	  return returnValue;
	}

	@Override
	public ProductPriceResponseModel getProductPrice(Integer productPriceId) {
		ProductPriceResponseModel returnValue = new ProductPriceResponseModel();
		ProductPriceEntity productPriceEntity = productPriceRepository.findByProductPriceIdAndIsDeleted(productPriceId,false);
		if(productPriceEntity == null)
			throw new AppException("No region with this id");
BeanUtils.copyProperties(productPriceEntity,returnValue);
		UserEntity userEntity = userRepository.findByUserId(productPriceEntity.getCreatedBy());
		if (userEntity != null)
			returnValue.setCreatedBy(userEntity.getFirstName() + " " + userEntity.getLastName());
		else
			returnValue.setCreatedBy("");
		return returnValue;
	}

	@Override
	public ProductPriceResponseModel updateProductPrice(Integer productPriceId, ProductPriceRequestModel productPriceDetail) {
		ProductPriceResponseModel returnValue = new ProductPriceResponseModel();
		ProductPriceEntity productPriceEntity = productPriceRepository.findByProductPriceIdAndIsDeleted(productPriceId, false);
		BeanUtils.copyProperties(productPriceDetail, productPriceEntity);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		productPriceEntity.setCreatedBy(auth.getName());
		ProductPriceEntity savedProductPrice = productPriceRepository.save(productPriceEntity);
		BeanUtils.copyProperties(savedProductPrice, returnValue);
		return returnValue;
	}

	@Override
	public String deleteProductPrice(Integer productPriceId) {
		ProductPriceEntity productPriceEntity = productPriceRepository.findByProductPriceIdAndIsDeleted(productPriceId,false);
		if(productPriceEntity == null)
			throw new AppException("Invalid productPrice");
		productPriceEntity.setDeleted(true);
		productPriceRepository.save(productPriceEntity);
		return "productPrice Deleted";
	}

}

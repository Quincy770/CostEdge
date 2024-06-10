package com.api.costing.service;

import java.util.List;

import com.api.costing.shared.dto.UserDto;
import com.api.costing.ui.model.request.SearchRequestModel;

public interface CompanyService {

	UserDto getCompanyById(long companyId);

	List<UserDto> getCompanies(int page, int limit);

	UserDto updateCompany(long id, UserDto userDto);

	List<UserDto> searchCompanies(SearchRequestModel searchkey, int page, int limit);

}

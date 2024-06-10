package com.api.costing.service;

import java.util.List;

import com.api.costing.ui.model.request.CountryRequestModel;
import com.api.costing.ui.model.response.CountryResponseModel;

public interface CountryService {

	CountryResponseModel saveCountry(CountryRequestModel countryDetail);

	List<CountryResponseModel> getAllCountries(String searchKey, int page, int limit);

	CountryResponseModel getCountry(Integer countryId);

	CountryResponseModel updateCountry(Integer countryId, CountryRequestModel countryDetail);

	String deleteCountry(Integer countryId);

}

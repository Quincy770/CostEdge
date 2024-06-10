package com.api.costing.service;

import java.util.List;

import com.api.costing.ui.model.request.AddRoleRequestModel;
import com.api.costing.ui.model.response.RoleResponseModel;

public interface RolesService {

	String addRole(AddRoleRequestModel roleDetails);

	List<RoleResponseModel> getRoles();

	String updateRole(long roleId, AddRoleRequestModel roleDetails);

}

package com.api.costing.ui.model.response;

import java.util.List;

public class RoleResponseForLogin {

	private Long id;
	private String roleName;
	private String roleFullName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleFullName() {
		return roleFullName;
	}

	public void setRoleFullName(String roleFullName) {
		this.roleFullName = roleFullName;
	}

}

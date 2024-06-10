package com.api.costing.io.entity;

import com.api.costing.model.audit.Audit;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "employee")
public class EmployeeEntity extends Audit implements Serializable {

	private static final long serialVersionUID = 6828366318957563203L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer employeeId;

	@Column
	private String firstName;

	@Column
	private String middleName;
	@Column
	private String lastName;
	@Column
	private String email;
	@Column
	private String phoneNumber;
	@Column
	private boolean isDeleted=false;
	@Column
	private String position;
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public Integer getEmployeeId() {
		return employeeId;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getEmail() {
		return email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
}

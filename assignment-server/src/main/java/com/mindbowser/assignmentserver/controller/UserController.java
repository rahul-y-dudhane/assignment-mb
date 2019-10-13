package com.mindbowser.assignmentserver.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindbowser.assignmentserver.business.UserBusiness;
import com.mindbowser.assignmentserver.entity.User;
import com.mindbowser.assignmentserver.model.ApiResponse;
import com.mindbowser.assignmentserver.model.LoginCredentials;
import com.mindbowser.assignmentserver.model.UserModel;

/**
 * Controller for handling user related API's
 */
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserBusiness userBusiness;

	/**
	 * For creating a new user
	 * 
	 * @param data
	 * @return ApiResponse
	 */
	@PostMapping("/create-user")
	public ApiResponse<User> create(@Valid @RequestBody User data) {
		User user = userBusiness.create(data);
		if (user != null) {
			return new ApiResponse<User>(true, "Created successfully", user);
		} else {
			return new ApiResponse<User>(false, "Internal server error", null);
		}
	}

	/**
	 * For getting list of all employees
	 * 
	 * @return ApiResponse
	 */
	@GetMapping("/employees")
	public ApiResponse<List<User>> getAllEmployee() {

		return new ApiResponse<List<User>>(true, "Employee list", userBusiness.getAllEmployee());
	}

	/**
	 * Validating user login
	 * 
	 * @param data
	 * @return ApiResponse
	 */
	@PostMapping("/login")
	public ApiResponse<User> login(@Valid @RequestBody LoginCredentials data) {
		User user = userBusiness.login(data);
		if (user != null) {
			return new ApiResponse<User>(true, "Login successful", user);
		} else {
			return new ApiResponse<User>(false, "User not found", null);
		}
	}

	/**
	 * For deleting an employee
	 * 
	 * @param user
	 * @return ApiResponse
	 */
	@DeleteMapping("/delete-employee")
	public ApiResponse<Boolean> deleteEmployee(@Valid @RequestBody UserModel user) {
		if (userBusiness.deleteEmployee(user.getId())) {
			return new ApiResponse<Boolean>(true, "Deleted successfully", true);
		} else {
			return new ApiResponse<Boolean>(false, "Can't delete. User not found", false);
		}
	}

	/**
	 * To update existing employee
	 * 
	 * @param data
	 * @return ApiResponse
	 */
	@PutMapping("/update-employee")
	public ApiResponse<User> updateEmployee(@Valid @RequestBody User data) {
		User user = userBusiness.updateEmployee(data);
		if (user != null) {
			return new ApiResponse<User>(true, "Updated successfully", user);
		} else {
			return new ApiResponse<User>(false, "User not found", null);
		}
	}

}

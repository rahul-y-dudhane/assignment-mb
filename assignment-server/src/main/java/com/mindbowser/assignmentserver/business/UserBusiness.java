package com.mindbowser.assignmentserver.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mindbowser.assignmentserver.entity.User;
import com.mindbowser.assignmentserver.model.LoginCredentials;
import com.mindbowser.assignmentserver.repository.UserRepository;

/**
 * Service for user related data operations
 * 
 * @author rahuld
 *
 */
@Service
public class UserBusiness {

	@Autowired
	UserRepository userRepository;

	/**
	 * Creating new user
	 * 
	 * @param data
	 * @return User
	 */
	public User create(User data) {

		return userRepository.save(data);
	}

	/**
	 * Get all emplyees
	 * 
	 * @return List
	 */
	public List<User> getAllEmployee() {

		return userRepository.findByType("employee");
	}

	/**
	 * Validating user credentials
	 * 
	 * @param data
	 * @return User
	 */
	public User login(LoginCredentials data) {

		return userRepository.findByEmailAndPasswordAndType(data.getEmail(), data.getPassword(), "manager");
	}

	/**
	 * Deleting an employee
	 * 
	 * @param id
	 * @return boolean
	 */
	public boolean deleteEmployee(Long id) {
		User user = findEmployeeById(id);
		if (user != null) {
			userRepository.delete(user);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Find employee by id
	 * 
	 * @param id
	 * @return User
	 */
	public User findEmployeeById(Long id) {
		return userRepository.findByIdAndType(id, "employee");
	}

	/**
	 * Updating existing employee
	 * 
	 * @param data
	 * @return User
	 */
	public User updateEmployee(User data) {
		User user = findEmployeeById(data.getId());
		if (user != null) {
			user.setFirstName(data.getFirstName());
			user.setLastName(data.getLastName());
			user.setEmail(data.getEmail());
			user.setDateOfBirth(data.getDateOfBirth());
			user.setCompany(data.getCompany());
			user.setAddress(data.getAddress());
			return userRepository.save(user);
		} else {
			return null;
		}
	}
}

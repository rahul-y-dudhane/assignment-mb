package com.mindbowser.assignmentserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mindbowser.assignmentserver.entity.User;

/**
 * 
 * @author rahuld
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public List<User> findByType(String type);

	public User findByEmailAndPasswordAndType(String email, String password, String type);

	public User findByIdAndType(Long id, String type);
}
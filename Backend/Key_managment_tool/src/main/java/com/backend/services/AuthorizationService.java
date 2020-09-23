package com.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.Role;
import com.backend.entities.User;
import com.backend.repositories.IUserRepository;

/**
*@author 
* Aigeth Magendran
* Tariq Daoud
*/


@Service
@Component("authService")
public class AuthorizationService implements IAuthorizationService {

	@Autowired
	IUserRepository userRepository;
	
	/*
	 * checks if current active user is an Admin.
	 * 
	 */ 
	@Override
	public boolean isAdmin() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return userRepository.getByEmail(auth.getName()).getRole() == Role.ADMIN;
	}
	
	
	/*
	 * Checks if the stored User equals the current active user or user is an Admin.
	 * Note that the in parameter should not be the current active user.
	 */
	@Override
	public boolean basic(User storedUser) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		if(isAdmin()) {
			return true;
		}
		
		if(storedUser == null){
			return false;
		}
		
		return storedUser.equals(userRepository.getByEmail(auth.getName()));
	}
	
	@Override
	public boolean basic(String storedUsername) {
		return basic(userRepository.getByEmail(storedUsername));
	}

	@Override
	public User getCurrentUser() {
		return userRepository.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
	}

	@Override
	public String getcurrentUserEmail() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}

}

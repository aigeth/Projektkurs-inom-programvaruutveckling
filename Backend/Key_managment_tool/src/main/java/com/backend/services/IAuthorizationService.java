package com.backend.services;

import com.backend.entities.User;

public interface IAuthorizationService {
	

	public boolean isAdmin();
	
	public boolean basic(User storedUser);
	public boolean basic(String storedUsername);
	
	public User getCurrentUser();
	public String getcurrentUserEmail();

}

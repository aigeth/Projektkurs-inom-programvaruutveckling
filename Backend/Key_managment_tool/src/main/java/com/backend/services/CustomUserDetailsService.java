package com.backend.services;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.backend.entities.User;
import com.backend.entities.UserPrincipal;
import com.backend.repositories.IUserRepository;
import com.backend.repositories.UserRepository;

/**
 * Service that handles bussiness logic for user details.
 *
 *@author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Service
@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.getByEmail(username);
		System.out.println("User=" + user);
		if(user==null)
			throw new UsernameNotFoundException("User 404");
		
		UserPrincipal u = new UserPrincipal(user);
		System.out.println("userprincipal=" + u.getUsername() + " " + u.getPassword());
		
		return new UserPrincipal(user);
	}

}
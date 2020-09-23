package com.backend.RestApi;

import java.net.InetAddress; 
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.User;
import com.backend.services.EmailService;
import com.backend.services.IAuthorizationService;
import com.backend.entities.Log;
import com.backend.entities.SteamKey;
import com.backend.entities.User;
import com.backend.services.ILogService;
import com.backend.services.IUserService;

/**
 * RestController that handles all HTTP requests to the user service.
 *
 * @author 
 */
@RestController
public class UserResource {
	
	@Autowired
	IUserService userService;
	
	@Autowired
	IAuthorizationService authService;
	
	//localhost:8080/users/add
	@PostMapping("users/add")
	public HashMap<String, String> addUser(@RequestBody User user) {
		HashMap<String, String> response = new HashMap<String, String>();	
		if(!authService.isAdmin()) {
			response.put("response", "Not authorized!");;
		}
		
		
		if(!userService.exists(user.geteMail())) {
			BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
			user.setPassword(bCrypt.encode(user.getPassword()));
			userService.add(user);
			response.put("response", "User " + user.geteMail() + " has been added");
		}
		else {
			response.put("response", "Error: User " + user.geteMail() + "already exists");
		}
		return response;
	}
	
	@GetMapping("users/{eMail}")
	public User getUser(@PathVariable String eMail) {
		if(!authService.basic(eMail)) {
			return null;
		}
		return userService.getByEmail(eMail);
	}
	
	@GetMapping("users")
	public List<User> getAllUsers() {
		if(!authService.isAdmin()) {
			return null;
		}
		return userService.getAll();
	}
	
	@DeleteMapping("users/{eMail}")
	public HashMap<String, String> deleteUser(@PathVariable String eMail) {
		if(!authService.isAdmin()) {
			return null;
		}
		HashMap<String, String> response = new HashMap<>();
		userService.delete(eMail);
		response.put("response", "User " + eMail + " has been removed");
		return response;
	}
	
	@PostMapping("users/forgot/{email}")
	public HashMap<String, String> forgotPassword(@PathVariable String email) throws UnknownHostException {
		HashMap<String, String> map = new HashMap<>();
	    if(userService.sendResetPasswordEmail(email)) {
	    	map.put("response", "A confirmation link has been sent to your email address");
	    }
	    else {
	    	map.put("response", "Error: This email is not registered");
	    }
	    return map;
	}
	
	@PostMapping("users/edit")
	public void editUser(@RequestBody User user) {
		if(!authService.isAdmin()) {
			return;
		}
		userService.update(user);
	}
	
}
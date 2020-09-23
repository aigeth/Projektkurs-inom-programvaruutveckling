package com.backend.services;

import java.net.InetAddress; 
import java.net.UnknownHostException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.SteamKey;
import com.backend.entities.User;
import com.backend.repositories.ISteamKeyRepository;
import com.backend.repositories.IUserRepository;

/**
 * Service that handles bussiness logic for user objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Service
@Component("userService")
public class UserService implements IUserService {
	
	@Autowired
	IUserRepository userRepository;
	
	@Autowired
	ISteamKeyService steamKeyService;
	
	@Autowired
	ISteamKeyRepository steamKeyRepository;
	
	@Autowired
	private EmailService emailService;

	@Autowired
	ILogService logService;

	@Override
	public void add(User user) {
		userRepository.add(user);
		logService.add("Added new user: " + user.geteMail());
	}

	@Override
	public User getByEmail(String eMail) {
		return userRepository.getByEmail(eMail);
	}

	@Override
	public List<User> getAll() {
		return userRepository.getAll();
	}

	@Override
	public void delete(String eMail) {
		
		User removedUser = getByEmail(eMail);
		for(SteamKey steamKey: steamKeyService.getAll()) {
			
			if(steamKey.getUploader() != null) {
				if(steamKey.getUploader().equals(removedUser)) {
					steamKey.setUploader(null);
					steamKeyRepository.update(steamKey);
				}
			}
			
			if(steamKey.getRegister() != null) {
				if(steamKey.getRegister().equals(removedUser)) {
					steamKey.setRegister(null);
					steamKeyRepository.update(steamKey);
				}
			}
			
		}
		userRepository.delete(eMail);
		logService.add("Removed user: " + eMail);
	}

	@Override
	public User findUserByResetToken(String resetToken) {
		return userRepository.findUserByResetToken(resetToken);
	}

	@Override
	public void update(User transientUser) {
		userRepository.update(transientUser);
		logService.add("Updated user: " + transientUser.geteMail());
	}
	
	@Override
	public void changePassword(String token, String newPassword) {
		User user = findUserByResetToken(token);
		BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
		user.setPassword(bCrypt.encode(newPassword));
		user.setResetToken(null);
		update(user);
	}

	@Override
	public boolean sendResetPasswordEmail(String email) throws UnknownHostException {
		User user = getByEmail(email);
		if(user != null) {
			user.setResetToken(UUID.randomUUID().toString());
			update(user);
			System.out.println("SEND MAIL");
			SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
			passwordResetEmail.setFrom("key_managment_tool@outlook.com");
			passwordResetEmail.setTo(user.geteMail());
			passwordResetEmail.setSubject("Password Reset Request");
			passwordResetEmail.setText("To reset your password, click the link below:\n" +
			"http://" + InetAddress.getLocalHost().getHostAddress() + ":8080/reset?token=" + user.getResetToken());
			emailService.sendEmail(passwordResetEmail);
			return true;
		}
		return false;
	}
	

	public boolean exists(String eMail) {
		return userRepository.exists(eMail);
	}

	
}

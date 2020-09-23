package com.backend.services;

import java.net.UnknownHostException;
import java.util.List;

import com.backend.entities.User;

/**
 * This is an interface for the service that handles bussiness logic for user objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IUserService {
	public void add(User user);
	public User getByEmail(String eMail);
	public List<User> getAll();
	public void delete(String eMail);
	public User findUserByResetToken(String resetToken);
	public void changePassword(String token, String newPassword);
	public boolean sendResetPasswordEmail(String email) throws UnknownHostException;
    public void update (User transientUser);
	public boolean exists(String eMail);
}

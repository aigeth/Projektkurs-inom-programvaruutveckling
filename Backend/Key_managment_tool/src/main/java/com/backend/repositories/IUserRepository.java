package com.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.backend.entities.User;


public interface IUserRepository {
	public void add(User user);
	public User getByEmail(String eMail);
	public List<User> getAll();
	public void delete(String eMail);
    public User findUserByResetToken(String resetToken);
    public void update (User transientUser);
	public boolean exists(String eMail);
}

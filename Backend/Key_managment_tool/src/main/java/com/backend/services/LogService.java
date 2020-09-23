package com.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.Log;
import com.backend.repositories.ILogRepository;

/**
 * Service that handles bussiness logic for log objects.
 *
 *@author 
 * Aigeth Magendran
 */
@Service
@Component("logService")
public class LogService implements ILogService{
	
	@Autowired
	ILogRepository logRepository;
	
	@Autowired
	IUserService userService;
	
	
	/*
	 * This fetches the current profile(user) that called this function and creates a 
	 * new log entity.
	 * The log entity is then added to the repository.
	 */
	@Override
	public void add(String action) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		logRepository.add(new Log(auth.getName(), action));
	}

	@Override
	public Log get(long id) {
		return logRepository.get(id);
	}

	@Override
	public List<Log> getAll() {
		return logRepository.getAll();
	}

	@Override
	public boolean exists(long id) {
		return logRepository.exists(id);
	}

}

package com.backend.services;

import java.util.List;
import com.backend.entities.Log;

/**
 * This is an interface for the service that handles bussiness logic for log objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface ILogService {
	
	/*
	 * The action parameter specifies the action that has been used, e.g. Removed a user
	 */
	public void add(String action); 
	
	
	/*
	 * Returns a log with the given log id.
	 */
	public Log get(long id);
	
	/*
	 * Fetches the whole log
	 */
	public List<Log> getAll();
	
	/*
	 * Checks if a certain log exists
	 */
	public boolean exists(long id);
}


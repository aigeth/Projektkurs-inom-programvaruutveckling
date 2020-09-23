package com.backend.repositories;

import java.util.List;
import java.util.UUID;

import com.backend.entities.Log;

/**
 * This is an interface for the repository that handles persistence of log objects.
 *
 * @author 
 * Aigeth Magendran
 */
public interface ILogRepository {
	//Adds a log to the database
	public void add(Log log);
	
	//Fetches a log with the log id from the database
	public Log get(long id);
	
	//Fetches the whole log from the database
	public List<Log> getAll();
	
	//Checks if a log exists with the given log ID from the database
	public boolean exists(long id);
}

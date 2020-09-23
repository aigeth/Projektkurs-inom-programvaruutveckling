package com.backend.RestApi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.Log;
import com.backend.services.ILogService;

/**
 * RestController that handles all HTTP requests to the log service.
 *
 * @author 
 */
@RestController
public class LogResource {
	
	@Autowired
	ILogService logService;
	
	
	//Returns the whole log
	@GetMapping("logs")
	public List<Log> getAllLogs() {
		return logService.getAll();
	}

}

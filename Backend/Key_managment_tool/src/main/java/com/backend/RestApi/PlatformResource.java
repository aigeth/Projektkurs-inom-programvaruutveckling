package com.backend.RestApi;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.Platform;
import com.backend.services.ILogService;
import com.backend.services.IPlatformService;

/**
 * RestController that handles all HTTP requests to the platform service.
 *
 * @author 
 */
@RestController
public class PlatformResource {
	
	@Autowired
	IPlatformService platformService;
	@Autowired
	ILogService logService;
	
	@PostMapping("platforms/add")
	public HashMap<String, String> addPlatform(@RequestBody Platform platform) {
		HashMap<String, String> response = new HashMap<String, String>();
		if(platformService.exists(platform.getName())) {
			response.put("response", "Error: Platform " + platform.getName() + " already exists");
		}
		else {
			response.put("response", "Platform " + platform.getName() + " has been added");
			platformService.add(platform);
		}
		return response;
	}
	
	@GetMapping("platforms")
	public List<Platform> getAllPlatforms() {
		return platformService.getAll();
	}
	
}

package com.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.Platform;
import com.backend.repositories.IPlatformRepository;

/**
 * Service that handles bussiness logic for platform objects.
 *
 *@author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Service
@Component("platformService")
public class PlatformService implements IPlatformService {

	@Autowired
	IPlatformRepository platformRepository;
	
	@Autowired
	ILogService logService;
	
	@Override
	public void add(Platform platform) {
		platformRepository.add(platform);
		logService.add("Added new platform: " + platform.getName());
	}

	@Override
	public List<Platform> getAll() {
		return platformRepository.getAll();
	}
	
	@Override
	public boolean exists(String name) {
		return platformRepository.exists(name);
	}
	
}

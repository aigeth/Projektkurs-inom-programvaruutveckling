package com.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.Platform;
import com.backend.entities.Region;
import com.backend.repositories.IPlatformRepository;
import com.backend.repositories.IRegionRepository;

/**
 * Service that handles bussiness logic for region objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Service
@Component("regionService")
public class RegionService implements IRegionService {

	@Autowired
	IRegionRepository regionRepository;
	
	@Autowired
	ILogService logService;
	
	@Override
	public void add(Region region) {
		regionRepository.add(region);
		logService.add("Added new region: " + region.getName());
	}

	@Override
	public List<Region> getAll() {
		return regionRepository.getAll();
	}
	
	@Override
	public boolean exists(String name) {
		return regionRepository.exists(name);
	}
	
}

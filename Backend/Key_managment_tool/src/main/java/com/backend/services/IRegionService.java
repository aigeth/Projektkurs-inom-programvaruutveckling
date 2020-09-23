package com.backend.services;

import java.util.List;

import com.backend.entities.Region;

/**
 * This is an interface for the service that handles bussiness logic for region objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IRegionService {
	public void add(Region region);
	public List<Region> getAll();
	public boolean exists(String name);
}

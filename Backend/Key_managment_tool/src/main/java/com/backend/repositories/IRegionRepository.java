package com.backend.repositories;

import java.util.List;

import com.backend.entities.Region;

/**
 * This is an interface for the repository that handles persistence of region objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IRegionRepository {
	public void add(Region region);
	public List<Region> getAll();
	public boolean exists(String name);
}

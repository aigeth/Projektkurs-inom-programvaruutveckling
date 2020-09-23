package com.backend.services;

import java.util.List;

import com.backend.entities.Platform;

/**
 * This is an interface for the service that handles bussiness logic for platform objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IPlatformService {
	public void add(Platform platform);
	public List<Platform> getAll();
	public boolean exists(String name);
}

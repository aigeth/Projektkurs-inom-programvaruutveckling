package com.backend.repositories;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import com.backend.entities.Platform;

/**
 * This is an interface for the repository that handles persistence of platform objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IPlatformRepository {
	public void add(Platform platform);
	public List<Platform> getAll();
	public boolean exists(String name);
}

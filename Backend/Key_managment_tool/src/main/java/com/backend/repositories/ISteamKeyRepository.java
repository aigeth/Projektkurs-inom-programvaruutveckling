package com.backend.repositories;

import java.util.List;

import com.backend.entities.SteamKey;

/**
 * This is an interface for the repository that handles persistence of steam key objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface ISteamKeyRepository {
	public void add(SteamKey steamKey);
	public void addAll(List<SteamKey> steamKeys);
	public boolean exists(String id);
	public SteamKey get(String id);
	public List<SteamKey> getAll();
	public void delete(String id);
	public List<SteamKey> searchKeys(String query);
	public void update(SteamKey transientSteamKey);
	
}

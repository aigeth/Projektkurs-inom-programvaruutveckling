package com.backend.services;

import java.util.Date;
import java.util.List;

import com.backend.entities.Game;
import com.backend.entities.Status;
import com.backend.entities.SteamKey;
import com.backend.entities.User;

/**
 * This is an interface for the service that handles bussiness logic for steam key objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface ISteamKeyService {
	public void add(SteamKey steamKey);
	public String addAll(List<SteamKey> steamKeys);
	public SteamKey get(String id);
	public List<SteamKey> getAll();
	
	/*
	 * Tries to delete a key and returns an int according to the result.
	 * 0 Successful delete
	 * 1 Key does not exist
	 * 2 Not privileged to delete this key
	 */
	public int delete(String id);
	
	/*
	 * Tries to delete a list of keys and returns the number of keys deleted.
	 */
	public int deleteSelected(List<SteamKey> steamKeys);
	public String updateSelected(List<SteamKey> steamKeys);
	public boolean exists(String id);
	public List<SteamKey> searchKeys(List<String> games, List<String> platforms, List<String> regions, List<Status> status, Date startDate, Date endDate);
	public void register(String id, User register);
	public void unregister(String id);
	public void comment(String id, String comment);
}

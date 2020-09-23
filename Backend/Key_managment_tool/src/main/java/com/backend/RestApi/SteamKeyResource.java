package com.backend.RestApi;

import java.util.List;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.SteamKey;
import com.backend.entities.User;
import com.backend.repositories.SteamKeyRepository;
import com.backend.services.ILogService;
import com.backend.services.ISteamKeyService;

/**
 * RestController that handles all HTTP requests to the steam key service.
 *
 * @author 
 */
@RestController
public class SteamKeyResource {
	
	@Autowired
	ISteamKeyService steamKeyService;
	
	@GetMapping("steamKeys")
	public List<SteamKey> getAll() {
		return steamKeyService.getAll();
	}
	
	@PostMapping("steamKeys/add")
	public HashMap<String, String> addSteamKey(@RequestBody SteamKey steamKey) {
		HashMap<String, String> response = new HashMap<String, String>();
		if(!steamKeyService.exists(steamKey.getId())) {
			steamKeyService.add(steamKey);	
			response.put("response", "Key " + steamKey.getId() + " has been added");
		}
		else {
			response.put("response", "Error: Key " + steamKey.getId() + " already exists");
		}
		return response;
	}
	
	@PostMapping("steamKeys/addAll")
	public HashMap<String, String> addSteamKeys(@RequestBody List<SteamKey> steamKeys) {
		HashMap<String, String> response = new HashMap<String, String>();
		response.put("response", steamKeyService.addAll(steamKeys));
		return response;
	}
	
	@PostMapping("steamKeys/search")
	public List<SteamKey> searchSteamKeys(@RequestBody SearchQuery searchQuery) {
		System.out.println(searchQuery);
		return steamKeyService.searchKeys(searchQuery.getGame(), searchQuery.getPlatforms(), searchQuery.getRegions(), searchQuery.getStatus(), searchQuery.getStartDate(), searchQuery.getEndDate());
	}
	
	@DeleteMapping("steamKeys/{id}")
	public  HashMap<String, String> deleteKey(@PathVariable String id) {
		
		HashMap<String, String> response = new HashMap<String, String>();
		
		switch(steamKeyService.delete(id)) {
			case 1 : 	response.put("response", "Key does not exist!");
						break;
			case 2 : 	response.put("response", "You are not privileged to delete this key!");
						break;
			default:	response.put("response", "Key successfully deleted!");
		}
		return response;
		
	}
	
	@PostMapping("steamKeys/register/{id}")
	public void register(@PathVariable String id, @RequestBody User register) {
		steamKeyService.register(id, register);
	}
	
	@PostMapping("steamKeys/unregister/{id}")
	public void unregister(@PathVariable String id) {
		steamKeyService.unregister(id);
	}
	
	@PostMapping("steamKeys/comment/{id}/{comment}")
	public HashMap<String, String> comment(@PathVariable String id, @PathVariable String comment) {
		HashMap<String, String> response = new HashMap<String, String>();
		steamKeyService.comment(id, comment);
		response.put("response", "Comment added");
		return response;
	}
	
	@DeleteMapping("steamKeys/deleteSelected")
	public  HashMap<String, String> deleteSelected(@RequestBody List<SteamKey> steamKeys) {
		HashMap<String, String> response = new HashMap<String, String>();

		response.put("response", steamKeyService.deleteSelected(steamKeys) +  " out of " + (steamKeys.size()) + " keys deleted!");
		
		return response;
	}
	
	@PutMapping("steamKeys/updateSelected")
	public  HashMap<String, String> updateSelected(@RequestBody List<SteamKey> steamKeys) {
		HashMap<String, String> response = new HashMap<String, String>();
		
		response.put("response", steamKeyService.updateSelected(steamKeys));
		
		return response;
	}
	
	
}

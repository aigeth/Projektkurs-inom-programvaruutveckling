package com.backend.RestApi;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.Region;
import com.backend.services.IRegionService;

/**
 * RestController that handles all HTTP requests to the region service.
 *
 * @author 
 */
@RestController
public class RegionResource {
	
	@Autowired
	IRegionService regionService;
	
	@PostMapping("regions/add")
	public HashMap<String, String> addRegion(@RequestBody Region region) {
		HashMap<String, String> response = new HashMap<String, String>();
		if(regionService.exists(region.getName())) {
			response.put("response", "Error: Region " + region.getName() + " already exists");
		}
		else {
			response.put("response", "Region " + region.getName() + " has been added");
			regionService.add(region);
		}
		return response;
	}
	
	@GetMapping("regions")
	public List<Region> getAllRegions() {
		return regionService.getAll();
	}
	
}


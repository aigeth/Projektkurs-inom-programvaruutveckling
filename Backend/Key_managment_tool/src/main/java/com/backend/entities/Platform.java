package com.backend.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * This class represents a platform entity that can be persisted in the database.
 *
 * @author 
 * Tariq Daoud
 */
@Entity
@JsonIgnoreProperties({"steamKeys"})
public class Platform {
	@Id
	private String name;
	@OneToMany(fetch = FetchType.EAGER, mappedBy="platform")
	private List<SteamKey> steamKeys;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<SteamKey> getSteamKeys() {
		return steamKeys;
	}
	public void setSteamKeys(List<SteamKey> steamKeys) {
		this.steamKeys = steamKeys;
	}
	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Platform)) { 
            return false; 
        } 
		Platform platform = (Platform) o;
		if(this.name.equals(platform.getName())) {
			return true;
		}
		return false;
	}
	@Override
	public String toString() {
		return "[Platform name=" + name + "]";
	}
}

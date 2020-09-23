package com.backend.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * This class represents a game entity that can be persisted in the database.
 *
 * @author 
 * Tariq Daoud
 */
@Entity
@JsonIgnoreProperties({"steamKeys"})
public class Game {
	@Id
	private String name;
	@OneToMany(fetch = FetchType.EAGER, mappedBy="game")
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
		if (!(o instanceof Game)) { 
            return false; 
        } 
		Game game = (Game) o;
		if(this.name.equals(game.getName())) {
			return true;
		}
		return false;
	}
	@Override
	public String toString() {
		return "[Game name=" + name +"]";
	}
}

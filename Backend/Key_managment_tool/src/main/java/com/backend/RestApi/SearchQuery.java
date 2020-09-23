package com.backend.RestApi;

import java.util.Date;
import java.util.List;

import com.backend.entities.Game;
import com.backend.entities.Status;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Represents a search query.
 *
 * @author 
 */
public class SearchQuery {
	private List<String> game;
	private List<String> platforms;
	private List<String> regions;
	private List<Status> status;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date startDate;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date endDate;
	
	public List<String> getGame() {
		return game;
	}
	public void setGame(List<String> game) {
		this.game = game;
	}
	public List<String> getPlatforms() {
		return platforms;
	}
	public void setPlatforms(List<String> platforms) {
		this.platforms = platforms;
	}
	public List<String> getRegions() {
		return regions;
	}
	public void setRegions(List<String> regions) {
		this.regions = regions;
	}
	public List<Status> getStatus() {
		return status;
	}
	public void setStatus(List<Status> status) {
		this.status = status;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	@Override
	public String toString() {
		return "SearchQuery [game=" + game + ", platforms=" + platforms + ", regions=" + regions + ", status=" + status
				+ "]";
	}
	
	
}

package com.backend.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * This class represents a steam key entity that can be persisted in the database.
 *
 * @author 
 * Tariq Daoud
 */
@Entity
public class SteamKey {
	@Id
	private String id;
	@ManyToOne
	private Game game;
	@ManyToOne
	private Platform platform;
	@ManyToOne
	private Region region;
	private Status status;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date startDate;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date endDate;
	@ManyToOne
	private User uploader;
	@ManyToOne
	private User register;
	private String comment;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Game getGame() {
		return game;
	}
	public void setGame(Game game) {
		this.game = game;
	}
	public Platform getPlatform() {
		return platform;
	}
	public void setPlatform(Platform platform) {
		this.platform = platform;
	}
	public Region getRegion() {
		return region;
	}
	public void setRegion(Region region) {
		this.region = region;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
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
	public User getUploader() {
		return uploader;
	}
	public void setUploader(User uploader) {
		this.uploader = uploader;
	}
	
	public User getRegister() {
		return register;
	}
	public void setRegister(User register) {
		this.register = register;
	}
	@Override
	public String toString() {
		return "SteamKey [id=" + id + ", game=" + game + ", platform=" + platform + ", region=" + region + ", status="
				+ status + ", startDate=" + startDate + ", endDate=" + endDate + ", uploader=" + uploader
				+ ", register=" + register + "]";
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
	
}
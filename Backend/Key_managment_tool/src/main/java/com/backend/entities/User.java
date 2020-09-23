package com.backend.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.FetchType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * This class represents a user entity that can be persisted in the database.
 *
 * @author 
 * Tariq Daoud
 */
@Entity
@JsonIgnoreProperties({"keys"})
public class User {
	@Id
	@GeneratedValue
	private int id;
	@Column(unique = true)
	private String eMail;
	private String password;
	private String firstname;
	private String lastname;
	private String resetToken;
	private Role role;
	@OneToMany(fetch = FetchType.EAGER, mappedBy="uploader")
	private List<SteamKey> keys;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String geteMail() {
		return eMail;
	}
	public void seteMail(String eMail) {
		this.eMail = eMail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getResetToken() {
		return resetToken;
	}
	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public List<SteamKey> getKeys() {
		return keys;
	}
	public void setKeys(List<SteamKey> keys) {
		this.keys = keys;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", eMail=" + eMail + ", password=" + password + ", firstname=" + firstname
				+ ", lastname=" + lastname + ", resetToken=" + resetToken + ", role=" + role + "]";
	}
	
}

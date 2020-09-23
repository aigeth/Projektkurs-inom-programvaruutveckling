package com.backend.entities;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.ManyToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Log {
	
	/*
	 * An example of a database entry will be: 
	 * [id]      [DATE]                       [LOG]                       [USERNAME]
	 * [1] ['2020-05-15 14:11:34.583000'] ['Added new user: "USER"'] ['USERNAME_OF_THE_ADDER']
	 */
	
	//This is equal to MYSQL'S auto increment
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	//Relate each log with a user

	private String username;
	
	//The action performed by the user
	private String log;
	
	private String date;
	
	public Log(String username, String log){
		this.username = username;
		this.log = log;
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		date = formatter.format(new Date());
	}
	
	public Log() {
		
	}

	public long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getLog() {
		return log;
	}


	public String getDate() {
		return date;
	}

	
	@Override
	public String toString() {
		return "Log [Date=" + date + ", User=" + username + ", Action=" + log + "]";
	}
	

}

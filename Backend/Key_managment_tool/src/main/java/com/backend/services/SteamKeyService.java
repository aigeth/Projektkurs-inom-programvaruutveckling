package com.backend.services;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList; 
import java.util.Arrays;
import java.util.Date;
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.Game;
import com.backend.entities.Platform;
import com.backend.entities.Region;
import com.backend.entities.Role;
import com.backend.entities.Status;
import com.backend.entities.SteamKey;
import com.backend.entities.User;
import com.backend.repositories.ISteamKeyRepository;
import com.backend.repositories.IUserRepository;

/**
 * Service that handles bussiness logic for steam key objects.
 *
 * @author
 * Aigeth Magendran
 * Tariq Daoud
 * Ilyas Göcmenoglu
 */
@Service
@Component("steamKeyService")
public class SteamKeyService implements ISteamKeyService {
	
	@Autowired
	ISteamKeyRepository steamKeyRepository;
	
	@Autowired
	IGameService gameService;
	
	@Autowired
	IPlatformService platformService;
	
	@Autowired
	IRegionService regionService;
	
	@Autowired
	IEmailService emailService;

	@Autowired
	ILogService logService;
	
	@Autowired
	IUserService userService;
	
	@Autowired
	IAuthorizationService authService;

	@Override
	public void add(SteamKey steamKey) {
		steamKey.setStatus(Status.Available);
		steamKeyRepository.add(steamKey);
		logService.add("Added new key: " + steamKey.getId() + " "  + steamKey.getPlatform() + " " + steamKey.getGame());
	}
	
	@Override
	public String addAll(List<SteamKey> steamKeys) {
		List<Game> games = gameService.getAll();
		List<Platform> platforms = platformService.getAll();
		List<Region> regions = regionService.getAll();
		for(SteamKey steamKey : steamKeys) {
			if(steamKey.getId()!=null) {
				if(exists(steamKey.getId())) {
					return "Error:  Failed to add keys. Key " + steamKey.getId() + " already exists"; 
				}
				if(!games.contains(steamKey.getGame())) {
					return "Error:  Failed to add keys. Game " + steamKey.getGame().getName() + " does not exist";
				}
				if(!platforms.contains(steamKey.getPlatform())) {
					return "Error:  Failed to add keys. Platform " + steamKey.getPlatform().getName() + " does not exist";
				}
				if(!regions.contains(steamKey.getRegion())) {
					return "Error:  Failed to add keys. Region " + steamKey.getRegion().getName() + " does not exist";
				}
				steamKey.setStatus(Status.Available);
	    	}
		}
		//logService.add("Added " + steamKeys.size() + " new " + steamKeys.get(0).getPlatform() + " " + steamKeys.get(0) + " keys");
		steamKeyRepository.addAll(steamKeys);
		return "Keys added successfully";
	}

	@Override
	public SteamKey get(String id) {
		return steamKeyRepository.get(id);
	}

	@Override
	public List<SteamKey> getAll() {
		return steamKeyRepository.getAll();
	}

	@Override
	public int delete(String id) {
		if(!exists(id)) {
			return 1; //Key doesn't exist
		}

		SteamKey steamKey = get(id);
		
		if(authService.basic(steamKey.getUploader())) {
			steamKeyRepository.delete(id);
			logService.add("Removed key: " + id + " "  + steamKey.getPlatform() + " " + steamKey.getGame());
			return 0; //Successful deletion
		}
		
		
		return 2; //Not privileged
	}
	
	@Override
	public int deleteSelected(List<SteamKey> steamKeys) {
		
		int removedKeys = 0;
		
		for(SteamKey key : steamKeys) {
			if(delete(key.getId()) == 0) {
				removedKeys++; 
			}
		}
		
		return removedKeys;
	}

	@Override
	public boolean exists(String id) {
		return steamKeyRepository.exists(id);
	}
	
	@Override
	public List<SteamKey> searchKeys(List<String> games, List<String> platforms, List<String> regions, List<Status> status, Date startDate, Date endDate) {
		String query = "FROM SteamKey WHERE id like '%%'";
		if(games.size() > 0) {
			query += " and ("; 
			for(int i = 0; i < games.size(); i++) {
				query += "game.name = " + "'" + games.get(i) + "'";
				if(i < games.size() - 1) {
					query += " or ";
				}
			}
			query += ")";
		}
		if(platforms.size() > 0) {
			query += " and ("; 
			for(int i = 0; i < platforms.size(); i++) {
				query += "platform.name = " + "'" + platforms.get(i) + "'";
				if(i < platforms.size() - 1) {
					query += " or ";
				}
			}
			query += ")";
		}
		if(regions.size() > 0) {
			query += " and ("; 
			for(int i = 0; i < regions.size(); i++) {
				query += "region.name = " + "'" + regions.get(i) + "'";
				if(i < regions.size() - 1) {
					query += " or ";
				}
			}
			query += ")";
		}
		if(status.size() > 0) {
			query += "and (";
			for(int i = 0; i < status.size(); i++) {
				query += "status = " + "'" + Status.valueOf(status.get(i).toString()).ordinal() + "'";
				if(i < status.size() - 1) {
					query += " or ";
				}
			}
			query += ")";
		}
		if(startDate != null && endDate != null) {
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			query += " and startDate >= '" + formatter.format(startDate) + "' and endDate <= '" + formatter.format(endDate) + "'";
		}
		return steamKeyRepository.searchKeys(query);
	}

	@Override
	public void register(String id, User register) {
		SteamKey steamKey = steamKeyRepository.get(id);
		if(steamKey.getStatus() == Status.Available) {
			steamKey.setStatus(Status.Taken);
			steamKey.setRegister(register);
			steamKeyRepository.update(steamKey);
			logService.add("Registered key: " + id + " " + steamKey.getPlatform() + " " + steamKey.getGame());
		}
	}

	@Override
	public void unregister(String id) {
		SteamKey steamKey = steamKeyRepository.get(id);
		steamKey.setStatus(Status.Available);
		steamKeyRepository.update(steamKey);
		logService.add("Unregistered key: " + id + " " + steamKey.getPlatform() + " " + steamKey.getGame());
	}
	
	@Override
	public void comment(String id, String comment) {
		SteamKey steamKey = steamKeyRepository.get(id);
		steamKey.setComment(comment);
		steamKeyRepository.update(steamKey);
		logService.add("Added comment to : " + steamKey.getId() + " "  + steamKey.getPlatform() + " " + steamKey.getGame());
	}
	
	@Scheduled(fixedRate = 5000)
	public void expiredKey() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		Date date = new Date();
		List<SteamKey> steamKeys = steamKeyRepository.getAll();
		for(int i = 0; i < steamKeys.size();i++) {
			
			String endDate = formatter.format(steamKeys.get(i).getEndDate());
			String dateNow = formatter.format(date);
			if(endDate.equals(dateNow) && steamKeys.get(i).getStatus() != Status.Expired) {
				SimpleMailMessage notificationemail = new SimpleMailMessage();
				notificationemail.setFrom("mailtestrawfury@gmail.com");
				notificationemail.setTo(steamKeys.get(i).getUploader().geteMail());
				notificationemail.setSubject("Notification: The key " + steamKeys.get(i).getId() + " has been expired");
				notificationemail.setText("Greetings from Raw Fury\n\nThe key: "+ steamKeys.get(i).getId() + " has been expired. \nYou can update your keys in: http://google.se \n\nMvh Raw Fury");
				emailService.sendEmail(notificationemail);
				
				steamKeys.get(i).setStatus(Status.Expired);
				steamKeyRepository.update(steamKeys.get(i));
			}
		}

	}

	@Override
	public String updateSelected(List<SteamKey> steamKeys) {
		for(int i = 0; i < steamKeys.size();i++) {
			steamKeyRepository.update(steamKeys.get(i));
		}
		logService.add("Updated : " + steamKeys.size());
		return "Updated : " + steamKeys.size();
	}

}
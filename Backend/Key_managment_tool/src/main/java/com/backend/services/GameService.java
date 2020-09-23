package com.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.backend.entities.Game;
import com.backend.repositories.IGameRepository;

/**
 * Service that handles bussiness logic for game objects.
 *
 *@author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Service
@Component("gameService")
public class GameService implements IGameService {

	@Autowired
	IGameRepository gameRepository;
	
	@Autowired
	ILogService logService;
	
	@Override
	public void add(Game game) {
		gameRepository.add(game);
		logService.add("Added game: " + game.getName());
	}

	@Override
	public List<Game> getAll() {
		return gameRepository.getAll();
	}

	@Override
	public boolean exists(String name) {
		return gameRepository.exists(name);
	}
	
}

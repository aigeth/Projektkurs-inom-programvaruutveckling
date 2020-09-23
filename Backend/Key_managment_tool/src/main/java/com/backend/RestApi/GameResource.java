package com.backend.RestApi;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.Game;
import com.backend.services.IGameService;

/**
 * RestController that handles all HTTP requests to the game service.
 *
 * @author 
 */
@RestController
public class GameResource {
	
	@Autowired
	IGameService gameService;
	
	@PostMapping("games/add")
	public HashMap<String, String> addgame(@RequestBody Game game) {
		HashMap<String, String> response = new HashMap<String, String>();
		if(gameService.exists(game.getName())) {
			response.put("response", "Error: Game " + game.getName() + " already exists");
		}
		else {
			response.put("response", "Game " + game.getName() + " has been added");
			gameService.add(game);
		}
		return response;
	}
	
	@GetMapping("games")
	public List<Game> getAllgames() {
		return gameService.getAll();
	}
	
}

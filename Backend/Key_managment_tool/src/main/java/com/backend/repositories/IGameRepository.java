package com.backend.repositories;

import java.util.List;

import com.backend.entities.Game;
import com.backend.entities.Platform;

/**
 * This is an interface for the repository that handles persistence of game objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IGameRepository {
	public void add(Game game);
	public List<Game> getAll();
	public boolean exists(String name);
}

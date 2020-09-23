package com.backend.services;

import java.util.List;

import com.backend.entities.Game;

public interface IGameService {
	public void add(Game game);
	public List<Game> getAll();
	public boolean exists(String name);
}

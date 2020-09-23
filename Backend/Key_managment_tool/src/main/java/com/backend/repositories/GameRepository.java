package com.backend.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.backend.entities.Game;
import com.backend.entities.Game;

/**
 * Repository that handles persistence of game objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Repository
@Transactional
@Component("gameRepository")
public class GameRepository implements IGameRepository{
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void add(Game game) {
		entityManager.persist(game);
	}

	@Override
	public List<Game> getAll() {
		return entityManager.createQuery("FROM Game").getResultList();
	}
	
	@Override
	public boolean exists(String name) {
		Game game = (Game) entityManager.createQuery("FROM Game where name = '" + name + "'").getResultList().stream().findFirst().orElse(null);
		return game != null;
	}

}

package com.backend.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.backend.entities.Platform;
import com.backend.entities.Platform;

/**
 * Repository that handles persistence of platform objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Repository
@Transactional
@Component("platformRepository")
public class PlatformRepository implements IPlatformRepository{
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void add(Platform platform) {
		entityManager.persist(platform);
	}

	@Override
	public List<Platform> getAll() {
		return entityManager.createQuery("FROM Platform").getResultList();
	}
	
	@Override
	public boolean exists(String name) {
		Platform platform = (Platform) entityManager.createQuery("FROM Platform where name = '" + name + "'").getResultList().stream().findFirst().orElse(null);
		return platform != null;
	}

}

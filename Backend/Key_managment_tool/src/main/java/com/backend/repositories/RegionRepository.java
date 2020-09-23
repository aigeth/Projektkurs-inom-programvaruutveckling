package com.backend.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.backend.entities.Region;
import com.backend.entities.Platform;
import com.backend.entities.Region;

/**
 * Repository that handles persistence of region objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Repository
@Transactional
@Component("regionRepository")
public class RegionRepository implements IRegionRepository{
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void add(Region region) {
		entityManager.persist(region);
	}

	@Override
	public List<Region> getAll() {
		return entityManager.createQuery("FROM Region").getResultList();
	}
	
	@Override
	public boolean exists(String name) {
		Region region = (Region) entityManager.createQuery("FROM Region where name = '" + name + "'").getResultList().stream().findFirst().orElse(null);
		return region != null;
	}
}

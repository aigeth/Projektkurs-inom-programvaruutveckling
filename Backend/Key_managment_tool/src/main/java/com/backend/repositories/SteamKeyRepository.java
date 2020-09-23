package com.backend.repositories;

import java.util.ArrayList; 
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.backend.entities.SteamKey;
import com.backend.entities.User;

/**
 * Repository that handles persistence of steam key objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Repository
@Transactional
@Component("steamKeyRepository")
public class SteamKeyRepository implements ISteamKeyRepository {

	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	private EntityManagerFactory emf;

	@Override
	public void add(SteamKey steamKey) {
		entityManager.persist(steamKey);
		
	}

	@Override
	public SteamKey get(String id) {
		return entityManager.find(SteamKey.class, id);
	}

	@Override
	public List<SteamKey> getAll() {
		return entityManager.createQuery("FROM SteamKey").getResultList();
	}

	@Override
	public void delete(String id) {
		entityManager.remove(get(id));
	}

	@Override
	public boolean exists(String id) {
		SteamKey steamKey = (SteamKey) entityManager.createQuery("FROM SteamKey where id = '" + id + "'").getResultList().stream().findFirst().orElse(null);
		return steamKey != null;
	}
	

	public List<SteamKey> searchKeys(String query) {
		System.out.println(query);
		return entityManager.createQuery(query).getResultList();
	}

	@Transactional
	public void addAll(List<SteamKey> steamKeys) {
		EntityTransaction tx = null;
		try {
			EntityManager em = emf.createEntityManager();
		    tx = em.getTransaction();
		    tx.begin();

		    for(SteamKey steamKey : steamKeys) {
		    	if(steamKey.getId()!=null) {
		    		entityManager.persist(steamKey);
		    	}
			}

		    tx.commit();
		}
		catch (RuntimeException e) {
		    if ( tx != null && tx.isActive() ) tx.rollback();
		    throw e; // or display error message
		}
	}

	@Override
	public void update(SteamKey transientSteamKey) {
		entityManager.merge(transientSteamKey);
	}

}

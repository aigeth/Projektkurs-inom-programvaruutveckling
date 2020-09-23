package com.backend.repositories;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.backend.entities.Log;
import com.backend.entities.User;

/**
 * Repository that handles persistence of log objects.
 *
 * @author 
 * Aigeth Magendran
 */
@Repository
@Transactional
@Component("logRepository")
public class LogRepository implements ILogRepository{

	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void add(Log log) {
		entityManager.persist(log);
	}

	@Override
	public Log get(long id) {
		return (Log) entityManager.find(Log.class, id);
	}

	@Override
	public List<Log> getAll() {
		return (List<Log>) entityManager.createQuery("FROM Log").getResultList();
	}

	@Override
	public boolean exists(long id) {
		throw new UnsupportedOperationException();
	}
	
	
}

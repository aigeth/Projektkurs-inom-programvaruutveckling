package com.backend.repositories;

import java.util.List; 
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.backend.entities.User;

/**
 * Repository that handles persistence of user objects.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Repository
@Transactional
@Component("userRepository")
public class UserRepository implements IUserRepository {

	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public void add(User user) {
		entityManager.persist(user);
	}
	
	@Override
	public User getByEmail(String eMail) {
		return (User) entityManager.createQuery("FROM User WHERE eMail = '" + eMail + "'").getResultList().stream().findFirst().orElse(null);
	}

	@Override
	public List<User> getAll() {
		return (List<User>) entityManager.createQuery("FROM User").getResultList();
	}

	@Override
	public void delete(String eMail) {
		entityManager.remove(getByEmail(eMail));
	}

	@Override
	public User findUserByResetToken(String resetToken) {
		return (User) entityManager.createQuery("FROM User where resetToken = '" + resetToken + "'").getResultList().stream().findFirst().orElse(null);
	}

	@Override
	public void update(User transientUser) {
		entityManager.merge(transientUser);
		
	}

	@Override
	public boolean exists(String eMail) {
		User user = (User) entityManager.createQuery("FROM User where eMail = '" + eMail + "'").getResultList().stream().findFirst().orElse(null);
		return user != null;
	}
	


}

package com.backend.services;

import org.springframework.mail.SimpleMailMessage;

/**
 * This is an interface for the service that handles sending email.
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
public interface IEmailService {
	public void sendEmail(SimpleMailMessage email);
}

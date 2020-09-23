package com.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.backend.entities.User;
import com.backend.services.IUserService;

/**
 * Controller that handles password resetting.
 *
 * @author 
 * Tariq Daoud
 */
@Controller
public class PasswordController {
	
	@Autowired
	IUserService userService;
	
	@RequestMapping("/reset")
	public ModelAndView displayResetPasswordPage(ModelAndView modelAndView, @RequestParam("token") String token) {
		User user = userService.findUserByResetToken(token);
		if(user==null) {
			modelAndView.setViewName("invalid.html");
		}
		else {
			modelAndView.setViewName("reset.html");
			modelAndView.addObject("user", new User());
			modelAndView.addObject("token", token);
		}
		return modelAndView;
	}
	
	@RequestMapping("/changePassword")
	public ModelAndView changePassword(ModelAndView modelAndView, @ModelAttribute User user, @RequestParam("token") String token) {
		userService.changePassword(token, user.getPassword());
		modelAndView.setViewName("success.html");
		return modelAndView;
	}
	
}

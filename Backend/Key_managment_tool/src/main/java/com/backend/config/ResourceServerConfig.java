package com.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * This class configures the resource server
 *
 * @author 
 * Aigeth Magendran
 * Tariq Daoud
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
    	http
        .headers()
            .frameOptions()
            .disable()
            .and()
        .authorizeRequests()
        	  .antMatchers("/users/forgot/{email}").permitAll()
              .antMatchers(HttpMethod.OPTIONS, "/oauth/token").permitAll(); 
    }


}

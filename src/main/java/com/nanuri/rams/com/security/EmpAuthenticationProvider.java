package com.nanuri.rams.com.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nanuri.rams.com.security.service.LoginService;
import com.nanuri.rams.com.security.vo.EmpDetailsVO;

public class EmpAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
 	private PasswordEncoder passwordEncoder;

 	@Autowired
 	private LoginService userLoginService;

 	@Override
 	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

 		String name = authentication.getName();
 		String password = authentication.getCredentials().toString();

 		EmpDetailsVO user = userLoginService.loadUserByUsername(name);
		
 		if (user == null) {
 			throw new UsernameNotFoundException("사번 또는 비밀번호가 맞지 않습니다.");

 		} else if (!passwordEncoder.matches(password, user.getPassword())) {
             throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");

        } 

 		return new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
 	}

 	@Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}

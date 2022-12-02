package com.nanuri.rams.com.security.handler;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

		String msg = "";
		
		if (exception instanceof UsernameNotFoundException) {
			log.debug("onAuthenticationFailure >> UsernameNotFoundException");
			msg = "존재하지 않는 아이디 입니다.";
		} else if (exception instanceof BadCredentialsException) {
			log.debug("onAuthenticationFailure >> BadCredentialsException");
			msg = "아이디 또는 비밀번호가 일치하지 않습니다.";
		} else if (exception instanceof DisabledException) {
			log.debug("onAuthenticationFailure >> DisabledException");
			msg = "승인대기 상태 입니다. 가입승인 후 로그인 할 수 있습니다.";
		} else {
			log.debug("onAuthenticationFailure >> AuthenticationException : {}", exception);
			msg = "로그인 단계에서 문제가 발생하였습니다.";
		}
		
		msg = URLEncoder.encode(msg, "UTF-8");
		setDefaultFailureUrl("/login?error=true&msg="+msg);
		super.onAuthenticationFailure(request, response, exception);
	}	

}

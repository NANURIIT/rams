package com.nanuri.rams.com.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationAccessDeniedHandler implements AccessDeniedHandler {
	
	private String errorPage = "/denied";

	@Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException e) throws IOException, ServletException {

        String deniedUrl = errorPage + "?exception=" + e.getMessage();
		response.sendRedirect(deniedUrl);
    }

    public void setErrorPage(String errorPage){
        this.errorPage = errorPage;
    }

}

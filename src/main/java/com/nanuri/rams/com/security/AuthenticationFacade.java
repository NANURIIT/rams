package com.nanuri.rams.com.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.nanuri.rams.com.security.vo.EmpDetailsVO;

@Component
public class AuthenticationFacade {
	
	public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public EmpDetailsVO getDetails() {
        Authentication auth = getAuthentication();
        return (EmpDetailsVO)auth.getPrincipal();
    }

}

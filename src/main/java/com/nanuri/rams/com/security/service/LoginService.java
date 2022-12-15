package com.nanuri.rams.com.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA99ADto;
import com.nanuri.rams.business.common.mapper.RAA99AMapper;
import com.nanuri.rams.com.code.RghtCd;
import com.nanuri.rams.com.security.vo.EmpDetailsVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {
	
	public static String ROLE_PREFIX = "ROLE_";
	
	@Autowired
	private RAA99AMapper raa99aMapper;
	
	@Override
	public EmpDetailsVO loadUserByUsername(String eno) {
		RAA99ADto employee = raa99aMapper.findByEno(eno);
		
		if(employee == null) {
			log.debug("employee is null => UsernameNotFoundException");
			throw new UsernameNotFoundException("사번 또는 비밀번호가 맞지 않습니다.");
		}else {
			return EmpDetailsVO.of(employee, getGrantedAuthorities(employee));
		}
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(RAA99ADto emp) {
        RghtCd rghtCd = emp.getRghtCd();
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(ROLE_PREFIX.concat(rghtCd.name()));
        return authorities;
    }
	
}

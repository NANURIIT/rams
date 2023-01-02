package com.nanuri.rams.com.security.vo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.nanuri.rams.business.common.dto.RAA99ADTO;
import com.nanuri.rams.com.code.RghtCd;

import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Getter
public class EmpDetailsVO implements UserDetails {
	
	private final String eno;
	private final String empNm;
	private final String password;
	private final RghtCd rghtCd;
	private final String dprtCd;
	private final String dprtNm;
	private final String hdqtCd;
	private final String hdqtNm;
	private final String pstn;
	private final Boolean isLocked;
	private final List<GrantedAuthority> authorities;
	
	private EmpDetailsVO(String eno, String empNm, String password, RghtCd rghtCd, String dprtCd, String dprtNm, String hdqtCd, String hdqtNm, String pstn, Boolean isLocked
			, List<GrantedAuthority> authorities) {
		this.eno = eno;
		this.empNm = empNm;
		this.password = password;
		this.rghtCd = rghtCd;
		this.dprtCd = dprtCd;
		this.dprtNm= dprtNm;
		this.hdqtCd = hdqtCd;
		this.hdqtNm = hdqtNm;
		this.pstn = pstn;
		this.isLocked = isLocked;
		this.authorities = authorities;
	}
	
	public static EmpDetailsVO of (String eno, String empNm, String password, RghtCd rghtCd, String dprtCd, String dprtNm, String hdqtCd, String hdqtNm, String pstn, Boolean isLocked
			, List<GrantedAuthority> authorities) {
		return new EmpDetailsVO(eno, empNm, password, rghtCd, dprtCd, dprtNm, hdqtCd, hdqtNm, pstn, isLocked, authorities);
	}
	
	public static EmpDetailsVO of (String eno, String empNm, String password, RghtCd rghtCd, String dprtCd, String dprtNm, String hdqtCd, String hdqtNm, String pstn, Boolean isLocked
			, GrantedAuthority authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        return new EmpDetailsVO(eno, empNm, password, rghtCd, dprtCd, dprtNm, hdqtCd, hdqtNm, pstn, isLocked, authorities);
    }

    public static EmpDetailsVO of (String eno, String empNm, String password, RghtCd rghtCd, String dprtCd, String dprtNm, String hdqtCd, String hdqtNm, String pstn, Boolean isLocked
    		, String authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(authority));
        return new EmpDetailsVO(eno, empNm, password, rghtCd, dprtCd, dprtNm, hdqtCd, hdqtNm, pstn, isLocked, authorities);
    }

    public static EmpDetailsVO of (RAA99ADTO emp, String authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(authority));
        return new EmpDetailsVO(emp.getEno(), emp.getEmpNm(), emp.getPwd(), emp.getRghtCd(), emp.getDprtCd(), emp.getDprtNm(), emp.getHdqtCd(), emp.getHdqtNm()
				, emp.getPstn(), emp.getIsLocked(), authorities);
    }

    public static EmpDetailsVO of (RAA99ADTO emp, GrantedAuthority authority) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        return new EmpDetailsVO(emp.getEno(), emp.getEmpNm(), emp.getPwd(), emp.getRghtCd(), emp.getDprtCd(), emp.getDprtNm(), emp.getHdqtCd(), emp.getHdqtNm()
				, emp.getPstn(), emp.getIsLocked(), authorities);
    }
	
	public static EmpDetailsVO of (RAA99ADTO emp, List<GrantedAuthority> authorities) {
		return new EmpDetailsVO(emp.getEno(), emp.getEmpNm(), emp.getPwd(), emp.getRghtCd(), emp.getDprtCd(), emp.getDprtNm(), emp.getHdqtCd(), emp.getHdqtNm()
				, emp.getPstn(), emp.getIsLocked(), authorities);
	}
	
	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }
	
	@Override
	public String getPassword() { 
		return this.password;
	}
	
	@Override
    public String getUsername() {
        return this.eno;
    }
	
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
	
}

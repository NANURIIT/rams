package com.nanuri.rams.business.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {

	private final RAA91BMapper raa91bMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	// 셀렉트박스 코드, 밸류 취득
	@Override
	public List<Map<String, Object>> getSelectBox(String cmnsCdGrp) {
		return raa91bMapper.getSelectBox(cmnsCdGrp);
	}
	
	// 담당직원 - 로그인유저정보
	@Override
	public Map<String, Object> getUserAuth() {
		Map<String, Object> user = new HashMap<String, Object>();

		user.put("eno"   , facade.getDetails().getEno());
		user.put("empNm" , facade.getDetails().getEmpNm());
		user.put("dprtCd", facade.getDetails().getDprtCd());
		user.put("dprtNm", facade.getDetails().getDprtNm());
		user.put("HdqtCd", facade.getDetails().getHdqtCd());
		user.put("HdqtNm", facade.getDetails().getHdqtNm());

		return user;
	}
}

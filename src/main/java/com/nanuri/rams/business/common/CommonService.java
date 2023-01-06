package com.nanuri.rams.business.common;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface CommonService {

	// 셀렉트박스 코드, 밸류 취득
	public List<Map<String, Object>> getSelectBox(String cmnsCdGrp);

	// 담당직원 - 로그인유저정보
	public Map<String, Object> getUserAuth();

}

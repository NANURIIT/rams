package com.nanuri.rams.business.common;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
@RestController
public class CommonController {

	private final CommonService commonService;

	// 담당직원 - 로그인유저정보
	@GetMapping(value = "/getUserAuth")
	public Map<String, Object> getUserAuth() {
		return commonService.getUserAuth();
	}
	
	// 공통코드
	@GetMapping(value = "/getSelectBoxCode/{code}")
	public List<Map<String, Object>> getSelectBoxCode(@PathVariable String code) {
		return commonService.getSelectBox(code);
	}
	
}

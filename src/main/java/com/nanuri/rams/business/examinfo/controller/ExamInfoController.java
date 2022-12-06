package com.nanuri.rams.business.examinfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExamInfoController {

	// 심사요청 페이지
	@GetMapping(value = { "/", "/AS03210S" })
	public String AS03210S() {
		return "business/AS03210S";
	}

	// 안건조회 및 배정 페이지
	@GetMapping(value = { "/AS03110S" })
	public String AS03110S() {
		return "business/AS03110S";
	}

	// 배정안건조회 페이지
	@GetMapping(value = { "/AS03010S" })
	public String AS03010S() {
		return "business/AS03010S";
	}
}

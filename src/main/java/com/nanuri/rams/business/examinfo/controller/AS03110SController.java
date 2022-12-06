package com.nanuri.rams.business.examinfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
// 배정안건조회 페이지 Controller
public class AS03110SController {

	@GetMapping(value = { "/AS03110S" })
	public String AS03110S() {
		return "business/AS03110S";
	}
}

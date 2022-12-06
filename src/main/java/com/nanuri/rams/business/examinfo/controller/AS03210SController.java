package com.nanuri.rams.business.examinfo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
// 심사 요청 페이지 Controller
public class AS03210SController {

	@GetMapping(value = { "/", "/AS03210S" })
	public String AS03210S() {
		return "business/AS03210S";
	}
}

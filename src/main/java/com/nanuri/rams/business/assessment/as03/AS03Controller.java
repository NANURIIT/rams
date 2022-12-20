package com.nanuri.rams.business.assessment.as03;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AS03Controller {
	
	// 심사요청 페이지
	@GetMapping(value = { "/AS03210S" })
	public String AS03210S() {
		return "business/as/AS03210S";
	}

	// 안건조회 및 배정 페이지
	@GetMapping(value = { "/AS03110S" })
	public String AS03110S() {
		return "business/as/AS03110S";
	}

	// 배정안건조회 페이지
	@GetMapping(value = { "/AS03010S" })
	public String AS03010S() {
		return "business/as/AS03010S";
	}

}

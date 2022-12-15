package com.nanuri.rams.com.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LoginController {
	
	//private final AuthenticationFacade facade;

	/**
	 * 로그인 - 로그인 화면
	 *
	 * @param
	 * @return view
	 */
	@GetMapping(value = {"/", "/login" })
	public String loginPage(@RequestParam(value = "error", required = false) String error,
							@RequestParam(value = "exception", required = false) String exception,
							Model model) {
		model.addAttribute("error", error);
		model.addAttribute("exception", exception);
		return "/login";
	}

	/**
	 * 로그인 - 로그인 거부화면
	 *
	 * @param model
	 * @return view
	 */
	@GetMapping("/denied")
	public String deniedPage(@RequestParam String exception, Model model) {
		//model.addAttribute("username", facade.getDetails().getUsername());
		//model.addAttribute("exception", exception);

		return "/denied";
	}

}
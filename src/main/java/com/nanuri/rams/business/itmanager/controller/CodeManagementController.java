package com.nanuri.rams.business.itmanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CodeManagementController {
	
	@GetMapping(value = {"/codeManagement"})
    public String codeManagement() {
        return "business/codeManagement";
    }
}

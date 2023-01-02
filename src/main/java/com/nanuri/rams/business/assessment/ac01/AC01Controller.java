package com.nanuri.rams.business.assessment.ac01;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AC01Controller {
	
	@GetMapping(value = {"/AC01010S"})
    public String codeManagement() {
        return "business/ac/AC01010S";
    }
	
    @GetMapping(value = {"/AC01110S"})
    public String userManagement() {
        return "business/ac/AC01110S";   
    }
    
    @GetMapping(value = {"/AC01210S"})
    public String ManageAuth() {
        return "business/ac/AC01210S";   
    }

    @GetMapping(value = {"/AC01310S"})
    public String ManageMenu() {
        return "business/ac/AC01310S";
    }

}

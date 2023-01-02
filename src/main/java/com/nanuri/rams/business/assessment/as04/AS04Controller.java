package com.nanuri.rams.business.assessment.as04;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AS04Controller {
	
	@GetMapping(value = {"/AS04010S"})
    public String referConsultative() {
        return "business/as/AS04010S";
    }
    @GetMapping(value = {"/AS04110S"})
    public String preAdvance() {
        return "business/as/AS04110S";
    }
    @GetMapping(value = {"/AS04210S"})
    public String resultConsultative() {
        return "business/as/AS04210S";
    }
    @GetMapping(value = {"/AS04310S"})
    public String MeetingMaterial() {
        return "business/as/AS04310S";
    }

}

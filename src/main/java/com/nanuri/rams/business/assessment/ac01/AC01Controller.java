package com.nanuri.rams.business.assessment.ac01;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AC01Controller {
	
	/**
	 * 공통코드관리 화면이동
	 * @return
	 */
	@GetMapping(value = {"/AC01010S"})
    public String getAC01010S() {
        return "business/ac/AC01010S";
    }
	
	/**
	 * 사용자관리 화면이동
	 * @return
	 */
    @GetMapping(value = {"/AC01110S"})
    public String getAC01110S() {
        return "business/ac/AC01110S";   
    }
    
    /**
     * 권한별메뉴관리 화면이동
     * @return
     */
    @GetMapping(value = {"/AC01210S"})
    public String getAC01210S() {
        return "business/ac/AC01210S";   
    }

    /**
     * 메뉴별권한관리 화면이동
     * @return
     */
    @GetMapping(value = {"/AC01310S"})
    public String getAC01310S() {
        return "business/ac/AC01310S";
    }
    
    @GetMapping(value = {"/AC01410S"})
    public String getAC1410S() {
    	return "business/ac/AC01410S";
    }

}

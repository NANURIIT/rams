package com.nanuri.rams.business.assessment.as04;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AS04Controller {
	
	/**
	 * 협의체 부의 및 결과
	 * @return
	 */
	@GetMapping(value = {"/AS04010S"})
    public String getAS04010S() {
        return "business/as/AS04010S";
    }
	
	/**
	 * 협의체 준비
	 * @return
	 */
    @GetMapping(value = {"/AS04110S"})
    public String getAS04110S() {
        return "business/as/AS04110S";
    }
    
    /**
     * 협의체 현황 및 결과조회
     * @return
     */
    @GetMapping(value = {"/AS04210S"})
    public String getAS04210S() {
        return "business/as/AS04210S";
    }
    
    /**
     * 협의체 의견등록
     * @return
     */
    @GetMapping(value = {"/AS04220S"})
    public String getAS04220S() {
        return "business/as/AS04220S";
    }
    
    /**
     * 회의자료 RAW데이터
     * @return
     */
    @GetMapping(value = {"/AS04310S"})
    public String getAS04310S() {
        return "business/as/AS04310S";
    }

}

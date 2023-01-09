package com.nanuri.rams.business.assessment.as03.as03110;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.RAA02BVO.AssignInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AS03110APIController {
	
	private final AS03110Service as03110Service;
	
	// 배정안건조회
	@GetMapping(value = "/assignmentSearch")
	public List<AssignInfo> assignmentSearch(AssignInfo dealDto) throws ParseException {
		return as03110Service.assignmentSearch(dealDto);
	}
	
}

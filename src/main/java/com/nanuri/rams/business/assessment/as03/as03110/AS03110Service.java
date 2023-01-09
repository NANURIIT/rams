package com.nanuri.rams.business.assessment.as03.as03110;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.RAA02BVO.AssignInfo;

@Service
public interface AS03110Service {

	// 배정안건조회
	public List<AssignInfo> assignmentSearch(AssignInfo dealDto);
		
}

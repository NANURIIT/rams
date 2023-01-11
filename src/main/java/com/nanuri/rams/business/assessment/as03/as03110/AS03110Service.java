package com.nanuri.rams.business.assessment.as03.as03110;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AssignInfo;

@Service
public interface AS03110Service {

	// 배정안건조회
	public List<AssignInfo> assignmentSearch(AssignInfo dealDto);

	public List<RAA02BDTO> ibDealNoSearch(String ibDealNo);

	
		
}

package com.nanuri.rams.business.assessment.as03.as03010;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;

@Service
public interface AS03010Service {

	// 심사안건조회
	public List<RAA01BDTO> checkDealSearch(checkDealInfo dealDto);
	
}

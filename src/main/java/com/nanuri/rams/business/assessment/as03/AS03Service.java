package com.nanuri.rams.business.assessment.as03;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA01BDto;
import com.nanuri.rams.business.common.vo.RAA01BVo.DealInfo;

@Service
public interface AS03Service {

	/**
	 * deal info 가져오기
	 * 
	 * @param dealInfo
	 * @return
	 */
	public List<RAA01BDto> getDealInfo(DealInfo dealDto);

}

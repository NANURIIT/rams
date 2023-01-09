package com.nanuri.rams.business.assessment.as03.as03010;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;
import com.nanuri.rams.com.utils.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03010ServiceImpl implements AS03010Service{
	
	private final RAA01BMapper raa01Mapper;
	
	//	심사안건조회
	@Override
	public List<RAA01BDTO> checkDealSearch(checkDealInfo dealInfo){
		dealInfo.setStart(Utils.changeDateFormat(dealInfo.getStart(), "yyyy-MM-dd"));
		dealInfo.setEnd(Utils.changeDateFormat(dealInfo.getEnd(), "yyyy-MM-dd"));
		
		return raa01bMapper.checkDealSearch(dealInfo)
	}

}

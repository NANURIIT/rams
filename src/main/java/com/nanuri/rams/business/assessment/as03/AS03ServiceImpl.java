package com.nanuri.rams.business.assessment.as03;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctc.wstx.util.StringUtil;
import com.nanuri.rams.business.common.dto.RAA01BDto;
import com.nanuri.rams.business.common.mapper.RAA01BMapper;
import com.nanuri.rams.business.common.vo.RAA01BVo.DealInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03ServiceImpl implements AS03Service {

	private final RAA01BMapper raa01bMapper;

	/**
	 * 딜목록 조회
	 * 
	 * @param raa02bDto
	 * @return
	 * @throws ParseException 
	 */
	public List<RAA01BDto> getDealInfo(DealInfo dealInfo) throws ParseException {
		
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		String date = dealInfo.getDscDate();
		if(!StringUtil.isAllWhitespace(date)) {
			Date formatDate = dateFormat.parse(date);
			dealInfo.setDscDate(newFormat.format(formatDate));
		}

		List<RAA01BDto> dealList = raa01bMapper.getDealInfo(dealInfo);

		return dealList;
	}

}

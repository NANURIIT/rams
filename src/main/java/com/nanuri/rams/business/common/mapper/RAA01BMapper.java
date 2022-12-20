package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;

@Mapper
public interface RAA01BMapper {

	public List<RAA01BVO> getDealInfo(DealInfo dealInfo);
	
}

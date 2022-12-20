package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA94BDTO;

@Mapper
public interface RAA94BMapper {
    
    public List<RAA94BDTO> selectRghtCd();                // 사용자관리화면 권한구분
}

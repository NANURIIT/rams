package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.RAA94BDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RAA94BMapper {
    public List<RAA94BDto> selectAuthCode(String rghtCdNm);
}

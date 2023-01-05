package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA90BDTO;
import com.nanuri.rams.business.common.dto.RAA93BDTO;
import com.nanuri.rams.business.common.vo.RAA93BVO;

@Mapper
public interface RAA93BMapper {
    public List<RAA93BVO.MenuListVO> selectMenuList(String menuNm);    // 메뉴별권한관리 메뉴명 조회
    
    public List<RAA93BVO> selectAuthCodeMenu(String rghtCd);
    
    public List<RAA93BDTO> selectMainMenuList(String menuNm);  // 메뉴관리 메뉴명 조회 

	public List<RAA93BDTO> selectSubMenuList(String menuId);	//메뉴관리 하위메뉴 조회

	public int deleteMainMenuInfo(List<String> menuId);

	public int deleteSubMenuInfo(List<String> menuId);

	public Optional<RAA90BDTO> getMainMenuInfo(String menuId);

	public int insertMainMenuInfo(RAA93BDTO requestDto);		

	public int updateMainMenuInfo(RAA93BDTO requestDto); 

}

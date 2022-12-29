package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Optional;

import com.nanuri.rams.business.common.dto.RAA90BDTO;
import com.nanuri.rams.business.common.dto.RAA91BDTO;
import com.nanuri.rams.business.common.vo.RAA90BVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RAA90BMapper {

	public List<RAA90BDTO> getGroupCodeInfoList(String cmnsCdGrp); 								// 그룹코드정보 리스트 가져오기

	public Optional<RAA90BDTO> getGroupCodeInfo(String cmnsCdGrp);

	public int deleteGroupCodeInfo(List<String> cmnsCdGrp);

	public List<RAA91BDTO> getCodeInfoList(String cmnsCdGrp);

	public List<RAA91BDTO> getCodeInfoList(RAA90BDTO dto); 						// 코드정보 가져오기

	public int registGroupCodeInfo(RAA90BVO.GroupCodeInfoSaveRequestVO requestDto); 							// 그룹코드정보 등록하기

	public int insertGroupCodeInfo(RAA90BVO.GroupCodeInfoSaveRequestVO requestDto);

	public int registCodeInfo(RAA90BVO.CodeInfoSaveRequestVO vo); 										// 코드정보 등록하기

	public int insertCodeInfo(RAA90BVO.CodeInfoSaveRequestVO vo);
	public Integer getMaxSeq(String cmnsCdGrp);

	public Optional<RAA91BDTO> getCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp,
											 @Param(value = "cdVlId") String cdVlId);

	public int deleteCodeInfo(@Param(value = "cmnsCdGrp") String cmnsCdGrp,
							  @Param(value = "cdVlIds") List<String> cdVlIds);

	public List<RAA90BVO.CommonCodeInfoVO> getCommonCodeName();

	public int selectTotalCount(); 																		// 조회할 코드구분(코드이름) 가져오기
}

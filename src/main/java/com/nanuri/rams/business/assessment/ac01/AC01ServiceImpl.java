package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA93BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.mapper.RAA90BMapper;
import com.nanuri.rams.business.common.mapper.RAA92BMapper;
import com.nanuri.rams.business.common.mapper.RAA93BMapper;
import com.nanuri.rams.business.common.mapper.RAA94BMapper;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDeleteRequestDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.CodeInfoSaveRequestDto;
import com.nanuri.rams.business.itmanager.dto.CommonCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoDto;
import com.nanuri.rams.business.itmanager.dto.GroupCodeInfoSaveRequestDto;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01ServiceImpl implements AC01Service {

    private final RAA90BMapper RAA90BMapper;
    private final RAA92BMapper RAA92BMapper;
    private final RAA93BMapper RAA93BMapper;
    private final RAA94BMapper RAA94BMapper;
    private final AuthenticationFacade facade;

    @Override
    public List<CodeInfoDto> getCodeInfoList(GroupCodeInfoDto groupCodeInfoDto) {
        return null;
    }

    @Override
    // TODO 코드구분 값을 파라미터로 넣어야 하나 데이터가 없어 임시로 지정
    public List<GroupCodeInfoDto> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<GroupCodeInfoDto> groupCodeInfoList = RAA90BMapper.getGroupCodeInfoList(cmnsCdGrp);
        for (GroupCodeInfoDto groupCodeInfo : groupCodeInfoList) {
            Date formatDate = dateFormat.parse(groupCodeInfo.getRgstDt());
            groupCodeInfo.setRgstDt(newFormat.format(formatDate));
        }
        return groupCodeInfoList;
    }

    @Override
    public boolean registGroupCodeInfo(List<GroupCodeInfoSaveRequestDto> requestDtos) {
        int count = 0;
        for (GroupCodeInfoSaveRequestDto requestDto : requestDtos) {
            if (RAA90BMapper.getGroupCodeInfo(requestDto.getCmnsCdGrp()).isPresent()) {
                throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getCmnsCdGrp());
            }

            if (RAA90BMapper.getGroupCodeInfo(requestDto.getOldCmnsCdGrp()).isEmpty()) {
                count += RAA90BMapper.insertGroupCodeInfo(requestDto);
            } else {
                count += RAA90BMapper.registGroupCodeInfo(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {
        int count = RAA90BMapper.deleteGroupCodeInfo(cmnsCdGrp);
        return count > 0;
    }

    @Override
    public List<CodeInfoDto> getCodeInfoList(String cmnsCdGrp) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<CodeInfoDto> codeInfoList = RAA90BMapper.getCodeInfoList(cmnsCdGrp);
        for (CodeInfoDto codeInfo : codeInfoList) {
            Date formatDate = dateFormat.parse(codeInfo.getRgstDt());
            codeInfo.setRgstDt(newFormat.format(formatDate));
        }

        return codeInfoList;
    }

    @Override
    public boolean registCodeInfo(List<CodeInfoSaveRequestDto> requestDtos) {
        int count = 0;
        for (CodeInfoSaveRequestDto requestDto : requestDtos) {
            if (RAA90BMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlId()).isPresent()) {
                throw new IllegalArgumentException("해당 코드가 존재합니다." + requestDto.getCmnsCdGrp() + " : " + requestDto.getCdVlId());
            }

            if (RAA90BMapper.getCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getOldCdVlId()).isEmpty()) {
                // 신규등록
                count += RAA90BMapper.insertCodeInfo(requestDto);
            } else {
                // 수정
                count += RAA90BMapper.registCodeInfo(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteCodeInfo(CodeInfoDeleteRequestDto requestDto) {
        return RAA90BMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlIds()) > 0;
    }

    // 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
    @Override
    public List<CommonCodeInfoDto> getCommonCodeName() {
        return RAA90BMapper.getCommonCodeName();
    }

    //============ Start AC01110S( 사용자 관리 ) ============//
    /* 사용자 추가 */
    @Override
    public void insertUser(RAA92BDTO dto) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");

        String rgstDt = today.format(date);
        String rgstTm = now.format(time);
        // String sq = String.valueOf(RAA92BMapper.getLastSq() + 1);
        // String sq = "(SELECT NEXTVAL(RAA92B_SQ))";
        // String insertSq = Optional.ofNullable(dto.getSq()).orElse(sq);
        String insertSq = Optional.ofNullable(dto.getSq()).orElse("");
        String eno = facade.getDetails().getEno();
        String dprtCd = facade.getDetails().getDprtCd();

        dto.setSq(insertSq);
        dto.setDprtCd(dprtCd);
        dto.setRgstPEno(eno);
        dto.setRgstDt(rgstDt);
        dto.setRgstTm(rgstTm);
        dto.setAplcStrtDt(dto.getAplcStrtDt().replace("-", ""));
        dto.setAplcEndDt(dto.getAplcEndDt().replace("-", ""));
        dto.setHndlPEno(eno);
        dto.setHndlDprtCd(dprtCd);

        RAA92BMapper.insertUser(dto);
    }

    /* 사용자 목록 */
    @Override
    public List<RAA92BVO.selectVO> getUserList(RAA92BVO.selectVO vo) {
        return RAA92BMapper.selectUser(vo);
    }

    /* 사용자 삭제(퇴사) */
    @Override
    public void deleteUser(RAA92BDTO dto) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");

        String dltDt = today.format(date);
        String dltTm = now.format(time);
        String eno = facade.getDetails().getEno();
        String hndlDprtCd = facade.getDetails().getDprtCd();

        dto.setDltPEno(eno);
        dto.setDltDt(dltDt);
        dto.setDltTm(dltTm);
        dto.setHndlPEno(eno);
        dto.setHndlDprtCd(hndlDprtCd);

        RAA92BMapper.deleteUser(dto);
    }

    /* 사용자관리화면 권한구분 */
    @Override
    public List<RAA94BDTO> selectAuthCode() {
        return RAA94BMapper.selectRghtCd();
    }

    //============ End AC01110S( 사용자 관리 ) ============//
    //============ Start AC01310S( 메뉴별권한 관리 ) ============//	

    /* 메뉴명 조회 */
    @Override
    public List<RAA93BVO.MenuListVO> getMenuList(String menuNm) {

        List<RAA93BVO.MenuListVO> menuList = RAA93BMapper.selectMenuList(menuNm);

        String name = "";
		String lvName = "";
        int rowNum = 0;

		for (RAA93BVO.MenuListVO menu : menuList) {
			name = "";
			lvName = "";
			if(menu.getLv2Nm() != null && menu.getLv2Nm() != ""){
				rowNum++;
				name = menu.getLv1Nm() + " > " + menu.getLv2Nm();
				lvName = menu.getLv2Id();
			}
			if(menu.getLv3Nm() != null && menu.getLv3Nm() != ""){
				rowNum++;
				name = menu.getLv1Nm() + " > " + menu.getLv2Nm() + " > " + menu.getLv3Nm();
				lvName = menu.getLv3Id();
			}
			menu.setMenuId(lvName);
			menu.setMenuName(name);
			menu.setRowNum(rowNum);
		}
		

		// depth에 따른 변수 선언
		// Map<String, String> lv1 = new HashMap<>();
        // Map<String, String> lv2 = new HashMap<>();
        // Map<String, String> lv3 = new HashMap<>();

        // for (RAA93BVO.MenuListVO menuList : menuLists) {
		// 	name = "";
        //     switch (menuList.getMenuLv()) {
        //         case 1:
        //             lv1.put(menuList.getUrlDvdCd(), menuList.getMenuNm());
        //             break;
        //         case 2:
        //             // name = "";
        //             rowNum += 1;
        //             lv2.put(menuList.getUrlDvdCd(), menuList.getMenuNm());
        //             name += lv1.get(menuList.getUrlDvdCd()) + " > " + lv2.get(menuList.getUrlDvdCd());
        //             break;
        //         case 3:
        //             // name = "";
        //             rowNum += 1;
        //             lv3.put(menuList.getUrlDvdCd(), menuList.getMenuNm());
        //             name += lv1.get(menuList.getUrlDvdCd()) + " > " + lv2.get(menuList.getUrlDvdCd()) + " > " + lv3.get(menuList.getUrlDvdCd());
        //             break;
        //     }
        //     menuList.setMenuName(name);
        //     menuList.setRowNum(rowNum);
        // }

        return menuList;
    }

    //============ End AC01310S( 메뉴별권한 관리 ) ============//	
}

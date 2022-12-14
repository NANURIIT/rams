package com.nanuri.rams.business.assessment.ac01;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.vo.RAA90BVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA90BMapper;
import com.nanuri.rams.business.common.mapper.RAA92BMapper;
import com.nanuri.rams.business.common.mapper.RAA93BMapper;
import com.nanuri.rams.business.common.mapper.RAA94BMapper;
import com.nanuri.rams.business.common.mapper.RAA95BMapper;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.business.common.vo.RAA93BVO;
import com.nanuri.rams.business.common.vo.RAA95BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01ServiceImpl implements AC01Service {

    private final RAA90BMapper raa90BMapper;
    private final RAA92BMapper raa92BMapper;
    private final RAA93BMapper raa93BMapper;
    private final RAA94BMapper raa94BMapper;
    private final RAA95BMapper raa95BMapper;
    private final AuthenticationFacade facade;

    //============ start AC01010S(공통코드관리) ============//
    @Override
    public List<RAA91BDTO> getCodeInfoList(RAA90BDTO dto) {
        return null;
    }

    @Override
    // TODO 코드구분 값을 파라미터로 넣어야 하나 데이터가 없어 임시로 지정
    public List<RAA90BDTO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<RAA90BDTO> dtoList = raa90BMapper.getGroupCodeInfoList(cmnsCdGrp);
        for (RAA90BDTO dto : dtoList) {
            Date formatDate = dateFormat.parse(dto.getRgstDt());
            dto.setRgstDt(newFormat.format(formatDate));
        }
        return dtoList;
    }

    @Override
    public boolean registGroupCodeInfo(List<RAA90BVO.GroupCodeInfoSaveRequestVO> requestDtos) {
        int count = 0;
        for (RAA90BVO.GroupCodeInfoSaveRequestVO requestDto : requestDtos) {
            if (raa90BMapper.getGroupCodeInfo(requestDto.getCmnsCdGrp()).isPresent()) {
                throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getCmnsCdGrp());
            }

            if (raa90BMapper.getGroupCodeInfo(requestDto.getOldCmnsCdGrp()).isEmpty()) {
                count += raa90BMapper.insertGroupCodeInfo(requestDto);
            } else {
                count += raa90BMapper.registGroupCodeInfo(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {
        int count = raa90BMapper.deleteGroupCodeInfo(cmnsCdGrp);
        return count > 0;
    }

    @Override
    public List<RAA91BDTO> getCodeInfoList(String cmnsCdGrp) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        List<RAA91BDTO> dtoList = raa90BMapper.getCodeInfoList(cmnsCdGrp);
        for (RAA91BDTO dto : dtoList) {
            Date formatDate = dateFormat.parse(dto.getRgstDt());
            dto.setRgstDt(newFormat.format(formatDate));
            if (dto.getRgstPEno() == null) {
                dto.setRgstPEno("-");
            }

            if (dto.getHndlPEno() == null) {
                dto.setHndlPEno("-");
            }
        }

        return dtoList;
    }

    @Override
    public boolean registCodeInfo(List<RAA90BVO.CodeInfoSaveRequestVO> vo) {
        int count = 0;
        for (RAA90BVO.CodeInfoSaveRequestVO requestVO : vo) {
            if (raa90BMapper.getCodeInfo(requestVO.getCmnsCdGrp(), requestVO.getCdVlId()).isPresent()) {
                throw new IllegalArgumentException("해당 코드가 존재합니다." + requestVO.getCmnsCdGrp() + " : " + requestVO.getCdVlId());
            }

            if (raa90BMapper.getCodeInfo(requestVO.getCmnsCdGrp(), requestVO.getOldCdVlId()).isEmpty()) {
                // 신규등록
                Integer seq = raa90BMapper.getMaxSeq(requestVO.getCmnsCdGrp()) == null
                        ? 1 : raa90BMapper.getMaxSeq(requestVO.getCmnsCdGrp()) + 1;
                requestVO.setCdSq(seq);
                requestVO.setRgstPEno(facade.getDetails().getEno());
                count += raa90BMapper.insertCodeInfo(requestVO);
            } else {
                // 수정
                requestVO.setHndlPEno(facade.getDetails().getEno());
                count += raa90BMapper.registCodeInfo(requestVO);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteCodeInfo(RAA90BVO.CodeInfoDeleteRequestVO requestDto) {
        return raa90BMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), requestDto.getCdVlIds()) > 0;
    }

    // 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
    @Override
    public List<RAA90BVO.CommonCodeInfoVO> getCommonCodeName() {
        return raa90BMapper.getCommonCodeName();
    }

    //============ end AC01010S(공통코드관리) ============//

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

        raa92BMapper.insertUser(dto);
    }

    /* 사용자 목록 */
    @Override
    public List<RAA92BVO.selectVO> getUserList(RAA92BVO.selectVO vo) {
        return raa92BMapper.selectUser(vo);
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

        raa92BMapper.deleteUser(dto);
    }

    /* 사용자관리화면 권한구분 */
    @Override
    public List<RAA94BDTO> selectAuthCode() {
        return raa94BMapper.selectRghtCd();
    }

    //============ End AC01110S( 사용자 관리 ) ============//

    //============ start AC01210S(권한별 메뉴관리) ============//
    @Override
    public List<RAA94BDTO> getAuthCode(String rghtCdNm) throws ParseException {
        List<RAA94BDTO> authCodes = raa94BMapper.selectAuthCode(rghtCdNm);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        for (RAA94BDTO authCode : authCodes) {
            if (authCode.getRgstPEno() == null) {
                authCode.setRgstPEno("-");
            }
            if (authCode.getHndlPEno() == null) {
                authCode.setHndlPEno("-");
            }
            Date formatDate = dateFormat.parse(authCode.getRgstDt());
            authCode.setRgstDt(newFormat.format(formatDate));
        }
        return authCodes;
    }

    @Override
    public List<RAA93BVO> getAuthCodeMenu(String rghtCd) {
        List<RAA93BVO> authCodeMenus = raa93BMapper.selectAuthCodeMenu(rghtCd);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
        for (RAA93BVO authCodeMenu : authCodeMenus) {
            if (authCodeMenu.getHndlPEno() == null) {
                authCodeMenu.setHndlPEno("-");
            }
            if (authCodeMenu.getHndlDyTm() == null) {
                authCodeMenu.setHndlDyTm("-");
            }
            if (authCodeMenu.getHndlPEno() == null) {
                authCodeMenu.setHndlPEno("-");
            }
        }
        return authCodeMenus;
    }

    @Override
    public boolean registerAuthCode(List<RAA94BDTO> requestDtos) {
        int count = 0;
        for (RAA94BDTO requestDto : requestDtos) {
            if (raa94BMapper.getAuthCode(requestDto.getRghtCd()).isPresent()) {
                throw new IllegalArgumentException("해당 권한코드가 존재합니다 : " + requestDto.getRghtCd());
            }

            if (raa94BMapper.getAuthCode(requestDto.getOldRghtCd()).isPresent()) {
                requestDto.setHndlPEno(facade.getDetails().getEno());
                count += raa94BMapper.updateAuthCode(requestDto);
            } else {
                String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")).toString();
                requestDto.setRgstDt(now);
                requestDto.setRgstPEno(facade.getDetails().getEno());
                count += raa94BMapper.insertAuthCode(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteAuthCode(List<String> rghtCd) {
        int count = 0;
        count += raa94BMapper.deleteAuthCode(rghtCd);
        return count > 0;
    }

    @Override
    public boolean registerAuthCodeMenu(List<RAA95BVO.menuUpdateRequestVO> voList) {
        int count = 0;
        log.debug("voList : {}", voList);
        for (RAA95BVO.menuUpdateRequestVO vo : voList) {
            RAA95BDTO dto = new RAA95BDTO();
            dto.setMenuId(vo.getMenuId());
            dto.setRghtCd(vo.getRghtCd());
            dto.setHndlPEno(facade.getDetails().getEno());

            if (raa95BMapper.selectAuthCodeMenu(dto).isPresent()) { // 신규등록이 아닐때
                if (vo.getIsModified() == false && vo.getIsUsed() == false) {   // 사용가능여부 수정가능여부 모두 체크 해제
                    count += raa95BMapper.deleteAuthCodeMenu(dto);
                } else if (vo.getIsUsed() && vo.getIsModified()) {  // 사용가능여부, 수정가능여부 모두 체크
                    dto.setMdfyRghtCcd("2");
                    count += raa95BMapper.updateAuthCodeMenu(dto);
                } else if (vo.getIsUsed() && vo.getIsModified() == false) {  // 사용가능여부만 체크
                    dto.setMdfyRghtCcd("1");
                    count += raa95BMapper.updateAuthCodeMenu(dto);
                }
            } else {   // 신규 등록일때
                if (vo.getIsUsed() && vo.getIsModified() == false) {    // 사용가능여부만 체크
                    dto.setMdfyRghtCcd("1");
                    count += raa95BMapper.insertAuthCodeMenu(dto);
                } else if (vo.getIsUsed() && vo.getIsModified()) {  // 사용가능, 수정가능여부 체크
                    dto.setMdfyRghtCcd("2");
                    count += raa95BMapper.insertAuthCodeMenu(dto);
                }
            }
        }
        return count > 0;
    }

    //============ end AC01210S(권한별 메뉴관리) ============//

    //============ Start AC01310S( 메뉴별권한 관리 ) ============//	
	
    /* 메뉴명 조회 */
    @Override
    public List<RAA93BVO.MenuListVO> getMenuList(String menuNm) {

        List<RAA93BVO.MenuListVO> menuList = raa93BMapper.selectMenuList(menuNm);

        String lvName = "";
        int rowNum = 0;

        for (RAA93BVO.MenuListVO menu : menuList) {
            lvName = "";
            if (menu.getLv2Id() != null && menu.getLv2Id() != "") {
                rowNum++;
                lvName = menu.getLv2Id();
            }
            if (menu.getLv3Id() != null && menu.getLv3Id() != "") {
                rowNum++;
                lvName = menu.getLv3Id();
            }
            menu.setMenuId(lvName);
            menu.setRowNum(rowNum);
        }

        return menuList;
    }

    /* 권한별 메뉴화면 사용권한 조회 */
    @Override
    public List<RAA94BDTO> getMenuByAuth() {
        List<RAA94BDTO> menuAuthList = raa94BMapper.selectRghtCd();
        for (RAA94BDTO menu : menuAuthList) {
            String hndlPEno = Optional.ofNullable(menu.getHndlPEno()).orElse("");
            menu.setHndlPEno(hndlPEno);
        }

        return menuAuthList;
    }

    /* RAA95B 수정 조회 가능 여부 조회 */
    @Override
    public List<RAA95BDTO> getAvailableMenu(Map<String, String> menuId) {
        return raa95BMapper.selectAvailableMenu(menuId);
    }

    /**
	 * RAA95B 조회 및 수정 여부 INSERT and DELETE
	 * 
	 * 메뉴의 상위메뉴가 존재하여 lvId로 화면ID를 받아온다.
	 * 화면의 depth(LV)에 따라 순차(하위메뉴 > 상위메뉴 [> 최상위메뉴 ...])적으로 SQ를 할당하여 insert
	 * SELECT NEXTVAL(SQ)를 이용하여 유니크한 int value를 받아오고 (NEXTVAL(SQ)을 매번 실행하지 않는다)
	 * 다음 insert를 위해 rollNum(실행횟수)만큼 NEXTVAL(SQ)를 DB에 실행 요청한다.
	 * 
	 * 화면 권한 삭제의 경우 menuId : 'rghtCdCancel'(default parameter)란 값이 요청되면
	 * SQ와 권한코드로 delete 쿼리를 depth만큼 실행한다.
	 */
    @Override
    public boolean registUseMenu(ArrayList<RAA95BVO.selectUseMenuVO> dtoList) {
        int count = 0;
        String hndlDprtCd = facade.getDetails().getDprtCd();
        String hndlPEno = facade.getDetails().getEno();
        int nextVal = raa95BMapper.nextVal();

        for (RAA95BVO.selectUseMenuVO dto : dtoList) {
            dto.setHndlDprtCd(hndlDprtCd);
            dto.setHndlPEno(hndlPEno);
            int sq = dto.getSq();
            int totalDepth = 3;		// 화면메뉴의 최대값
			int rollNum = 1;		// sq value로 쓰인 NEXTVAL()의 값을 매칭시키기 위한 변수

            /* lv3Id가 없는 경우 */
            if ((sq == 0) && (!dto.getMenuId().equals("rghtCdCancel")) && dto.getLv3Id().equals("null")) {			// 중복된 데이터가 없는 경우
                dto.setSq(nextVal);
                count += raa95BMapper.insertUseMenu(dto);
                dto.setMenuId(dto.getLv1Id());
                dto.setSq(nextVal + 1);
                dto.setMdfyRghtCcd("1");		// 상위메뉴의 경우 조회 권한만
                count += raa95BMapper.insertUseMenu(dto);
				if(rollNum < totalDepth-1){
					raa95BMapper.nextVal();		// nextVal + 1을 채우기 위해
				}
            } else if (sq != 0 && (!dto.getMenuId().equals("rghtCdCancel")) && dto.getLv3Id().equals("null")) {		// 중복된 데이터가 있는 경우
                if (!raa95BMapper.isExist(dto)) {
                    count += raa95BMapper.insertUseMenu(dto);
                } else if (raa95BMapper.isExist(dto)) {
                    count += raa95BMapper.updateAuthCodeMenu(dto);
                }
            } else if (sq != 0 && dto.getMenuId().equals("rghtCdCancel") && dto.getLv3Id().equals("null")) {		// 모든 권한을 취소하는 경우
                for (int i = 0; i < totalDepth-1; i++) {
                    dto.setSq(sq + i);
                    count += raa95BMapper.deleteUseMenu(dto);
                }
            }

            /* lv3Id가 있는 경우 */
            if (sq == 0 && (!dto.getMenuId().equals("rghtCdCancel")) && (!dto.getLv3Id().equals("null"))) {			// 중복된 데이터가 없는 경우
                dto.setSq(nextVal);
                dto.setMenuId(dto.getLv3Id());
                count += raa95BMapper.insertUseMenu(dto);
                dto.setMdfyRghtCcd("1");		// 상위메뉴의 경우 조회 권한만
                dto.setMenuId(dto.getLv2Id());
                dto.setSq(nextVal + 1);
                count += raa95BMapper.insertUseMenu(dto);
                dto.setMenuId(dto.getLv1Id());
                dto.setSq(nextVal + 2);
                count += raa95BMapper.insertUseMenu(dto);
				if(rollNum < totalDepth){
					raa95BMapper.nextVal();		// nextVal + 1을 채우기 위해
				}
            } else if (sq != 0 && (!dto.getMenuId().equals("rghtCdCancel")) && (!dto.getLv3Id().equals("null"))) {	// 중복된 데이터가 있는 경우
				if (!raa95BMapper.isExist(dto)) {
					count += raa95BMapper.insertUseMenu(dto);
                } else if (raa95BMapper.isExist(dto)) {
					count += raa95BMapper.updateAuthCodeMenu(dto);
                }
            } else if (sq != 0 && dto.getMenuId().equals("rghtCdCancel") && (!dto.getLv3Id().equals("null"))) {		// 모든 권한을 취소하는 경우
                for (int i = 0; i < totalDepth; i++) {
					System.out.println("      ######### " + dto.getLv3Id().getClass().getName());
                    dto.setSq(sq + i);
                    count += raa95BMapper.deleteUseMenu(dto);
                }
            }
			rollNum++;
        }
        return count > 0;
    }
    //============ End AC01310S( 메뉴별권한 관리 ) ============//
}

$(function () {
	//
    getAuthCode();

    clickDetailButton();
    doubleClickColumn();

    $(document).on('click', '.can_use_yn', function() {
        let useCheckBox = $(this);
        let modifyCheckBox = $(this).parent().parent().find("td:eq(5)").find(".can_modify_yn");
        if(!useCheckBox.prop('checked') && modifyCheckBox.prop('checked')) {
            modifyCheckBox.prop('checked', false);
        }
    });

    $(document).on('click', '.can_modify_yn', function() {
        let useChecked = $(this).parent().parent().find("td:eq(4)").find(".can_use_yn");
        let modifyChecked = $(this);
        if(!useChecked.prop('checked') && modifyChecked.prop('checked')) {
            useChecked.prop('checked', true);
        }
    });
});

/*******************************************************************
 *** 공통 event
 *******************************************************************/
/**
 * 권한명으로 검색
 */
function searchButtonClick() {
    let searchKeyword = $('#authCodeSearchInput').val();
    getAuthCode(searchKeyword);
}

/**
 * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
 */
function doubleClickColumn() {
    $(document).on('dblclick', '.update_column', function () {
        let trClass = $(this).attr('class').split(' ')[1]
        tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
        $(this).html(tdInputHTML);
    });
}

/*******************************************************************
 *** 상단 그리드 event
 *******************************************************************/
/**
 * 권한목록 조회 ajax
 */
function getAuthCode(rghtCdNm) {
    let _url = '/getAuthCode';
    if (!isEmpty(rghtCdNm)) {
        _url += '?rghtCdNm=' + rghtCdNm;
    }
    ajaxCall({
        method: 'get',
        url: _url,
        success: function (authCode) {
            let html = '';
            if (authCode.length > 0) {
                $.each(authCode, function (key, value) {
                    html += '<tr>';
                    html += '   <td><input id="' + value.rghtCd + '" style="width: 100%;" type="checkbox"></td>';
                    html += '   <td class="update_column auth_code">' + value.rghtCd + '</td>';
                    html += '   <td class="update_column auth_code_name">' + value.rghtCdNm + '</td>';
                    html += '   <td class="update_column auth_explain">' + value.rghtCdExpl + '</td>';
                    html += '   <td style="text-align:center;"><button class="detail_button btn btn-warning btn-xs" id="' + value.rghtCd + '"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>';
                    html += '   <td style="text-align:center;">' + value.rgstDt + '</td>';
                    html += '   <td style="text-align:center;">' + value.rgstPEno + '</td>';
                    if (value.aplcF === 'Y') {
                        html += '   <td><input style="width:100%;" class="auth_code_use_yn" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
                    } else {
                        html += '   <td><input style="width:100%;" class="auth_code_use_yn" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
                    }

                    if (isEmpty(value.hndlDyTm)) {
                        html += '   <td style="text-align:center;"> - </td>';
                    } else {
                        html += '   <td style="text-align:center;">' + value.hndlDyTm.substring(0, 10) + '</td>';
                    }

                    if (isEmpty(value.hndlDyTm)) {
                        html += '   <td style="text-align:center;"> - </td>';
                    } else {
                        html += '   <td style="text-align:center;">' + value.hndlDyTm.substring(11, 19) + '</td>';
                    }
                    html += '   <td style="text-align:center;">' + value.hndlPEno + '</td>';
                    html += '</tr>';
                });
            } else {
                html += '<tr>';
                html += '   <td colspan="12" style="text-align: center">데이터가 없습니다.</td>';
                html += '</tr>';
            }
            $('#authCodeTable').html(html);

        }
    });
}



/**
 * 행추가 버튼 클릭
 */
function addAuthCodeRow() {
    let html = '';
    html += '<tr>';
    html += '   <td></td>';
    html += '   <td><input class="auth_code_input" style="width: 100%;" type="text"></td>';
    html += '   <td><input class="auth_code_name_input" style="width: 100%;" type="text"></td>';
    html += '   <td><input class="auth_explain_input" style="width: 100%;" type="text"></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '   <td><input style="width:100%;" class="auth_code_use_yn" type="checkbox"></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '</tr>';
    $('#authCodeTable').append(html);
    $('.auth_code_input').focus();
}

/**
 * 권한코드 상세버튼 클릭
 */
function clickDetailButton() {
    $(document).on('click', '.detail_button', function (e) {
        e.preventDefault();
        let rghtCd = $(this).attr('id');
        getAuthCodeMenu(rghtCd);
    });
}

/**
 * 권한코드별 상세 메뉴 호출
 * @param {권한코드} rghtCd 
 */
function getAuthCodeMenu(rghtCd) {
    ajaxCall({
        method: 'get',
        url: '/getAuthCodeMenu?rghtCd=' + rghtCd,
        success: function (authCodeMenu) {
            let html = '';
            if (authCodeMenu.length > 0) {
                $.each(authCodeMenu, function (key, value) {
                    console.log(key);
                    html += '<tr>';
                    html += '   <td>' + (key + 1) + '</td>';
                    html += '   <td>' + value.menuId + '</td>';
                    html += '   <td>'+ rghtCd +'</td>';
                    html += '   <td>' + value.menuLv + '</td>';
                    if (isEmpty(value.mdfyRghtCcd)) {
                        html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox"><input type="hidden" class="use_hidden_yn" value="n"></td>';
                        html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox"><input type="hidden" class="modify_hidden_yn" value="n"></td>';
                    } else if(value.mdfyRghtCcd === '1') {
                        html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" checked><input type="hidden" class="use_hidden_yn" value="y"></td>';
                        html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox"><input type="hidden" class="modify_hidden_yn" value="n"></td>';
                    } else {
                        html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" checked><input type="hidden" class="use_hidden_yn" value="y"></td>';
                        html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" checked><input type="hidden" class="modify_hidden_yn" value="y"></td>';
                    }

                    html += '   <td style="text-align:center;">' + value.hndlDyTm.substring(0, 10) + '</td>';
                    if (value.hndlDyTm === '-') {
                        html += '   <td style="text-align:center;"> - </td>';
                    } else {
                        html += '   <td style="text-align:center;">' + value.hndlDyTm.substring(10, value.hndlDyTm.length) + '</td>';
                    }

                    html += '   <td style="text-align:center;">' + value.hndlPEno + '</td>';
                    html += '</tr>';
                });
            } else {
                html += '<tr>';
                html += '   <td colspan="9" style="text-align: center">데이터가 없습니다.</td>';
                html += '</tr>';
            }
            $('#authCodeMenuTable').html(html);
        }
    });
}


/**
 * 행삭제 버튼 클릭
 */
function clickDeleteButton() {
    let tr = $('#authCodeTable').children();
    let authCodeList = new Array();
    for (let i = 0; i < tr.length; i++) {
        let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
        if (deleteCheckBox.is(":checked")) {
            authCodeList.push(deleteCheckBox.attr("id"));
        }
    }
    deleteRow(authCodeList);
}

/**
 * 행삭제 ajax
 * @param {권한코드 리스트} authCodeList 
 */
function deleteRow(authCodeList) {
    ajaxCall({
        method: 'patch',
        url: '/deleteAuthCode',
        data: authCodeList,
        success: function () {
            getAuthCode();
        }
    });
}

/**
 * 권한코드 저장버튼 클릭 event
 */
function clickAuthSaveButton() {

    let authCodeList = new Array();
    let tr = $('#authCodeTable').children();

    for (let i = 0; i < tr.length; i++) {

        let authCode = new Object();

        let authCodeInput = $(tr[i]).find("td:eq(1)").find("input");
        let authCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
        let authExplainInput = $(tr[i]).find("td:eq(3)").find("input");
        let authCodeUseYn = $(tr[i]).find("td:eq(8)").find(".auth_code_use_yn").prop("checked");
        let authCodeUseYnCheck = $(tr[i]).find("td:eq(8)").find(".hidden_yn").val();

        if (authCodeInput.length === 1) {
            if (!authCodeInput.val()) {
                openPopup({
                    title: '실패',
                    text: '권한코드를 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeInput.focus();
                        });
                    }
                });
                return;
            } else if (authCodeInput.val().length > 4) {
                openPopup({
                    title: '실패',
                    text: '권한코드는 4자리 이하로 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeInput.focus();
                        });
                    }
                });
                return;
            }
            authCode.rghtCd = authCodeInput.val();
        }

        if (authCodeNameInput.length === 1) {
            if (!authCodeNameInput.val()) {
                openPopup({
                    title: '실패',
                    text: '권한명를 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeNameInput.focus();
                        });
                    }
                });
                return;
            }
            authCode.rghtCdNm = authCodeNameInput.val();
        }

        if (authExplainInput.length === 1) {
            if (!authExplainInput.val()) {
                openPopup({
                    title: '실패',
                    text: '권한설명을 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeNameInput.focus();
                        });
                    }
                });
                return;
            }
            authCode.rghtCdExpl = authExplainInput.val();
        }

        if (!authCodeUseYnCheck || (authCodeUseYn && authCodeUseYnCheck === 'n') || (!authCodeUseYn && authCodeUseYnCheck === 'y')) {
            authCode.aplcF = authCodeUseYn ? "Y" : "N";
        }

        if (!(Object.keys(authCode).length === 0)) {
            authCode.oldRghtCd = $(tr[i]).find("td:eq(0)").find("input").attr("id");
            authCodeList.push(authCode);
        }
    }

    if (authCodeList.length > 0) {
        saveAuthCode(authCodeList);
    }
}

/**
 * 권한코드 저장 ajax
 * @param {권한코드 리스트} authCodeList 
 */
function saveAuthCode(authCodeList) {
    ajaxCall({
        url: '/registerAuthCode',
        method: 'post',
        data: authCodeList,
        success: function () {
            getAuthCode();
        },
        fail: function (response) {
            let message = response.responseJSON.message;
            openPopup({
                title: '실패',
                type: 'error',
                text: message
            });
        }
    })
}


/*******************************************************************
 *** 하단 그리드 event
 *******************************************************************/
/**
 * 메뉴 저장버튼 클릭
 */
function clickSaveMenuButton() {
    let authCodeMenuList = new Array();
    let tr = $('#authCodeMenuTable').children();
    let authCode = $(tr[0]).find("td:eq(2)").text();

    for (let i = 0; i < tr.length; i++) {
        let authCodeMenu = new Object();

        let menuUseYn = $(tr[i]).find("td:eq(4)").find(".can_use_yn").prop("checked");
        let menuUseYnCheck = $(tr[i]).find("td:eq(4)").find(".use_hidden_yn").val();
        let menuModifyYn = $(tr[i]).find("td:eq(5)").find(".can_modify_yn").prop("checked");
        let menuModifyYnCheck = $(tr[i]).find("td:eq(5)").find(".modify_hidden_yn").val();

        if (!menuUseYnCheck || (menuUseYn && menuUseYnCheck === 'n') || (!menuUseYn && menuUseYnCheck === 'y')) {
            authCodeMenu.isUsed = menuUseYn;
        }

        if (!menuModifyYnCheck || (menuModifyYn && menuModifyYnCheck === 'n') || (!menuModifyYn && menuModifyYnCheck === 'y')) {
            authCodeMenu.isUsed = menuUseYn;
            authCodeMenu.isModified = menuModifyYn;
        }

        if (!(Object.keys(authCodeMenu).length === 0)) {
            authCodeMenu.menuId = $(tr[i]).find("td:eq(1)").text();
            authCodeMenu.rghtCd = authCode;
            authCodeMenuList.push(authCodeMenu);
        }
    }

    if (authCodeMenuList.length > 0) {
        console.log(authCodeMenuList);
        saveMenu(authCodeMenuList, authCode);
    }
}

/**
 * 메뉴 저장 ajax
 */
function saveMenu(authCodeMenuList, authCode) {
    ajaxCall({
        method: 'post',
        url: '/registerAuthCodeMenu',
        data: authCodeMenuList,
        success: function () {
            openPopup({
                title : '성공', 
                text : '저장이 완료되었습니다.', 
                type : 'success', 
                callback : function() {
                    $(document).on('click', '.confirm', function() {
                        getAuthCodeMenu(authCode);
                    });
                }
            });
        },
        fail: function (response) {
            let message = response.responseJSON.message;
            openPopup({
                title: '실패',
                type: 'error',
                text: message
            });
        }
    });
}

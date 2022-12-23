$(function () {
    getAuthCode();

    clickDetailButton();
    doubleClickColumn();
});

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
                    html += '   <td><input id="' + value.rghtCd + '" style="width: 15px;" type="checkbox"></td>';
                    html += '   <td class="update_column auth_code">' + value.rghtCd + '</td>';
                    html += '   <td class="update_column auth_code_name">' + value.rghtCdNm + '</td>';
                    html += '   <td class="update_column auth_explain">' + value.rghtCdExpl + '</td>';
                    html += '   <td>';
                    html += '       <select style="width: 170px;">';
                    html += '           <option value="">해당부서</option>'
                    html += '           <option value="">1</option>'
                    html += '           <option value="">2</option>'
                    html += '           <option value="">3</option>'
                    html += '       </select>';
                    html += '   </td>';
                    html += '   <td><button class="detail_button" id="' + value.rghtCd + '">⬇︎ 상세</button></td>';
                    html += '   <td>' + value.rgstDt + '</td>';
                    html += '   <td>' + value.rgstPEno + '</td>';
                    if (value.aplcF === 'Y') {
                        html += '   <td><input style="width: 15px;" class="auth_code_use_yn" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" class="auth_code_use_yn" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
                    }
                    html += '   <td>' + value.hndlDyTm + '</td>';
                    html += '   <td>' + value.hndlDyTm + '</td>';
                    html += '   <td>' + value.hndlPEno + '</td>';
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
 * 권한명으로 검색
 */
function searchButtonClick() {
    let searchKeyword = $('#authCodeSearchInput').val();
    getAuthCode(searchKeyword);
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
    html += '   <td></td>';
    html += '   <td><input style="width: 15px;" class="auth_code_use_yn" type="checkbox"></td>';
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
                    html += '<tr>';
                    html += '   <td>' + value.srtNo + '</td>';
                    html += '   <td>' + value.menuId + '</td>';
                    html += '   <td>' + value.rghtCd + '</td>';
                    html += '   <td>' + value.menuLv + '</td>';
                    if (value.dltF === 'N') {
                        html += '   <td><input style="width: 15px;" class="can_use_yn" type="checkbox" checked><input type="hidden" class="use_hidden_yn" value="y"></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" class="can_use_yn" type="checkbox"><input type="hidden" class="use_hidden_yn" value="n"></td>';
                    }

                    if (value.mdfyRghtCcd === '2') {
                        html += '   <td><input style="width: 15px;" class="can_modify_yn" type="checkbox" checked><input type="hidden" class="modify_hidden_yn" value="y"></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" class="can_modify_yn" type="checkbox"><input type="hidden" class="modify_hidden_yn" value="n"></td>';
                    }
                    html += '   <td>' + value.hndlDyTm + '</td>';
                    html += '   <td>' + value.hndlDyTm + '</td>';
                    html += '   <td>' + value.hndlPEno + '</td>';
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
 * 행삭제 호출
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
 * 권한코드 저장버튼 클릭
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
 * 권한코드 저장 요청
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
            authCodeMenu.dltF = menuUseYn ? 'N' : 'Y';
        }

        if (!menuModifyYnCheck || (menuModifyYn && menuModifyYnCheck === 'n') || (!menuModifyYn && menuModifyYnCheck === 'y')) {
            authCodeMenu.mdfyRghtCcd = menuModifyYn ? '2' : '1';
        }

        if (!(Object.keys(authCodeMenu).length === 0)) {
            authCodeMenu.menuId = $(tr[i]).find("td:eq(1)").text();
            authCodeMenuList.push(authCodeMenu);
        }
    }

    if (authCodeMenuList.length > 0) {
        saveMenu(authCodeMenuList, authCode);
    }
}

/**
 * 메뉴 저장요청
 */
function saveMenu(authCodeMenuList, authCode) {
    ajaxCall({
        method: 'post',
        url: '/registerAuthCodeMenu',
        data: authCodeMenuList,
        success: function () {
            getAuthCodeMenu(authCode);
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
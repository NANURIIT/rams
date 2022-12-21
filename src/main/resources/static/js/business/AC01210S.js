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

function searchButtonClick() {
    let searchKeyword = $('#authCodeSearchInput').val();
    getAuthCode(searchKeyword);
}

function clickDetailButton() {
    $(document).on('click', '.detail_button', function (e) {
        e.preventDefault();
        let rghtCd = $(this).attr('id');
        getAuthCodeMenu(rghtCd);
    });
}

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
                        html += '   <td><input style="width: 15px;" type="checkbox" checked></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" type="checkbox"></td>';
                    }

                    if(value.mdfyRghtCcd === '2') {
                        html += '   <td><input style="width: 15px;" type="checkbox" checked></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" type="checkbox"></td>';
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

function addRow() {
    console.log('addRow');
}

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

function deleteRow(authCodeList) {
    ajaxCall({
        method: 'patch', 
        url : '/deleteAuthCode', 
        data : authCodeList,
        success : function() {
            getAuthCode();
        }
    });
}

function clickAuthSaveButton() {

    let authCodeList = new Array();
    let tr = $('#authCodeTable').children();

    for(let i = 0; i < tr.length; i++) {

        let authCode = new Object();

        let authCodeInput = $(tr[i]).find("td:eq(1)").find("input");
        let authCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
        let authExplainInput = $(tr[i]).find("td:eq(3)").find("input");
        let authCodeUseYn = $(tr[i]).find("td:eq(8)").find(".auth_code_use_yn").prop("checked");
        let authCodeUseYnCheck = $(tr[i]).find("td:eq(8)").find(".hidden_yn").val();

        if(authCodeInput.length === 1) {
            authCode.rghtCd = authCodeInput.val();
        }

        if(authCodeNameInput.length === 1){
            authCode.rghtCdNm = authCodeNameInput.val();
        }

        if(authExplainInput.length === 1) {
            authCode.rghtCdExpl = authExplainInput.val();
        }
        
        if(!authCodeUseYnCheck || (authCodeUseYn && authCodeUseYnCheck === 'n') || (!authCodeUseYn && authCodeUseYnCheck === 'y')) {
            authCode.aplcF = authCodeUseYn ? "Y" : "N";
        }

        if (!(Object.keys(authCode).length === 0)) {
            authCode.oldRghtCd = $(tr[i]).find("td:eq(0)").find("input").attr("id");
            authCodeList.push(authCode);
        }
    }
    
    if(authCodeList.length > 0) {
        saveAuthCode(authCodeList);
    }
}

function saveAuthCode(authCodeList) {
    console.log('in function authCodeList : ', authCodeList);
    ajaxCall({
        url : '/registerAuthCode', 
        method: 'post', 
        data : authCodeList, 
        success : function() {
            getAuthCode();
        }, 
        fail : function() {

        }
    })
}

function saveMenu() {
    console.log('saveMenu');
}

/**
 * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
 */
function doubleClickColumn() {
	$(document).on('dblclick', '.update_column', function() {
		let trClass = $(this).attr('class').split(' ')[1]
		tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
		$(this).html(tdInputHTML);
	});
}
$(function () {
    getAuthCode();

    clickDetailButton();
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
                    html += '   <td><input style="width: 15px;" type="checkbox"></td>';
                    html += '   <td>' + value.rghtCd + '</td>';
                    html += '   <td>' + value.rghtCdNm + '</td>';
                    html += '   <td>' + value.rghtCdExpl + '</td>';
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
                html += '   <td colspan="12" style="text-align: center">데이터가 없습니다.</td>';
                html += '</tr>';
            }
            $('#authCodeTable').html(html);

        }
    });
}

function searchButtonClick() {
    let searchKeyword = $('#authCodeSearchInput').val()
    if (!searchKeyword) {
        openPopup({
            title: '실패',
            text: '권한명을 입력해주세요',
            type: 'error',
            success: function () {
                $(document).on('click', '.confirm', function () {
                    $('#authCodeSearchInput').focus();
                });
            }
        });
    } else {
        getAuthCode(searchKeyword);
    }
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
                    if(value.dltF === 'N') {
                        html += '   <td><input style="width: 15px;" type="checkbox" checked></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" type="checkbox"></td>';
                    }
                    html += '   <td>' + value.mdfyRghtCcd + '</td>';
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
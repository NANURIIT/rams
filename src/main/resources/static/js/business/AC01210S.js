$(function () {
    getAuthCode();
    console.log(1);
});

function getAuthCode(rghtCdNm) {
    let _url = '/getAuthCode';
    if(!isEmpty(rghtCdNm)) {
        _url += '?rghtCdNm=' + rghtCdNm;
    }
    ajaxCall({
        method: 'get',
        url: _url,
        success: function (authCode) {
            let html = '';
            if (authCode.length > 0) {
                $.each(authCode, function(key, value) {
                    console.log(value);
                    console.log(value.length);
                    html += '<tr>';
                    html += '   <td></td>';
                    html += '   <td>'+value.rghtCd+'</td>';
                    html += '   <td>'+value.rghtCdNm+'</td>';
                    html += '   <td>'+value.rghtCdExpl+'</td>';
                    html += '   <td>';
                    html += '       <select style="width: 170px;">';
                    html += '           <option value="">해당부서</option>'
                    html += '           <option value="">1</option>'
                    html += '           <option value="">2</option>'
                    html += '           <option value="">3</option>'
                    html += '       </select>';
                    html += '   </td>';
                    html += '   <td><button id="#">⬇︎ 상세</button></td>';
                    html += '   <td>'+value.rgstDt+'</td>';
                    html += '   <td>'+value.rgstPEno+'</td>';
                    if(value.aplcF === 'Y') {
                        html += '   <td><input style="width: 15px;" type="checkbox" checked></td>';
                    } else {
                        html += '   <td><input style="width: 15px;" type="checkbox"></td>';
                    }
                    html += '   <td>'+value.hndlDyTm+'</td>';
                    html += '   <td>'+value.hndlDyTm+'</td>';
                    html += '   <td>'+value.hndlPEno+'</td>';
                    html += '</tr>';
                });
                $('#authCodeTable').html(html);
            }
        }
    });
}

function searchButtonClick() {
    let searchKeyword = $('#authCodeSearchInput').val()
    if(!searchKeyword) {
        openPopup({
            title: '실패', 
            text: '권한명을 입력해주세요', 
            type: 'error', 
            success: function() {
                $(document).on('click', '.confirm', function() {
                    $('#authCodeSearchInput').focus();
                });
            }
        });
    } else {
        getAuthCode(searchKeyword);
    }
}
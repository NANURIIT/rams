$(function () {
    let cmnsCdGrp = ''
    getCommonCodeInfo();
    getGroupCodeInfoList(cmnsCdGrp);
    
    selectCommonCode();

    clickDetailButton();
    doubleClickColumn();

    addGroupCodeRow();
    deleteGroupCodeRow();
    clickSaveGroupCode();
    
    addCodeRow();
    deleteGroupRow();
    clickSaveCode();
});

function selectCommonCode() {
    $(document).on('click', '#commonCodeSearch', function () {
        let cmnsCdGrp = $('#commonCodeInfo option:selected').val()
        getGroupCodeInfoList(cmnsCdGrp);
    });
}

function clickDetailButton() {
    $(document).on('click', '.groupCodeDetail', function (e) {
        e.preventDefault();
        getGroupCodeInfo($(this).attr('id'));
    });
}

function doubleClickColumn() {
    $(document).on('dblclick', '.update_column', function () {
        // refactoring
        let trClass = $(this).attr('class').split(' ')[1]
        tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
        $(this).html(tdInputHTML);
    });
}

function addGroupCodeRow() {
    $(document).on('click', '#add_group_row', function () {
        // refactoring
        let ROW_HTML = '';
        ROW_HTML += '<tr>';
        ROW_HTML += '   <td><input style="width:100%" type="checkbox"></td>';
        ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
        ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td><input class="group_code_use_yn" style="width:100%" type="checkbox"></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '</tr>';
        $('#groupCodeListTable').append(ROW_HTML);
    });
}

function deleteGroupCodeRow() {
    $(document).on('click', '#delete_group_row', function () {
        // refactoring
        let groupCodeList = new Array();
        let tr = $('#groupCodeListTable').children();

        for (let i = 0; i < tr.length; i++) {
            let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
            if (deleteCheckBox.is(":checked")) {
                groupCodeList.push(deleteCheckBox.attr("id"));
            }
        }

        if (groupCodeList.length != 0) {
            deleteGroupCode(groupCodeList);
        }
    });
}

function clickSaveGroupCode() {
    $(document).on('click', '#save_group', function () {
        // refactoring
        let groupCodeList = new Array();

        let tr = $('#groupCodeListTable').children();

        for (let i = 0; i < tr.length; i++) {
            let groupCode = new Object();

            let groupCodeInput = $(tr[i]).find("td:eq(1)").find("input");
            let groupCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
            let groupCodeLengthInput = $(tr[i]).find("td:eq(4)").find("input");
            let groupCodeUseYn = $(tr[i]).find("td:eq(7)").find(".group_code_use_yn").prop("checked");
            let groupCodeUseYnCheck = $(tr[i]).find("td:eq(7)").find(".hidden_yn").val();

            if (groupCodeInput.length == 1) {
                groupCode.cmnsCdGrp = groupCodeInput.val();
            }

            if (groupCodeNameInput.length == 1) {
                groupCode.cmnsCdNm = groupCodeNameInput.val();
            }

            if (groupCodeLengthInput.length == 1) {
                groupCode.cdLngth = groupCodeLengthInput.val();
            }

            if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
                groupCode.useF = groupCodeUseYn ? 'Y' : 'N';
            }

            if (!(Object.keys(groupCode).length === 0)) {
                groupCode.oldCmnsCdGrp = $(tr[i]).find("td:eq(0)").find("input").attr("id")
                groupCodeList.push(groupCode);
            }
        }

        if (groupCodeList.length != 0) {
            saveGroupCode(groupCodeList);
        }
    });
}

function addCodeRow() {
    $(document).on('click', '#add_row', function () {
        let ROW_HTML = '';
        ROW_HTML += '<tr>';
        ROW_HTML += '   <td><input style="width:100%" type="checkbox"></td>';
        ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
        ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox"></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '   <td></td>';
        ROW_HTML += '</tr>';
        $('#codeListTable').append(ROW_HTML);
    });
}

function deleteGroupRow() {
    $(document).on('click', '#delete_row', function () {
        let request = new Object();
        let codeList = new Array();
        let tr = $('#codeListTable').children();

        for (let i = 0; i < tr.length; i++) {
            let deleteCheckBox = $(tr[i]).find('input');

            if (deleteCheckBox.prop('checked')) {
                codeList.push(deleteCheckBox.attr('id'));
            }
        }

        if (codeList.length > 0) {
            request.cmnsCdGrp = $(tr[0]).attr('id')
            request.cdVlIds = codeList;
        }

        if (Object.keys(request).length > 0) {
            deleteCode(request);
        }
    });
}

function clickSaveCode() {
    $(document).on('click', '#save', function () {
        let codeList = new Array();
        let tr = $('#codeListTable').children();
        for (let i = 0; i < tr.length; i++) {
            let code = new Object();

            let groupCodeId = tr.attr('id');
            let oldCodeId = $(tr[i]).find("td:eq(0)").find("input").attr('id');
            let codeInput = $(tr[i]).find("td:eq(1)").find("input");
            let codeNameInput = $(tr[i]).find("td:eq(2)").find("input");
            let codeUseYn = $(tr[i]).find("td:eq(5)").find(".code_use_yn").prop("checked");
            let codeUseYnCheck = $(tr[i]).find("td:eq(5)").find(".hidden_yn").val();

            if (codeInput.length == 1) {
                code.cdVlId = codeInput.val();
            }

            if (codeNameInput.length == 1) {
                code.cdVlNm = codeNameInput.val();
            }

            if (!codeUseYnCheck || (codeUseYn && codeUseYnCheck === 'n') || (!codeUseYn && codeUseYnCheck === 'y')) {
                code.useF = codeUseYn ? 'Y' : 'N';
            }
            
            if (!(Object.keys(code).length === 0)) {
                code.oldCdVlId = oldCodeId;
                code.cmnsCdGrp = groupCodeId;
                codeList.push(code);
            }
        }

        if (codeList.length > 0) {
            saveCode(codeList);
        }
    });
}

var getCommonCodeInfo = function () {
    $.ajax({
        url: '/commonCodeInfo',
        method: 'GET',
        dataType: 'json'
    }).done(function (commonCodeInfo) {
        let commonCodeOption = '<option value="">전체</option>';
        for (let i = 0; i < commonCodeInfo.length; i++) {
            let commonCode = commonCodeInfo[i];
            commonCodeOption += '<option value="' + commonCode.cmnsCdGrp + '">' + commonCode.cmnsCdGrp + '(' + commonCode.cmnsCdGrpExpl + ')</option>';
        }
        $('#commonCodeInfo').html(commonCodeOption);
    });
}

var getGroupCodeInfoList = function (cmnsCdGrp) {
    let _url = '/groupCodeInfoList';

    if (cmnsCdGrp) {
        _url += '?cmnsCdGrp=' + cmnsCdGrp;
    }

    $.ajax({
        url: _url,
        method: 'GET',
        dataType: 'json'
    }).done(function (groupCodeInfoList) {
        let groupCodeInfoHTML = '';
        for (let i = 0; i < groupCodeInfoList.length; i++) {
            let groupCodeInfo = groupCodeInfoList[i];
            groupCodeInfoHTML += '<tr>';
            groupCodeInfoHTML += '  <td><input id="' + groupCodeInfo.cmnsCdGrp + '" style="width:100%" type="checkbox"></td>';
            groupCodeInfoHTML += '  <td class="update_column group_code">' + groupCodeInfo.cmnsCdGrp + '</td>';
            groupCodeInfoHTML += '  <td class="update_column group_code_name">' + groupCodeInfo.cmnsCdNm + '</td>';
            groupCodeInfoHTML += '  <td></td>';
            groupCodeInfoHTML += '  <td class="update_column group_code_length">' + groupCodeInfo.cdLngth + '</td>';
            groupCodeInfoHTML += '  <td><button class="groupCodeDetail" id="' + groupCodeInfo.cmnsCdGrp + '">↓상세</button></td>';
            groupCodeInfoHTML += '  <td>' + groupCodeInfo.cmnsCdGrpExpl + '</td>';
            if (groupCodeInfo.useF === 'Y') {
                groupCodeInfoHTML += '  <td><input style="width:100%" class="group_code_use_yn" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
            } else {
                groupCodeInfoHTML += '  <td><input style="width:100%" class="group_code_use_yn" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
            }
            groupCodeInfoHTML += '  <td>' + groupCodeInfo.rgstDt + '</td>';
            groupCodeInfoHTML += '  <td></td>';
            groupCodeInfoHTML += '  <td></td>';
            groupCodeInfoHTML += '</tr>';
        }
        $('#groupCodeListTable').html(groupCodeInfoHTML);
    });
}

var getGroupCodeInfo = function (cmnsCdGrp) {
    $.ajax({
        url: 'groupCodeInfo?cmnsCdGrp=' + cmnsCdGrp,
        method: 'GET',
        dataType: 'json'
    }).done(function (codeInfoList) {
        let codeInfoHTML = '';
        for (let i = 0; i < codeInfoList.length; i++) {
            let codeInfo = codeInfoList[i];
            codeInfoHTML += '<tr id="' + cmnsCdGrp + '">';
            codeInfoHTML += '   <td><input id="' + codeInfo.cdVlId + '" style="width:100%" type="checkbox"><input type="hidden" value="' + cmnsCdGrp + '"></td>';
            codeInfoHTML += '   <td class="update_column">' + codeInfo.cdVlId + '</td>';
            codeInfoHTML += '   <td class="update_column">' + codeInfo.cdVlNm + '</td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '   <td>' + codeInfo.cdSq + '</td>';
            if (codeInfo.useF === 'Y') {
                codeInfoHTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
            } else {
                codeInfoHTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
            }
            codeInfoHTML += '   <td>' + codeInfo.rgstDt + '</td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '</tr>';
        }
        $('#codeListTable').html(codeInfoHTML);
    });
}

var saveGroupCode = function (groupCodeList) {
    $.ajax({
        method: 'POST',
        url: '/registGroupCodeInfo',
        data: JSON.stringify(groupCodeList),
        contentType: "application/json; charset=UTF-8",
        dataType: 'json',
        success: function () {
            getGroupCodeInfoList();
        },
        error: function (response) {
            let message = response.responseJSON.message;
            alert(message);
        }
    });
}

var deleteGroupCode = function (groupCodeList) {
    $.ajax({
        method: 'PATCH',
        url: '/deleteGroupCodeInfo',
        data: JSON.stringify(groupCodeList),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function () {
            getGroupCodeInfoList();
        },
        error: function (response) {

        }
    });
}

var saveCode = function (codeList) {
    let cmnsCdGrp = codeList[0].cmnsCdGrp;
    $.ajax({
        method: 'POST',
        url: '/registCodeInfo',
        data: JSON.stringify(codeList),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function () {
            getGroupCodeInfo(cmnsCdGrp);
        },
        error: function (response) {
            let message = response.responseJSON.message;
            alert(message);
        }
    });
}

var deleteCode = function (request) {
    let cmnsCdGrp = request.cmnsCdGrp;
    $.ajax({
        method: 'PATCH',
        url: '/deleteCodeInfo',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function () {
            getGroupCodeInfo(cmnsCdGrp);
        },
        error: function (response) {
            console.log(response);
        }
    });
}
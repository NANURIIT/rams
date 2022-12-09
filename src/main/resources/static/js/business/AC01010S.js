$(function () {
    let cmnsCdGrp = ''
    getCommonCodeInfo();
    getGroupCodeInfoList(cmnsCdGrp);

    $(document).on('click', '#commonCodeSearch', function () {
        cmnsCdGrp = $('#commonCodeInfo option:selected').val()
        getGroupCodeInfoList(cmnsCdGrp);
    });

    $(document).on('click', '.groupCodeDetail', function (e) {
        e.preventDefault();
        getGroupCodeInfo($(this).attr('id'));
    });

    $(document).on('dblclick', 'td', function () {
        tdInputHTML = '<input style="width: 100%;" type="text" value="' + $(this).text() + '">'
        $(this).html(tdInputHTML);
    });
});

var getCommonCodeInfo = function () {
    $.ajax({
        url: '/commonCodeInfo',
        method: 'GET',
        dataType: 'json'
    }).done(function (commonCodeInfo) {
        let commonCodeOption = '<option value="">전체</option>';
        for (idx in commonCodeInfo) {
            commonCodeOption += '<option value="' + commonCodeInfo[idx].cmnsCdGrp + '">' + commonCodeInfo[idx].cmnsCdGrp + '(' + commonCodeInfo[idx].cmnsCdGrpExpl + ')</option>';
        }
        $('#commonCodeInfo').append(commonCodeOption);
    });
}

var getGroupCodeInfoList = function (cmnsCdGrp) {
    $.ajax({
        url: '/groupCodeInfoList?cmnsCdGrp=' + cmnsCdGrp,
        method: 'GET',
        dataType: 'json'
    }).done(function (groupCodeInfoList) {
        let groupCodeInfoHTML = '';
        for (idx in groupCodeInfoList) {
            let groupCodeInfo = groupCodeInfoList[idx];
            groupCodeInfoHTML += '<tr>';
            groupCodeInfoHTML += '  <td><input style="width:100%" type="checkbox"></td>';
            groupCodeInfoHTML += '  <td>' + groupCodeInfo.cmnsCdGrp + '</td>';
            groupCodeInfoHTML += '  <td>' + groupCodeInfo.cmnsCdNm + '</td>';
            groupCodeInfoHTML += '  <td></td>';
            groupCodeInfoHTML += '  <td>' + groupCodeInfo.cdLngth + '</td>';
            groupCodeInfoHTML += '  <td><button class="groupCodeDetail" id="' + groupCodeInfo.cmnsCdGrp + '">↓상세</button></td>';
            groupCodeInfoHTML += '  <td>' + groupCodeInfo.cmnsCdGrpExpl + '</td>';
            if (groupCodeInfo.useF === 'Y') {
                groupCodeInfoHTML += '  <td><input style="width:100%" type="checkbox" checked></td>';
            } else {
                groupCodeInfoHTML += '  <td><input style="width:100%" type="checkbox"></td>';
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
        for (idx in codeInfoList) {
            let codeInfo = codeInfoList[idx];
            codeInfoHTML += '<tr>';
            codeInfoHTML += '   <td><input style="width:100%" type="checkbox"></td>';
            codeInfoHTML += '   <td>' + codeInfo.cdVlId + '</td>';
            codeInfoHTML += '   <td>' + codeInfo.cdVlNm + '</td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '   <td>' + codeInfo.cdSq + '</td>';
            if (codeInfo.useF === 'Y') {
                codeInfoHTML += '   <td><input style="width:100%" type="checkbox" checked></td>';
            } else {
                codeInfoHTML += '   <td><input style="width:100%" type="checkbox"></td>';
            }
            codeInfoHTML += '   <td>' + codeInfo.rgstDt + '</td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '   <td></td>';
            codeInfoHTML += '<tr>';
        }

        $('#codeListTable').html(codeInfoHTML);
    });
}
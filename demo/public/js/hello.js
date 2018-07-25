let apis;
let settings;
let apiNo = 0;
let paramNo = 0;
let apiAndParam = {};

$(function () {
    get_setting_name_list();
});

$('body').on('change', '.select-setting', function () {
    var s = document.getElementById("InputSettings").value;
    var setting_name = s.length >= 1 ? s : "";
    get_setting(setting_name);
});

$('body').on('click', '.addApiButton', function () {
    addApi2View()
});

$('body').on('click', '.go', function () {
    for (let i = 0; i < apiAndParam.length; i++) {
        if (apiAndParam[i]===undefined)continue;
        var setting = document.getElementById("InputSettings").value;
        var serverName = $('.row'+i).find('.serverName').val();
        var signUser = $('.row'+i).find('.signUser').val();
        var apiName = $('.row'+i).find('.select-api').val();
        var cnt = $('.row'+i).find('.cnt').val();
        var len_ = Object.keys(apis).length;
        var apiKey = "";
        for (var j = 0; j < len_; j++) {
            if (Object.values(apis)[j]['name'] === apiName){
                apiKey = Object.keys(apis)[j];
                break
            }
        }
        var params = '{';
        for (let j = 0; j < apiAndParam[i].length; j++) {
            var paramN = apiAndParam[i][j];
            var key = $('.select-param'+paramN).val();
            var value = $('.param-value'+paramN).val();
            params = params + '"' + key + '": "' + value + '",';
        }
        params = params.substr(0, params.length - 1);
        params = params + '}';
        // console.log('setting:', setting, 'serverName:', serverName, 'signUser:', signUser, 'apiKey:', apiKey, 'cnt:', cnt)
        if (setting === "" || serverName === "" || signUser === "" || apiKey === "" || cnt === ""){
            alert("请将表单填写完整，并删除无效参数");
            return
        }
        get_test_result(setting, serverName, signUser, apiKey, cnt, params, i)
    }

});

function removeApi(no) {
    $('.addApiView').find('.row' + no).length === 0 ? '' : $('.row' + no).remove();
    delete apiAndParam[no];
}

function removeParam(api, no) {
    if (no === undefined) {
        $('.param'+api).find('.paramRow').length === 0 ? '' : $('.paramRow').remove();
        apiAndParam[api].splice(0, apiAndParam[api].length)
    }else {
        $('.param' + api).find('.paramO' + no).length === 0 ? '' : $('.paramO' + no).remove();
        for (let i = 0; i < apiAndParam[api].length; i++) {
            if (apiAndParam[api][i] === no) {
                apiAndParam[api].splice(i, 1)
                break
            }
        }
    }
}

function addParam2View(no) {
    var apiName = document.getElementById("InputApis"+no).value;
    var len_ = Object.keys(apis).length;
    var apiKey;
    for (var i = 0; i < len_; i++) {
        if (Object.values(apis)[i]['name'] === apiName){
            apiKey = Object.keys(apis)[i];
            break
        }
    }
    var paramSelect = '';
    var params = Object.values(apis)[i]['body'];
    for (let i = 0; i < Object.keys(params).length; i++) {
        paramSelect = paramSelect + '<option>' + Object.keys(params)[i] + '</option>\n';
    }
    var t = $(
        '                        <div class="row paramRow paramO'+paramNo+'">\n' +
        '                            <div class="col-md-auto">\n' +
        '                                <div class="row">\n' +
        '                                    <div class="col-md-auto d-flex">\n' +
        '                                        <b class="d-flex align-items-center">key:</b>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-auto">\n' +
        '                                        <select class="custom-select d-block w-100 select-param'+paramNo+'" required="" title="参数">\n' +
        '                                            <option value="">选择...</option>\n' +
        paramSelect+
        '                                        </select>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="col-md-auto">\n' +
        '                                <div class="row">\n' +
        '                                    <div class="col-md-auto d-flex">\n' +
        '                                        <b class="d-flex align-items-center">value:</b>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-auto">\n' +
        '                                        <input class="form-control param-value'+paramNo+'" size="8" type="text"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="col-md-auto d-flex">\n' +
        '                                <br>\n' +
        '                                <a class="d-flex align-items-center" href="javascript:void(0);" onclick="removeParam('+no+','+paramNo+')">\n' +
        '                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
        '                                </a>\n' +
        '                            </div>\n' +
        '                        </div>\n'+
        '                        <br class="paramRow paramO'+paramNo+'">'
    );
    apiAndParam[no].push(paramNo);
    paramNo = paramNo+1;
    $('.param'+ no).append(t)
}

function addApi2View() {
    try {
        var len_api = Object.keys(apis).length;
        var len_setting = Object.keys(settings).length;
    } catch (e) {
        if ($('.error-info').length === 0) {
            var t = $('<p class="error-info" style="color: red"> 请选择正确的配置文件</p>');
            $('.SettingLabel').append(t)
        }
        return
    }

    var apiSelect = '';
    var serverSelect = '';
    var signSelect = '';
    for (let i = 0; i < len_api; i++) {
        apiSelect = apiSelect + '<option>' + Object.values(apis)[i]['name'] + '</option>\n';
    }
    for (let i = 0; i < len_setting; i++) {
        if (Object.keys(settings)[i] === 'sysSetting'){
            var sys = Object.values(settings)[i];
            for (let j = 0; j < Object.keys(sys).length; j++) {
                signSelect = signSelect + '<option>' + Object.keys(sys)[j] + '</option>\n';
            }
        }else if (Object.keys(Object.values(settings)[i])[0] === 'ip' && Object.keys(Object.values(settings)[i])[1] === 'port'){
            serverSelect = serverSelect + '<option>' + Object.keys(settings)[i] + '</option>\n';
        }
    }
    var tmp = $(
        '<div class="row apiRow row' + apiNo + '">\n' +
        '                    <!--服务器配置名-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            服务器名\n' +
        '                        </label>\n' +
        '                        <select class="custom-select d-block w-100 serverName" required="">\n' +
        '                            <option value="">选择...</option>\n' +
        serverSelect +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <!--Sign用户名-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            Sign用户\n' +
        '                        </label>\n' +
        '                        <select class="custom-select d-block w-100 signUser" required="">\n' +
        '                            <option value="">选择...</option>\n' +
        signSelect +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <!--选择api-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label for="InputApis">\n' +
        '                            测试api\n' +
        '                        </label>\n' +
        '                        <select class="custom-select d-block w-100 select-api" id="InputApis'+apiNo+'" required="" onchange="removeParam('+apiNo+')">\n' +
        '                            <option value="">选择...</option>\n' +
        apiSelect +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <!--自定义参数-->\n' +
        '                    <div class="col-md-auto paramView param' + apiNo + '">\n' +
        '                        <label for="InputApis">' +
        '                            参数(默认采用配置中值)' +
        '                            <a href="javascript:void(0);" onclick="addParam2View(' + apiNo + ')">' +
        '                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>' +
        '                            </a>' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                    <!--测试次数-->\n' +
        '                    <div class="col-md-3">\n' +
        '                        <label>\n' +
        '                            测试次数(0~9999)\n' +
        '                        </label>\n' +
        '                        <div class="row">\n' +
        '                           <div class="col-md-5">\n' +
        '                               <input class="form-control cnt" value="1" type="text" size="4" maxlength="4" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>\n' +
        '                           </div>\n' +
        '                           <!--删除api-->\n' +
        '                           <div class="col-md-auto d-flex">\n' +
        '                               <button class="btn btn-danger pull-right delApiButton" onclick="removeApi(' + apiNo + ')">\n' +
        '                               移除</button>\n' +
        '                           </div>' +
        '                           <div class="col-md-3 result'+apiNo+'">' +
        '                           </div>'+
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n'+
        '                <br class="apiRow row' + apiNo + '">');
    $('.addApiView').append(tmp);
    apiAndParam[apiNo] = [];
    apiNo = apiNo + 1;
}

function showAddApiButton() {
    if (apis !== undefined) {
        var s = $('<button class="btn btn-success pull-right addApiButton">\n' +
            '添加Api</button>\n');
        $('.addApiButtonView').append(s)
    }
}

function get_test_result(setting, serverName, signUser, apiKey, cnt, params, apiN) {
    if ($('.result'+apiN).find('.resultA'+apiN).length !== 0) {
        $('.resultA' + apiN).remove();
        $('#modalLong' + apiN).remove();
    }
    $.ajax({
        type: 'get',
        url: '/get_test_result',
        data: {'setting': setting,'serverName': serverName, 'signUser': signUser, 'apiKey': apiKey, 'cnt': cnt, 'params': params},
        timeout: 120000 * cnt,
        success: function (data) {
            console.log(data);
            data.replace('\r', '</div><div>');
            var t = $('<a data-toggle="modal" data-target="#modalLong'+apiN+'" class="resultA'+apiN+'" style="position: absolute; bottom: 0;" href="javascript:void(0);">详细</a>'+
                '<!-- Modal -->\n' +
                '<div class="modal fade" id="modalLong'+apiN+'" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">\n' +
                '  <div class="modal-dialog modal-lg" role="document">\n' +
                '    <div class="modal-content">\n' +
                '      <div class="modal-header">\n' +
                '        <h5 class="modal-title" id="exampleModalLongTitle">详细信息</h5>\n' +
                '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '          <span aria-hidden="true">&times;</span>\n' +
                '        </button>\n' +
                '      </div>\n' +
                '      <div class="modal-body">\n' +
                 data+
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>');
            $('.result'+apiN).append(t);
        },
        error: function () {

        },
        complete: function () {

        }
    });
}

function get_setting(setting_name) {
    $('body').find('.error-info').length === 0 ? '' : $('.error-info').remove();
    $('.addApiView').find('.apiRow').length === 0 ? '' : $('.apiRow').remove();
    $('.addApiButtonView').find('.addApiButton').length === 0 ? '' : $('.addApiButton').remove();
    $.ajax({
        type: 'get',
        url: '/get_settings',
        data: {'setting_name': setting_name},
        timeout: 20000,
        success: function (data) {
            apis = data['apis'];
            settings = data['settings'];
            apiAndParam = [];
            apiNo = 0;
            showAddApiButton();
        },
        error: function () {
            apiAndParam = [];
            apiNo = 0
        },
        complete: function () {

        }
    });
}

function get_setting_name_list() {
    $('.select-setting').find('.setting-option').length === 0 ? '' : $('.error-info').remove();
    $.ajax({
        type: 'get',
        url: '/get_setting_name_list',
        data: {},
        timeout: 20000,
        success: function (data) {
            var t = '';
            for (let i = 0; i < data.length; i++) {
                t = t + '<option class="setting-option">'+data[i]+'</option>'
            }
            $('.select-setting').append($(t))
        },
        error: function () {

        },
        complete: function () {

        }
    });
}
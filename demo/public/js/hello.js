let apis;
let settings;
let api;
let setting;
let apiNo = 0;
let paramNo = 0;
let apiAndParam = {};

$(function () {
    get_setting_name_list();
});

$('body').on('change', '.select-setting', function () {
    const s = document.getElementById("InputSettings").value;
    const setting_name = s.length >= 1 ? s : "";
    get_setting(setting_name);
});

$('body').on('click', '.addApiButton', function () {
    addApi2View()
});

$('body').on('click', '.importApiButton', function () {
    import_setting()
});

$('body').on('click', '.go', function () {
    const setting = document.getElementById("InputSettings").value;
    for (let i = 0; i < apiAndParam.length; i++) {
        if (apiAndParam[i] === undefined) continue;
        const serverName = $('.row' + i).find('.serverName').val();
        const apiName = $('.row' + i).find('.select-api').val();
        const cnt = $('.row' + i).find('.cnt').val();
        const len_ = Object.keys(apis).length;
        let apiKey = "";
        for (let j = 0; j < len_; j++) {
            if (Object.values(apis)[j]['name'] === apiName) {
                apiKey = Object.keys(apis)[j];
                break
            }
        }
        let params = '{';
        for (let j = 0; j < apiAndParam[i].length; j++) {
            const paramN = apiAndParam[i][j];
            const key = $('.select-param' + paramN).val();
            const value = $('.param-value' + paramN).val();
            params = params + '\"' + key + '\":\"' + value + '\",';
            if (j === apiAndParam[i].length - 1) {
                params = params.substring(0, params.lastIndexOf(','));
            }
        }
        params = params + '}';

        // console.log('setting:', setting, 'serverName:', serverName, 'signUser:', signUser, 'apiKey:', apiKey, 'cnt:', cnt)
        if (setting === "" || serverName === "" || apiKey === "" || cnt === "") {
            alert("请将表单填写完整，并删除无效参数");
            return
        }
        get_test_result(setting, serverName, apiKey, cnt, params, i)
    }
});

$('body').on('click', '.save-settings', function () {
    let setting = '{';
    setting = setting + '\"setting\":\"' + document.getElementById("InputSettings").value + '\",';
    setting = setting + '\"api\":{';
    let k = 0;
    for (let i = 0; i < apiAndParam.length; i++) {
        if (apiAndParam[i] === undefined) continue;
        setting = setting + '\"'+i+'\":{';
        const apiName = $('.row' + i).find('.select-api').val();
        const len_ = Object.keys(apis).length;
        let apiKey = "";
        for (let j = 0; j < len_; j++) {
            if (Object.values(apis)[j]['name'] === apiName) {
                apiKey = Object.keys(apis)[j];
                break
            }
        }
        setting = setting + '\"serverName\":"' + $('.row' + i).find('.serverName').val() + '",';
        setting = setting + '\"cnt\":"' + $('.row' + i).find('.cnt').val() + '",';
        setting = setting + '\"apiKey\":"' + apiKey + '",';
        setting = setting + '\"params\":';
        let params = '{';
        for (let j = 0; j < apiAndParam[i].length; j++) {
            const paramN = apiAndParam[i][j];
            const key = $('.select-param' + paramN).val();
            const value = $('.param-value' + paramN).val();
            params = params + '\"' + key + '\":\"' + value + '\",';
            if (j === apiAndParam[i].length - 1) {
                params = params.substring(0, params.lastIndexOf(','));
            }
        }
        params = params + '}';
        setting = setting + params;
        setting = setting + '},';
        k = k + 1;
    }
    if (k > 0) {
        setting = setting.substring(0, setting.lastIndexOf(','));
    }
    setting = setting + '}';
    setting = setting + '}';
    try {
        JSON.parse(setting);
    }catch (e) {
        alert("参数错误")
    }
    save_setting(setting)
});

function removeApi(apiN) {
    $('.addApiView').find('.row' + apiN).length === 0 ? '' : $('.row' + apiN).remove();
    delete apiAndParam[apiN];
}

function removeParam(apiN, paramN) {
    if (paramN === undefined) {
        if ($('.result' + apiN).find('.resultA' + apiN).length !== 0) {
            $('.resultA' + apiN).remove();
            $('#modalLong' + apiN).remove();
        }
        $('.param' + apiN).find('.paramRow').length === 0 ? '' : $('.param' + apiN).find('.paramRow').remove();
        apiAndParam[apiN].splice(0, apiAndParam[apiN].length)
    } else {
        $('.param' + apiN).find('.paramO' + paramN).length === 0 ? '' : $('.paramO' + paramN).remove();
        for (let i = 0; i < apiAndParam[apiN].length; i++) {
            if (apiAndParam[apiN][i] === paramN) {
                apiAndParam[apiN].splice(i, 1);
                break
            }
        }
    }
}

function addParam2View(apiN) {
    let i;
    const apiName = document.getElementById("InputApis" + apiN).value;
    const len_ = Object.keys(apis).length;
    let apiKey;
    for (i = 0; i < len_; i++) {
        if (Object.values(apis)[i]['name'] === apiName) {
            apiKey = Object.keys(apis)[i];
            break
        }
    }
    let paramSelect = '';
    const params = Object.values(apis)[i]['body'];
    for (let i = 0; i < Object.keys(params).length; i++) {
        paramSelect = paramSelect + '<option>' + Object.keys(params)[i] + '</option>\n';
    }
    const t = $(
        '                        <div class="row paramRow paramO' + paramNo + '">\n' +
        '                            <div class="col-md-auto">\n' +
        '                                <div class="row">\n' +
        '                                    <div class="col-md-auto d-flex">\n' +
        '                                        <b class="d-flex align-items-center">key:</b>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-auto">\n' +
        '                                        <select class="custom-select d-block w-100 select-param' + paramNo + '" required="" title="参数">\n' +
        '                                            <option value="">选择...</option>\n' +
        paramSelect +
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
        '                                        <input class="form-control param-value' + paramNo + '" size="8" type="text"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="col-md-auto d-flex">\n' +
        '                                <br>\n' +
        '                                <a class="d-flex align-items-center" href="javascript:void(0);" onclick="removeParam(' + apiN + ',' + paramNo + ')">\n' +
        '                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
        '                                </a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <br class="paramRow paramO' + paramNo + '">'
    );
    apiAndParam[apiN].push(paramNo);
    paramNo = paramNo + 1;
    $('.param' + apiN).append(t)
}

function addApi2View() {
    let len_api;
    let len_setting;
    try {
        len_api = Object.keys(apis).length;
        len_setting = Object.keys(settings).length;
    } catch (e) {
        if ($('.error-info').length === 0) {
            const t = $('<p class="error-info" style="color: red"> 请选择正确的配置文件</p>');
            $('.SettingLabel').append(t)
        }
        return
    }

    let apiSelect = '';
    let serverSelect = '';
    for (let i = 0; i < len_api; i++) {
        apiSelect = apiSelect + '<option>' + Object.values(apis)[i]['name'] + '</option>\n';
    }
    for (let i = 0; i < len_setting; i++) {
        if (Object.keys(Object.values(settings)[i])[0] === 'ip' && Object.keys(Object.values(settings)[i])[1] === 'port') {
            serverSelect = serverSelect + '<option>' + Object.keys(settings)[i] + '</option>\n';
        }
    }
    const tmp = $(
        '<div class="row apiRow row' + apiNo + '">\n' +
        '                    <!--服务器配置名-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            服务器地址\n' +
        '                        </label>\n' +
        '                        <select class="custom-select d-block w-100 serverName" required="">\n' +
        '                            <option value="">选择...</option>\n' +
        serverSelect +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <!--选择api-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label for="InputApis">\n' +
        '                            测试api\n' +
        '                        </label>\n' +
        '                        <select class="custom-select d-block w-100 select-api" id="InputApis' + apiNo + '" required="" onchange="removeParam(' + apiNo + ')">\n' +
        '                            <option value="">选择...</option>\n' +
        apiSelect +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <!--自定义参数-->\n' +
        '                    <div class="col-md-auto paramView param' + apiNo + '">\n' +
        '                        <label for="InputApis">' +
        '                            参数(默认采用配置值)' +
        '                            <a href="javascript:void(0);" onclick="addParam2View(' + apiNo + ')">' +
        '                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>' +
        '                            </a>' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                    <!--测试次数-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            测试量<9999\n' +
        '                        </label>\n' +
        '                        <div>\n' +
        '                            <input class="form-control cnt" value="1" type="text" size="4" maxlength="4" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <!--删除api-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-md-auto">' +
        '                                <label style="visibility: hidden">\'</label>' +
        '                                <button class="btn btn-danger w-100 delApiButton" onclick="removeApi(' + apiNo + ')">移除</button>\n' +
        '                            </div>' +
        '                            <div class="col-md-auto">' +
        '                                <label style="visibility: hidden">\'</label>' +
        '                                <div class="result' + apiNo + '" align="center"></div>' +
        '                            </div>' +
        '                        </div>\n' +
        '                    </div>' +
        '                </div>\n' +
        '                <br class="apiRow row' + apiNo + '">');
    $('.addApiView').append(tmp);
    apiAndParam[apiNo] = [];
    apiNo = apiNo + 1;
}

function showAddApiButton() {
    if (apis !== undefined && settings !== undefined) {
        const s = $('<button class="btn btn-success d-block w-100 addApiButton">\n' +
            '添加Api</button>\n');
        $('.addApiButtonView').append(s)
    }else if (api !== undefined && setting !== undefined) {
        const s = $('<button class="btn btn-success d-block w-100 importApiButton">\n' +
            '导入配置</button>\n');
        $('.addApiButtonView').append(s)
    }
}

function get_test_result(setting, serverName, apiKey, cnt, params, apiN) {
    if ($('.result' + apiN).find('.resultA' + apiN).length !== 0) {
        $('.resultA' + apiN).remove();
        $('#modalLong' + apiN).remove();
    }
    const loading = $(
        '<div class="loader-inner loading' + apiN + '">\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '</div>'
    );
    $('.result' + apiN).append(loading);
    $.ajax({
        type: 'get',
        url: '/get_test_result',
        data: {
            'setting': setting,
            'serverName': serverName,
            'apiKey': apiKey,
            'cnt': cnt,
            'params': params
        },
        timeout: 120000 * cnt,
        success: function (data) {
            $('.result' + apiN).find('.loading' + apiN).length === 0 ? '' : $('.loading' + apiN).remove();
            const t = $('<button data-toggle="modal" data-target="#modalLong' + apiN + '" class="btn btn-dark w-100 resultA' + apiN + '">Info</button>' +
                '<!-- Modal -->\n' +
                '<div align="left" class="modal fade" id="modalLong' + apiN + '" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">\n' +
                '  <div class="modal-dialog modal-lg" role="document">\n' +
                '    <div class="modal-content">\n' +
                '      <div class="modal-header">\n' +
                '        <h5 class="modal-title" id="exampleModalLongTitle">详细信息</h5>\n' +
                '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '          <span aria-hidden="true">&times;</span>\n' +
                '        </button>\n' +
                '      </div>\n' +
                '      <div class="modal-body">' +
                // '<textarea class="w-100" wrap="hard">' +
                // formatJson(data) +
                // '</textarea>' +
                data +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>');
            $('.result' + apiN).append(t);
        },
        error: function () {
            $('.result' + apiN).find('.loading' + apiN).length === 0 ? '' : $('.loading' + apiN).remove();
        },
        complete: function () {

        }
    });
}

function get_setting(setting_name) {
    $('.saveResult').remove();
    $('body').find('.error-info').length === 0 ? '' : $('.error-info').remove();
    $('.addApiView').find('.apiRow').length === 0 ? '' : $('.apiRow').remove();
    $('.addApiButtonView').find('.addApiButton').length === 0 ? '' : $('.addApiButton').remove();
    $('.addApiButtonView').find('.importApiButton').length === 0 ? '' : $('.importApiButton').remove();
    $.ajax({
        type: 'get',
        url: '/get_settings',
        data: {'setting_name': setting_name},
        timeout: 20000,
        success: function (data) {
            apis = data['apis'];
            settings = data['settings'];
            api = data['api'];
            setting = data['setting']
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

function get_setting_name_list(select) {
    if ($('.select-setting').find('.setting-option').length !== 0) {
        $('.error-info').remove();
        $('.setting-option').remove();
    }
    $.ajax({
        type: 'get',
        url: '/get_setting_name_list',
        data: {},
        timeout: 20000,
        success: function (data) {
            let t = '';
            for (let i = 0; i < data.length; i++) {
                if (data[i] === select){
                    t = t + '<option class="setting-option" selected = "selected">' + data[i] + '</option>'
                } else {
                    t = t + '<option class="setting-option">' + data[i] + '</option>'
                }
            }
            $('.select-setting').append($(t))
        },
        error: function () {

        },
        complete: function () {

        }
    });
}

function import_setting() {
    var len_setting = $('.setting-option').length;
    for (let i = 0; i <= len_setting; i++) {
        if (document.getElementById("InputSettings")[i].value === setting)
            document.getElementById("InputSettings")[i].selected=true;
    }
    console.log(setting);
    console.log(api);
}

function save_setting(setting) {
    $('.saveResult').remove();
    const settingName = document.getElementById("InputSettings").value + "-1";
    const loading = $(
        '<div class="col-md-auto loading">' +
        '<div class="loader-inner">\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '<div class="loader-line-wrap">\n' +
        '<div class="loader-line"></div>\n' +
        '</div>\n' +
        '</div>' +
        '</div>'
    );
    $('.button-view').append(loading);
    $.ajax({
        type: 'post',
        url: '/settings/save',
        data: {'settingName': settingName, 'settings': setting},
        timeout: 20000,
        success: function (data) {
            $('.loading').remove();
            $('#textarea').remove();
            $('.button-view').append($('<p class="saveResult">保存成功</p>'));
            var tmp = document.getElementById("InputSettings").value;
            get_setting_name_list(tmp);
        },
        error: function () {
            $('.loading').remove();
            $('.button-view').append($('<p class="saveResult">保存成功</p>'))
        },
        complete: function () {

        }
    });
}
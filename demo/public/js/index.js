let apis = [];
let settings = [];
let api = [];
let setting = [];
let apiNo = 0;
let paramNo = 0;
let apiAndParam = {};
let main;

function changeSelectSetting(callback) {
    const s = document.getElementById("InputSettings").value;
    let setting_name = s.length >= 1 ? s : "";
    get_settings(setting_name, callback);
}

// 添加API点击
$('body').on('click', '.addApiButton', function () {
    addApi2View()
});

// 导入API点击
$('body').on('click', '.importApiButton', function () {
    import_setting()
});

// 测试按钮点击
$('body').on('click', '.go', function () {
    $('.go').attr('disabled',"true");
    const s = document.getElementById("InputSettings").value;
    let setting = s.length >= 1 ? s : "";
    for (let i = 0; i < apiAndParam.length; i++) {
        if (apiAndParam[i] === undefined) continue;
        if (!document.getElementById("checkbox"+i).checked) continue;
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
            if (j === apiAndParam[i].length - 1)
                params = params.substring(0, params.lastIndexOf(','));
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

// 保存设置点击
$('body').on('click', '.save-settings', function () {
    $('#saveModal').modal('hide');
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

// 模态显示前加载
// $('#saveModal').on('show.bs.modal', function () {
//     const s = document.getElementById("InputSettings").value;
//     let setting_id;
//     for (let i = 0; i < setting_list.length; i++) {
//         if (setting_list[i]['group_name'] + '/' + setting_list[i]['setting_file'] === s)
//             setting_id = setting_list[i]['setting_id']
//     }
//     get_setting_group(setting_id)
// });

//根据API_ID移除API
function removeApi(apiN) {
    $('.addApiView').find('.row' + apiN).length === 0 ? '' : $('.row' + apiN).remove();
    delete apiAndParam[apiN];
    syncCheckBox();
}

// 根据API_ID移除所有参数
// 根据param_ID 移除对应参数
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

// 添加参数到对应API_ID下
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
        paramSelect = paramSelect + '<option class="param-option">' + Object.keys(params)[i] + '</option>\n';
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
        '                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="9" cy="9" r="8"></circle><line x1="6" y1="9" x2="12" y2="9"></line></svg>\n' +
        '                                </a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <br class="paramRow paramO' + paramNo + '">'
    );
    apiAndParam[apiN].push(paramNo);
    paramNo = paramNo + 1;
    $('.param' + apiN).append(t);
    return paramNo-1;
}

// 添加API到界面
function addApi2View() {
    let len_api;
    let len_setting;
    try {
        len_api = Object.keys(apis).length;
        len_setting = Object.keys(settings).length;
    } catch (e) {
        showMessage($('.SettingLabel'),'danger','请选择正确的配置文件')
        return
    }

    let apiSelect = '';
    let serverSelect = '';
    for (let i = 0; i < len_api; i++) {
        apiSelect = apiSelect + '<option class="api-option">' + Object.values(apis)[i]['name'] + '</option>\n';
    }
    for (let i = 0; i < len_setting; i++) {
        if (Object.keys(Object.values(settings)[i])[0] === 'ip' && Object.keys(Object.values(settings)[i])[1] === 'port') {
            serverSelect = serverSelect + '<option class="server-option">' + Object.keys(settings)[i] + '</option>\n';
        }
    }
    const tmp = $(
        '<div class="row apiRow row' + apiNo + '">\n' +
        '                    <!--选择api-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <input type="checkbox" class="checkbox-inline" id="checkbox'+apiNo+'" checked="checked" onchange="syncCheckBox()">\n' +
        '                    </div>' +
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
        '                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="9" cy="9" r="8"></circle><line x1="9" y1="6" x2="9" y2="12"></line><line x1="6" y1="9" x2="12" y2="9"></line></svg>' +
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
    syncCheckBox();
    apiNo = apiNo + 1;
    return apiNo-1;
}

/**checkAll----------------------------------------*/
// 扫描所有checkbox
function syncCheckBox() {
    let all = 0;
    let ischeck = 0;
    for (let i = 0; i < apiAndParam.length; i++) {
        if (apiAndParam[i] === undefined) continue;
        all++;
        if (document.getElementById("checkbox"+i).checked) ischeck++;
    }
    checkHidden(all !== 0);
    if (all !== 0) showCheck(all === ischeck);
}

//是否显示checkAll
function checkHidden(isShow) {
    if (isShow) document.getElementById('bottom-line').style.display='block';
    else document.getElementById('bottom-line').style.display='none'
}

// checkAll状态更改
function checkAllOnChange() {
    checkAll(document.getElementById("checkAll").checked);
}

// 更改checkAll的状态
function showCheck(isCheck) {
    document.getElementById("checkAll").checked = isCheck
}

// checkAll的操作
function checkAll(isCheck) {
    for (let i = 0; i < apiAndParam.length; i++) {
        if (apiAndParam[i] === undefined) continue;
        document.getElementById("checkbox"+i).checked = isCheck
    }
}
/**----------------------------------------*/

// 选择显示添加或导入按钮
function showAddApiButton() {
    if (main === 1) {
        const s = $('<button class="btn btn-success d-block w-100 addApiButton">\n' +
            '添加Api</button>\n');
        $('.addApiButtonView').append(s)
    }else if (main === 2){
        const s = $('<button class="btn btn-success d-block w-100 importApiButton">\n' +
            '导入配置</button>\n');
        $('.addApiButtonView').append(s)
    }
}

// 从服务器获取测试结果
function get_test_result(setting, serverName, apiKey, cnt, params, apiN) {
    if ($('.result' + apiN).find('.resultA' + apiN).length !== 0) {
        $('.resultA' + apiN).remove();
        $('#modalLong' + apiN).remove();
    }
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
            $('.go').removeAttr("disabled");
            $('.result' + apiN).find('.loading').remove();
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
                '<textarea id="textarea' + apiN + '" class="w-100" wrap="off">' +
                        _tmp(data) +
                '</textarea>' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>');
            $('.result' + apiN).append(t);
            $('#modalLong'+apiN).on('shown.bs.modal', function () {
                const text = document.getElementById("textarea" + apiN);
                autoTextarea(text);// 调用
            });
        },
        error: function () {
            $('.go').removeAttr("disabled");
            $('.result' + apiN).find('.loading').remove();
        },
        complete: function () {

        }
    });
}

// 对数据的转制
function _tmp(data) {
    try {
        return formatJson(JSON.parse(data))
    }catch (e) {
        return data
    }
}

// 根据配置名获取配置内所有信息
function get_settings(setting_name, callback) {
    ajax_get_settings(setting_name,()=>{
        $('.addApiButton').remove();
        $('.importApiButton').remove();
        for (let i = 0; i < apiAndParam.length; i++) {
            if (apiAndParam[i] === undefined) continue;
            removeApi(i)
        }
    },(status, data)=>{
        if (status === 'success') {
            if (data['apis'] !== undefined) main = 1;
            else if (data['api'] !== undefined) main = 2;
            else main = 3;
            apis = data['apis'] === undefined ? apis : data['apis'];
            settings = data['settings'] === undefined ? settings : data['settings'];
            api = data['api'] === undefined ? api : data['api'];
            setting = data['setting'] === undefined ? setting : data['setting'];
            apiAndParam = [];
            apiNo = 0;
            showAddApiButton();
            if (callback) callback();
        }else if (status === 'error') {
            apiAndParam = [];
            apiNo = 0
        }
    });
}

// 导入配置文件
function import_setting() {
    const len_setting = $('.setting-option').length;
    let setting_select = document.getElementById("InputSettings");
    let setting_name = setting_select.value;
    let setting_f = false;
    for (let i = 0; i <= len_setting; i++) {
        if (setting_select[i].value === setting) {
            setting_select[i].selected = true;
            setting_f = true;
            break
        }
    }
    if (!setting_f){
        showMessage($('.select-view'), 'danger', '没有该配置的主配置文件')
    } else {
        changeSelectSetting(function () {
            const len_api = Object.keys(api).length;
            for (let i = 0; i < len_api; i++) {
                const a = Object.values(api)[i];
                const apiN = addApi2View();
                const serverNames = $('.row' + i).find('.serverName').find('.server-option');
                const select_apis = $('.row'+i).find('.select-api').find('.api-option');
                const cnt = $('.row'+i).find('.cnt');
                for (let j = 0; j < serverNames.length; j++) {
                    if (serverNames[j].value === a['serverName']) {
                        serverNames[j].selected = true;
                        break
                    }
                }
                for (let j = 0; j < select_apis.length; j++) {
                    if (getApiKeyByApiName(select_apis[j].value) === a['apiKey']) {
                        select_apis[j].selected = true;
                        break
                    }
                }
                for (let j = 0; j < Object.keys(a["params"]).length; j++) {
                    const paramN = addParam2View(apiN);
                    let keys = $('.select-param'+ paramN).find('.param-option');
                    let value = $('.param-value'+ paramN);
                    let param = Object.keys(a["params"])[j];
                    for (let k = 0; k < keys.length; k++) {
                        if (keys[k].value === param) {
                            keys[k].selected = true;
                            break
                        }
                    }
                    value.val(Object.values(a["params"])[j])
                }
                cnt.val(a['cnt'])
            }
        });
        document.getElementById("file-name").value = setting_name.split('/')[1];
    }
}

// 根据API名获得APIKEY
function getApiKeyByApiName(apiName) {
    const len_ = Object.keys(apis).length;
    let apiKey = "";
    for (let j = 0; j < len_; j++) {
        if (Object.values(apis)[j]['name'] === apiName) {
            apiKey = Object.keys(apis)[j];
            break
        }
    }
    return apiKey
}

// 向服务器保存配置
function save_setting(settings) {
    let settingName = document.getElementById("file-name").value;
    let groupName = document.getElementById("InputSettings").value;
    groupName = groupName.split('/')[0];
    settingName = groupName + "/" + settingName;
    for (let i = 0; i < setting_list.length; i++) {
        if (setting_list[i]['group_name']+'/'+setting_list[i]['setting_file'] === settingName) {
            let permission = setting_list[i]['permission'].split('/');
            if (permission.indexOf('w') < 0){
                showMessage($('.button-view'), 'danger', '该用户没有写入权限，请向组管理员获取权限');
                return
            }
        }
    }
    $('.button-view').append(loading);
    $.ajax({
        type: 'post',
        url: '/settings/save',
        data: {'settingName': settingName, 'settings': settings},
        timeout: 20000,
        success: function () {
            $('.loading').remove();
            showMessage($('.button-view'), 'success', '保存成功');
            let tmp = document.getElementById("InputSettings").value;
            show_setting_name_list(tmp, true);
        },
        error: function () {
            $('.loading').remove();
            showMessage($('.button-view'), 'danger', '保存失败');
        },
        complete: function () {

        }
    });
}

/**
 * 显示配置列表名
 * @param select        默认选中的配置
 * @param forceRefresh  是否强制刷新数据
 */
function show_setting_name_list(select, forceRefresh) {
    if (setting_list === [] || forceRefresh) {
        ajax_get_setting_name_list(()=>{if (setting_list !== [])setting_list = []},
            (status)=>{if (status === 'success') show_setting_name_list(select)})
    }else{
        let t = '';
        for (let i = 0; i < setting_list.length; i++) {
            let file = setting_list[i]['group_name'] + '/' + setting_list[i]['setting_file'];
            if (file === select){
                t = t + '<option class="setting-option" selected = "selected">' + file + '</option>'
            } else {
                t = t + '<option class="setting-option">' + file + '</option>'
            }
        }
        $('.select-setting').append($(t));
    }
}
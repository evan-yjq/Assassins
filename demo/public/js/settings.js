$(function () {
    get_setting_name_list();
});

$('body').on('change', '.select-setting', function (){
    $('.alert').remove();
    const s = document.getElementById("InputSettings").value;
    let setting_name = s.length >= 1 ? s : "";
    get_setting(setting_name)
});

function show_save_btn() {
    $('.button-view').find('.saveSettingsButtonView').length === 0 ? '' : $('.saveSettingsButtonView').remove();
    const save_btn = $('<div class="col-md-auto saveSettingsButtonView"><button class="btn btn-primary d-block w-100" onclick="save_setting()">保存修改</button></div>');
    $('.button-view').append(save_btn)
}

function get_setting(setting_name) {
    $('body').find('.data-view').length === 0 ? '' : $('.data-view').remove();
    $('.saveSettingsButtonView').remove();
    if (setting_name === '') return;
    $.ajax({
        type: 'get',
        url: '/get_settings',
        data: {'setting_name': setting_name},
        timeout: 20000,
        success: function (data) {
            const dv = $('<textarea id="textarea" class="data-view w-100" wrap="off">' + formatJson(data) + '</textarea>');
            $('.dataT').append(dv);
            const text = document.getElementById("textarea");
            autoTextarea(text);// 调用
            show_save_btn()
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
    $.ajax({
        type: 'get',
        url: '/get_setting_name_list',
        data: {},
        timeout: 20000,
        success: function (data) {
            let t = '';
            for (let i = 0; i < data.length; i++) {
                t = t + '<option class="setting-option">' + data[i]['group_name'] + '/' + data[i]['setting_file'] + '</option>'
            }
            $('.select-setting').append($(t));
            setting_list = data
        },
        error: function () {

        },
        complete: function () {

        }
    });
}

function save_setting() {
    const settings = document.getElementById("textarea").value;
    const settingName = document.getElementById("InputSettings").value;
    for (let i = 0; i < setting_list.length; i++) {
        if (setting_list[i]['group_name']+'/'+setting_list[i]['setting_file'] === settingName) {
            let permission = setting_list[i]['permission'].split('/');
            if (permission.indexOf('w') < 0){
                showMessage($('.button-view'), 'danger', '该用户没有写入权限，请向组管理员获取权限');
                return
            }
        }
    }
    $('.saveSettingsButtonView').remove();
    $('.button-view').append(loading);
    $.ajax({
        type: 'post',
        url: '/settings/save',
        data: {'settingName': settingName, 'settings': settings},
        timeout: 20000,
        success: function () {
            $('.loading').remove();
            show_save_btn();
            showMessage($('.button-view'), 'success', '保存成功')
        },
        error: function () {
            $('.loading').remove();
            show_save_btn();
            showMessage($('.button-view'), 'warning', '保存失败，请仔细检查JSON格式')
        },
        complete: function () {

        }
    });
}
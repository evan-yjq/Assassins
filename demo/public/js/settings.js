$(function () {
    get_setting_name_list();
});

$('body').on('change', '.select-setting', function (){
    const s = document.getElementById("InputSettings").value;
    const setting_name = s.length >= 1 ? s : "";
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
            const dv = $('<textarea id="textarea" class="data-view w-100" wrap="off">'+formatJson(data)+'</textarea>');
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
    $('.select-setting').find('.setting-option').length === 0 ? '' : $('.error-info').remove();
    $.ajax({
        type: 'get',
        url: '/get_setting_name_list',
        data: {},
        timeout: 20000,
        success: function (data) {
            let t = '';
            for (let i = 0; i < data.length; i++) {
                t = t + '<option class="setting-option">' + data[i] + '</option>'
            }
            $('.select-setting').append($(t))
        },
        error: function () {

        },
        complete: function () {

        }
    });
}

function save_setting() {
    $('.saveSettingsButtonView').remove();
    const settings = document.getElementById("textarea").value;
    const settingName = document.getElementById("InputSettings").value;
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
        data: {'settingName': settingName, 'settings': settings},
        timeout: 20000,
        success: function (data) {
            $('.loading').remove();
            $('#textarea').remove();
        },
        error: function () {
            $('.loading').remove()
        },
        complete: function () {

        }
    });
}
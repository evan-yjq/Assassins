
function changeSelectSetting_s() {
    $('.alert').remove();
    const s = document.getElementById("InputSettings").value;
    let setting_name = s.length >= 1 ? s : "";
    show_settings(setting_name)
}

function show_save_btn() {
    $('.button-view').find('.saveSettingsButtonView').length === 0 ? '' : $('.saveSettingsButtonView').remove();
    const save_btn = $('<div class="col-md-auto saveSettingsButtonView"><button class="btn btn-primary d-block w-100" onclick="save_setting_s()">保存修改</button></div>');
    $('.button-view').append(save_btn)
}

function show_settings(setting_name) {
    if (setting_name === '') return;
    ajax_get_settings(setting_name,()=>{
        $('.data-view').remove();
        $('.saveSettingsButtonView').remove();
    },(status, data)=>{
        if (status === 'success') {
            const dv = $('<textarea id="textarea" class="data-view w-100" wrap="off">' + formatJson(data) + '</textarea>');
            $('.dataT').append(dv);
            const text = document.getElementById("textarea");
            autoTextarea(text);// 调用
            show_save_btn()
        }else if (status === 'error') {
            apiAndParam = [];
        }
    });
}

function save_setting_s() {
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

/**静态数据-------------------------------------------------------*/

// 配置所属的用户所属的分组
// let setting_group;
// 用户所属的分组
// let user_group = [];
// 分组内配置
let group_setting = [];
// 分组内成员
let group_member = [];
// 用户对应的分组权限
let user_setting_permission = [];
// 用户ID
let user_id;
// 配置列表
let setting_list = [];
// 提示类型
let typeAll = {
    'success'   : {'div': 'alert-success' , 'content': '成功!'},
    'warning'   : {'div': 'alert-warning' , 'content': '警告!'},
    'info'      : {'div': 'alert-info'    , 'content': '提示!'},
    'danger'    : {'div': 'alert-danger'  , 'content': '失败!'}
};
// 加载动画
const loading = function () {
    return $(
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
};

/**页面数据加载----------------------------------------------------*/

/**
 * 最初始数据加载
 */
$(function () {
    ajax_get_user_id();
    ajax_get_setting_name_list(undefined, (status)=>{if (status === 'success') goto_label('test_setting')});
    $('#account').html(getCookie('testEx_username'));
});

/**
 * 切换到测试设置时数据加载
 */
function load_test_setting() {
    show_setting_name_list();
}

/**
 * 切换到配置信息时数据加载
 */
function load_setting_info() {
    show_setting_name_list();
}

/**
 * 切换到用户配置时数据加载
 */
function load_account_setting() {
    ajax_get_user_group(undefined, (status, data) => {if (status === 'success') show_group(data)})
}

/**
 * 切换到todo界面时数据加载
 */
function load_todo_list() {
    $.ajax({
        type: 'get',
        url: '/get_todo_list',
        data: {},
        timeout: 20000,
        success: function (data) {
            document.getElementById("preview").innerHTML = data;
        },
        error: function () {},
        complete: function () {}
    });
}

/**服务器接口整合--------------------------------------------------*/

function ajax_update_pwd(old_pwd, new_pwd, start, finish) {
    if (start) start();
    $.ajax({
        type: 'post',
        url: '/user/edit_pwd',
        data: {'pwd': old_pwd, 'newPwd': new_pwd, 'userId': user_id},
        timeout: 20000,
        success: function (data) {
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取配置数据
 * @param setting_name 配置名
 * @param start
 * @param finish
 */
function ajax_get_settings(setting_name, start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/get_settings',
        data: {'setting_name': setting_name},
        timeout: 20000,
        success: function (data) {
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取配置名列表
 * @param start
 * @param finish
 */
function ajax_get_setting_name_list(start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/get_setting_name_list',
        data: {},
        timeout: 20000,
        success: function (data) {
            setting_list = data;
            if (finish) finish('success', data)
        },
        error: function () {
            setting_list = [];
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取用户所属分组
 * @param start
 * @param finish
 */
function ajax_get_user_group(start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/user/get_group',
        data: {},
        timeout: 20000,
        success: function (data) {
            // user_group = data;
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取分组内该用户可见的所有配置-
 * @param group_name
 * @param start
 * @param finish
 */
function ajax_get_group_setting(group_name, start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/user/get_group_setting',
        data: {'groupName':group_name},
        timeout: 20000,
        success: function (data) {
            group_setting = data;
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取用户对配置文件的权限
 * @param user_account
 * @param setting_file
 * @param group_name
 * @param start
 * @param finish
 */
function ajax_get_user_setting(user_account, setting_file, group_name, start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/user/get_user_setting',
        data: {'userAccount':user_account,'settingFile':setting_file,'groupName':group_name},
        timeout: 20000,
        success: function (data) {
            user_setting_permission = data;
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取分组内所有成员
 * @param group_name
 * @param start
 * @param finish
 */
function ajax_get_group_member(group_name, start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/user/get_group_member',
        data: {'groupName':group_name},
        timeout: 20000,
        success: function (data) {
            group_member = data;
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 获取用户ID
 * @param start
 * @param finish
 */
function ajax_get_user_id(start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/user/get_user_id_by_account',
        data: {},
        timeout: 20000,
        success: function (data) {
            user_id = data;
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

/**
 * 修改权限
 * @param permission
 * @param user_account
 * @param setting_id
 * @param start
 * @param finish
 */
function ajax_change_permission(permission, user_account, setting_id, start, finish) {
    if (start) start;
    console.log(permission+'/'+user_account+'/'+setting_id);
    $.ajax({
        type: 'get',
        url: '/user/change_permission',
        data: {'permission': permission, 'account': user_account, 'settingId': setting_id},
        timeout: 20000,
        success: function (data) {
            if (finish) finish('success', data)
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}
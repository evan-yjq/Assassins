function get_user_group(start, finish) {
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

function get_group_setting(group_name, start, finish) {
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

function get_user_setting(user_account, setting_file, group_name, start, finish) {
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

function get_group_member(group_name, start, finish) {
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

function get_user_id(start, finish) {
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

function change_permission(permission, user_account, setting_id, start, finish) {
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

function getCookie(name) {
    let start = document.cookie.indexOf(name+"=");
    let len = start+name.length+1;
    if ((!start) && (name !== document.cookie.substring(0,name.length))) return null;
    if (start === -1) return null;
    let end = document.cookie.indexOf(";",len);
    if (end === -1) end = document.cookie.length;
    return decodeURI(document.cookie.substring(len,end));
}

function setCookie(name,value,expires,path,domain,secure) {
    expires = expires * 60*60*24*1000;
    let today = new Date();
    let expires_date = new Date( today.getTime() + (expires) );
    let cookieString = name + "=" +encodeURIComponent(value) +
        ( (expires) ? ";expires=" + expires_date.toGMTString() : "") +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
    document.cookie = cookieString;
}

function logout() {
    setCookie('testEx_username', "", 0);
    setCookie('testEx_password', "", 0);
}
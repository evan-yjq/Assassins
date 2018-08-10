function get_user_group(start, finish) {
    if (start) start();
    $.ajax({
        type: 'get',
        url: '/user/get_group',
        data: {},
        timeout: 20000,
        success: function (data) {
            user_group = data;
            if (finish) finish('success')
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
            if (finish) finish('success')
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
            if (finish) finish('success')
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
            if (finish) finish('success')
        },
        error: function () {
            if (finish) finish('error')
        },
        complete: function () {
            if (finish) finish('complete')
        }
    })
}

function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name)===0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function logout() {
    setCookie('testEx_username', "", 0);
    setCookie('testEx_password', "", 0);
}
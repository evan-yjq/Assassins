function get_user_group(start, finish) {
    start();
    if ($('.select-group').find('.setting-option').length !== 0) {
        $('.select-group').find('.setting-option').remove();
    }
    $.ajax({
        type: 'get',
        url: '/get_user_group',
        data: {},
        timeout: 20000,
        success: function (data) {
            let t = '';
            for (let i = 0; i < data.length; i++) {
                t = t + '<option class="setting-option">' + data[i]['group_name'] + '</option>'
            }
            $('.select-group').append($(t));
            user_group = data;
            finish('success')
        },
        error: function () {
            finish('error')
        },
        complete: function () {
            finish('complete')
        }
    })
}

// function get_setting_group(setting_id, start, finish) {
//     if (start) start();
//     if ($('.select-group').find('.setting-option').length !== 0) {
//         $('.select-group').find('.setting-option').remove();
//     }
//     $.ajax({
//         type: 'get',
//         url: '/get_user_setting_group',
//         data: {'user_id': user_id,'setting_id': setting_id},
//         timeout: 20000,
//         success: function (data) {
//             let t = '';
//             for (let i = 0; i < data.length; i++) {
//                 t = t + '<option class="setting-option">' + data[i]['group_name'] + '</option>'
//             }
//             $('.select-group').append($(t));
//             setting_group = data;
//             if (finish) finish('success')
//         },
//         error: function () {
//             if (finish) finish('error')
//         },
//         complete: function () {
//             if (finish) finish('complete')
//         }
//     })
// }

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
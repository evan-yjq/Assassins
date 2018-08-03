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
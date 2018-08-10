
$(function () {
    get_user_group(undefined, function (status) {
        if (status === 'success') show_group();
    });
});

/**Group-------------------------------------------------*/
//显示group
function show_group() {
    for (let i = 0; i < user_group.length; i++) {
        add_group(user_group[i], i);
    }
}

//加入Group
function add_group(group_info, i) {
    let _ = $('<li class="list-group-item btn-link" id="group'+i+'" onclick="click_group('+i+')">'+group_info['group_name']+'</li>');
    $('.Group-list').append(_);
}

//刷新group_item选中状态
function click_group(n) {
    for (let i = 0; i < user_group.length; i++) {
        document.getElementById("group"+i).classList.remove("active")
    }
    document.getElementById("group"+n).classList.add("active");
    get_group_setting(document.getElementById("group"+n).innerHTML,
        () => remove_all_setting(),
        function (status) {
            if (status === 'success') show_setting();
        });
    get_group_member(document.getElementById("group"+n).innerHTML,
        () => remove_all_member(),
        function (status) {
            if (status === 'success') show_member();
        });
}

/**Setting-----------------------------------------------*/
//显示setting
function show_setting() {
    for (let i = 0; i < group_setting.length; i++) {
        add_setting(group_setting[i], i);
    }
}

//加入Setting
function add_setting(setting_info, i) {
    let _ = $('<li class="list-group-item btn-link" id="setting'+i+'" onclick="click_setting('+i+')">'+setting_info['setting_file']+'</li>');
    $('.Setting-list').append(_);
}

//刷新setting_item选中状态
function click_setting(n) {
    for (let i = 0; i < group_setting.length; i++) {
        document.getElementById("setting"+i).classList.remove("active")
    }
    document.getElementById("setting"+n).classList.add("active")
}

//移除所有setting
function remove_all_setting() {
    for (let i = 0; i < group_setting.length; i++) {
        $("#setting"+i).remove();
    }
    group_setting = []
}

/**Member------------------------------------------------*/
//显示member
function show_member() {
    for (let i = 0; i < group_member.length; i++) {
        add_member(group_member[i], i);
    }
}

//加入Member
function add_member(member_info, i) {
    let _ = $('<li class="list-group-item btn-link" id="member'+i+'" onclick="click_member('+i+')">'+member_info['user_account']+'</li>');
    $('.Member-list').append(_);
}

//刷新member_item选中状态
function click_member(n) {
    for (let i = 0; i < group_member.length; i++) {
        document.getElementById("member"+i).classList.remove("active")
    }
    document.getElementById("member"+n).classList.add("active")
}

//移除所有member
function remove_all_member() {
    for (let i = 0; i < group_member.length; i++) {
        $("#member"+i).remove();
    }
    group_member = []
}
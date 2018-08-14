
$(function () {
    get_user_group(undefined, (status) => {if (status === 'success') show_group()})
});

/**Group-------------------------------------------------*/
//显示group
function show_group() {
    for (let i = 0; i < user_group.length; i++) append_group(user_group[i], i);
}

//加入Group
function append_group(group_info, i) {
    let _ = $('<li class="list-group-item page-link group-item" id="group'+i+'" onclick="click_group('+i+')">'+group_info['group_name']+'</li>');
    $('.Group-list').append(_);
}

//刷新group_item选中状态
function click_group(n) {
    let gi = group_selection();
    if (gi !== undefined) document.getElementById("group"+gi).classList.remove("active");
    if (gi !== n) {
        document.getElementById("group"+n).classList.add("active");
        get_group_setting(document.getElementById("group"+n).innerHTML, () => remove_all_setting(), (status) => {if (status === 'success') show_setting()});
        get_group_member(document.getElementById("group"+n).innerHTML, () => remove_all_member(), (status) => {if (status === 'success') show_member()})
    }else{
        remove_all_setting();
        remove_all_member();
    }
    show_info_base_selection()
}

//获取当前group选中的id
function group_selection() {
    if ($('.Group-list').find('.active').length > 0) for (let i = 0; i < user_group.length; i++) if (document.getElementById("group"+i).classList.contains('active')) return i;
}

/**Setting-----------------------------------------------*/
//显示setting
function show_setting() {
    for (let i = 0; i < group_setting.length; i++) append_setting(group_setting[i], i)
}

//加入Setting
function append_setting(setting_info, i) {
    let _ = $('<li class="list-group-item page-link setting-item" id="setting'+i+'" onclick="click_setting('+i+')">'+setting_info['setting_file']+'</li>');
    $('.Setting-list').append(_);
}

//刷新setting_item选中状态
function click_setting(n) {
    let si = setting_selection();
    if (si !== undefined) document.getElementById("setting"+si).classList.remove("active");
    if (si !== n) document.getElementById("setting"+n).classList.add("active");
    show_info_base_selection()
}

//移除所有setting
function remove_all_setting() {
    $(".setting-item").remove();
    group_setting = []
}

//获取当前setting选中的id
function setting_selection() {
    if ($('.Setting-list').find('.active').length > 0) for (let i = 0; i < group_setting.length; i++) if (document.getElementById("setting"+i).classList.contains('active')) return i;
}

/**Member------------------------------------------------*/
//显示member
function show_member() {
    for (let i = 0; i < group_member.length; i++) append_member(group_member[i], i)
}

//加入Member
function append_member(member_info, i) {
    let _ = $('<li class="list-group-item page-link member-item" id="member'+i+'" onclick="click_member('+i+')">'+member_info['user_account']+'</li>');
    $('.Member-list').append(_);
}

//刷新member_item选中状态
function click_member(n) {
    let mi = member_selection();
    if (mi !== undefined) document.getElementById("member"+mi).classList.remove("active");
    if (mi !== n) document.getElementById("member"+n).classList.add("active");
    show_info_base_selection();
}

//移除所有member
function remove_all_member() {
    $(".member-item").remove();
    group_member = []
}

//获取当前member选中的id
function member_selection() {
    if ($('.Member-list').find('.active').length > 0) for (let i = 0; i < group_member.length; i++) if (document.getElementById("member"+i).classList.contains('active')) return i;
}

/**Info------------------------------------------------*/
//取得Info
function show_info_base_selection() {
    remove_all_info();
    let group_select, setting_select, member_select;
    let gi, si, mi;
    if ((gi=group_selection())!==undefined) group_select = document.getElementById("group"+gi).innerHTML;
    if ((si=setting_selection())!==undefined) setting_select = document.getElementById("setting"+si).innerHTML;
    if ((mi=member_selection())!==undefined) member_select = document.getElementById("member"+mi).innerHTML;
    if (group_select !== undefined && member_select !== undefined)
        append_info("身份:"+group_member[mi]['identity']);
    if (group_select !== undefined && setting_select !== undefined && member_select !== undefined)
        get_user_setting(member_select,setting_select,group_select,undefined, (status, data) => {
            if (status === 'success') {
                data = data['permission'].replace('w','写入').replace('r','读取').replace('/',',');
                append_info('权限:'+data)
            }
        })
}
//显示Info
function append_info(info) {
    let i = $('.info-item').length;
    let _ = $('<li class="list-group-item info-item" id="info'+i+'">'+info+'</li>');
    $('.Info-list').append(_);
}
//移除Info
function remove_all_info() {
    $('.info-item').remove()
}
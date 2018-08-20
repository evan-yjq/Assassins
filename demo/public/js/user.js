
$(function () {
    get_user_group(undefined, (status, data) => {if (status === 'success') show_group(data)})
});

/**Group-------------------------------------------------*/
//显示group
function show_group(data) {
    for (let i = 0; i < data.length; i++) append_group(data[i], i);
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
        get_group_setting(document.getElementById("group"+n).innerHTML, () => remove_all_setting(), (status, data) => {if (status === 'success') show_setting(data)});
        get_group_member(document.getElementById("group"+n).innerHTML, () => remove_all_member(), (status, data) => {if (status === 'success') show_member(data)})
    }else{
        remove_all_setting();
        remove_all_member();
    }
    show_info_base_selection()
}

//获取当前group选中的id
function group_selection() {
    if ($('.Group-list').find('.active').length > 0) for (let i = 0; i < $('.Group-list').find('.group-item').length; i++) if (document.getElementById("group"+i).classList.contains('active')) return i;
}

/**Setting-----------------------------------------------*/
//显示setting
function show_setting(data) {
    for (let i = 0; i < data.length; i++) append_setting(data[i], i)
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
    if ($('.Setting-list').find('.active').length > 0) for (let i = 0; i < $('.Setting-list').find('.setting-item').length; i++) if (document.getElementById("setting"+i).classList.contains('active')) return i;
}

/**Member------------------------------------------------*/
//显示member
function show_member(data) {
    for (let i = 0; i < data.length; i++) append_member(data[i], i)
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
    if ($('.Member-list').find('.active').length > 0) for (let i = 0; i < $('.Member-list').find('.member-item').length; i++) if (document.getElementById("member"+i).classList.contains('active')) return i;
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
        append_info("身份:"+group_member[mi]['identity'].replace('admin','管理员').replace('member','成员'));
    if (group_select !== undefined && setting_select !== undefined && member_select !== undefined)
        get_user_setting(member_select,setting_select,group_select,undefined, (status, data) => {
            if (status === 'success') {
                account = member_select;
                setting_id = data['setting_id'];
                data = data['permission'].replace('w','写入').replace('r','读取').replace('/',',');
                let i = 0;
                for (; i < $('.Member-list').find('.member-item').length; i++) if (document.getElementById("member"+i).innerHTML === getCookie('testEx_username')) break;
                if (group_member[i]['identity'] === 'admin') append_info('权限:'+data, '修改', 'permission');
                else append_info('权限:'+data)
            }
        })
}
let account,setting_id;
//显示Info
function append_info(info, btn, type) {
    let i = $('.info-item').length;
    if (type) add_modal($('.Info-list'), type);
    let _ = '<li class="list-group-item info-item" id="info'+i+'">'+info;
    if (btn) _ = _ + ' <a class="link" href="#" data-toggle="modal" data-target="#modal">'+btn+'</a>';
    _ = _ + '</li>';
    $('.Info-list').append($(_));
}
//移除Info
function remove_all_info() {
    $('.info-item').remove();
    user_setting_permission = []
}

/**Modal-----------------------------------------------*/
function add_modal(p, type) {
    let form = '';
    let title = '';
    if (type === 'permission') {
        title = '修改权限';
        form = '<div class="form-group">\n' +
            '<label for="group-name" class="col-form-label">权限</label>\n' +
            '<select class="custom-select d-block w-100 select-permission" required="">\n' +
            '<option>读取</option>\n' +
            '<option>写入/读取</option>\n' +
            '<option>无</option>\n' +
            '</select>\n' +
            '</div>'
    }
    let _ = '<!--模态-->\n' +
        '<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">\n' +
        '<div class="modal-dialog modal-dialog-centered" role="document">\n' +
        '<div class="modal-content">\n' +
        '<div class="modal-header">\n' +
        '<h5 class="modal-title" id="modalTitle">'+title+'</h5>\n' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '<span aria-hidden="true">&times;</span>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="modal-body">\n' +
        '<form class="form">\n' +
        form +
        '</form>\n' +
        '</div>\n' +
        '<div class="modal-footer">\n' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
        '<button type="button" class="btn btn-primary model-ok">确定</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>';
    p.append($(_))
}

$('body').on('click', '.model-ok', function () {
    $('#modal').modal('hide');
    change_permission($('.select-permission').val().replace('读取','r').replace('写入','w').replace('无',''), account, setting_id,
        undefined, (status, data) => {if (status === 'success') show_info_base_selection()})
});
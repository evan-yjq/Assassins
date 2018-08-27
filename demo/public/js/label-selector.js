/**
 * 跳转标签页
 * @param label 标签名
 */
function goto_label(label) {
    switch (label) {
        case 'test_setting':
            sync_label_active_status(btn_label_id[0]);
            $('#content').html(test_setting);
            load_test_setting();
            break;
        case 'setting_info':
            sync_label_active_status(btn_label_id[1]);
            $('#content').html(setting_info);
            load_setting_info();
            break;
        case 'account_setting':
            sync_label_active_status(btn_label_id[2]);
            $('#content').html(account_setting);
            load_account_setting();
            break;
        case 'todo_list':
            sync_label_active_status();
            $('#content').html(todo_list);
            load_todo_list();
            break;
    }
}

let btn_label_id = ['btn_nav_test','btn_nav_setting','btn_nav_account'];

/**
 * 刷新标签显示方式
 * @param label
 */
function sync_label_active_status(label){
    for (let i = 0; i < btn_label_id.length; i++) {
        if (btn_label_id[i] === label) document.getElementById(label).classList.add("active");
        else document.getElementById(btn_label_id[i]).classList.remove("active");
    }
}

const test_setting = function () {
    return '<div class="select-view p-3 my-3 bg-white rounded box-shadow">' +
        '    <div class="row">' +
        '        <div class="col-md-auto">' +
        '            <label class="SettingLabel" for="InputSettings">' +
        '                配置文件' +
        '            </label>' +
        '            <div>' +
        '                <select class="custom-select d-block w-100 select-setting" id="InputSettings" onchange="changeSelectSetting()" required="">' +
        '                    <option value="">选择...</option>' +
        '                </select>' +
        '            </div>' +
        '        </div>' +
        '        <div class="col-md-auto">' +
        '            <label style="visibility: hidden">\'</label>' +
        '            <div class="addApiButtonView"></div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '' +
        '<div class="form-group addApiView p-3 my-3"></div>' +
        '<!--<div class="row">-->' +
        '    <!--<div class="col-md-12 addApiView"></div>-->' +
        '<!--</div>-->' +
        '' +
        '<div class="p-3 my-3 bg-white rounded box-shadow" style="display: none" id="bottom-line">' +
        '    <div class="row button-view ">' +
        '        <div class="col-md-auto">' +
        '            <input type="checkbox" class="checkbox-inline" id="checkAll" onchange="checkAllOnChange()">' +
        '        </div>' +
        '        <div class="col-md-auto">' +
        '            <button class="btn btn-primary go">' +
        '                提交' +
        '            </button>' +
        '        </div>' +
        '        <div class="col-md-auto">' +
        '            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#saveModal">' +
        '                保存配置到' +
        '            </button>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '<!--模态-->' +
        '<div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="saveModal" aria-hidden="true">' +
        '    <div class="modal-dialog modal-dialog-centered" role="document">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <h5 class="modal-title" id="saveModalTitle">保存配置</h5>' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '                    <span aria-hidden="true">&times;</span>' +
        '                </button>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <form>' +
        '                    <div class="form-group">' +
        '                        <label for="file-name" class="col-form-label">文件名</label>' +
        '                        <input type="text" class="form-control" id="file-name">' +
        '                  </div>' +
        '                  <!--<div class="form-group">-->' +
        '                      <!--<label for="group-name" class="col-form-label">保存到组</label>-->' +
        '                      <!--<select class="custom-select d-block w-100 select-group" id="group-name" required="">-->' +
        '                          <!--<option value="">选择...</option>-->' +
        '                      <!--</select>-->' +
        '                  <!--</div>-->' +
        '                </form>' +
        '            </div>' +
        '            <div class="modal-footer">' +
        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>' +
        '                <button type="button" class="btn btn-primary save-settings">保存</button>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
};

const setting_info = function () {
    return'<div class="select-view p-3 my-3 bg-white rounded box-shadow">' +
        '        <div class="row">' +
        '            <div class="col-md-auto">' +
        '                <label class="SettingLabel" for="InputSettings">' +
        '                    配置文件' +
        '                </label>' +
        '                <div>' +
        '                    <select class="custom-select d-block w-100 select-setting" id="InputSettings" onchange="changeSelectSetting_s()" required="">' +
        '                        <option value="">选择...</option>' +
        '                    </select>' +
        '                </div>' +
        '            </div>' +
        '            <div class="col-md-auto">' +
        '                <label style="visibility: hidden">\'</label>' +
        '                <div class="row button-view"></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="row p-3 my-3">' +
        '        <div class="col-md-12">' +
        '            <div class="dataT"></div>' +
        '        </div>' +
        '    </div>'
};

const account_setting = function () {
    add_modal($('body'),'edit_pwd','edit-pwd');
    return '<div class="p-3 my-3 bg-white rounded box-shadow">' +
        '   <div class="row bar"><div class="col-lg-auto pull-right">' +
        '       <a href="javascript: void(0)" data-toggle="modal" data-target="#edit-pwd" class="page-link">修改密码</a>' +
        '   </div></div>' +
        '</div>' +
        '<div class="p-3 my-3 bg-white rounded box-shadow">' +
        '   <div class="row">' +
        '       <div class="col-md-3 text-center">' +
        '           <ul class="list-group Group-list">' +
        '               <li class="list-group-item">' +
        '                   Group' +
        '                   <a class="link" href="javascript:void(0)">新建</a>' +
        '               </li>' +
        '           </ul>' +
        '       </div>' +
        '       <div class="col-md-3 text-center">' +
        '           <ul class="list-group Setting-list">' +
        '               <li class="list-group-item">' +
        '                   Setting' +
        '                   <a class="link" href="javascript:void(0)">导入</a>' +
        '               </li>' +
        '           </ul>' +
        '       </div>' +
        '       <div class="col-md-3 text-center">' +
        '           <ul class="list-group Member-list">' +
        '               <li class="list-group-item">' +
        '                   Member' +
        '                   <a class="link" href="javascript:void(0)">邀请</a>' +
        '               </li>' +
        '           </ul>' +
        '       </div>' +
        '       <div class="col-md-3 text-center">' +
        '           <ul class="list-group Info-list">' +
        '               <li class="list-group-item">Info</li>' +
        '           </ul>' +
        '       </div>' +
        '   </div>' +
        '</div>'
};

const todo_list = function () {
    return '<div class="p-3 my-3 bg-white rounded box-shadow" id="preview"></div>'
};
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

const test_setting = '<div class="row select-view p-3 my-3 bg-white box-shadow">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-auto">\n' +
    '            <label class="SettingLabel" for="InputSettings">\n' +
    '                配置文件\n' +
    '            </label>\n' +
    '            <div>\n' +
    '                <select class="custom-select d-block w-100 select-setting" id="InputSettings" onchange="changeSelectSetting()" required="">\n' +
    '                    <option value="">选择...</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-auto">\n' +
    '            <label style="visibility: hidden">\'</label>\n' +
    '            <div class="addApiButtonView"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row form-group addApiView p-3 my-3"></div>\n' +
    '<!--<div class="row">-->\n' +
    '    <!--<div class="col-md-12 addApiView"></div>-->\n' +
    '<!--</div>-->\n' +
    '\n' +
    '<div class="row p-3 my-3 bg-white box-shadow" style="display: none" id="bottom-line">\n' +
    '    <div class="row button-view ">\n' +
    '        <div class="col-md-auto">\n' +
    '            <input type="checkbox" class="checkbox-inline" id="checkAll" onchange="checkAllOnChange()">\n' +
    '        </div>\n' +
    '        <div class="col-md-auto">\n' +
    '            <button class="btn btn-primary go">\n' +
    '                提交\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        <div class="col-md-auto">\n' +
    '            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#saveModal">\n' +
    '                保存配置到\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<!--模态-->\n' +
    '<div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="saveModal" aria-hidden="true">\n' +
    '    <div class="modal-dialog modal-dialog-centered" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <h5 class="modal-title" id="saveModalTitle">保存配置</h5>\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <form>\n' +
    '                    <div class="form-group">\n' +
    '                        <label for="file-name" class="col-form-label">文件名</label>\n' +
    '                        <input type="text" class="form-control" id="file-name">\n' +
    '                  </div>\n' +
    '                  <!--<div class="form-group">-->\n' +
    '                      <!--<label for="group-name" class="col-form-label">保存到组</label>-->\n' +
    '                      <!--<select class="custom-select d-block w-100 select-group" id="group-name" required="">-->\n' +
    '                          <!--<option value="">选择...</option>-->\n' +
    '                      <!--</select>-->\n' +
    '                  <!--</div>-->\n' +
    '                </form>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>\n' +
    '                <button type="button" class="btn btn-primary save-settings">保存</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>';

const setting_info = '<div class="row select-view p-3 my-3 bg-white box-shadow">\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-auto">\n' +
    '                <label class="SettingLabel" for="InputSettings">\n' +
    '                    配置文件\n' +
    '                </label>\n' +
    '                <div>\n' +
    '                    <select class="custom-select d-block w-100 select-setting" id="InputSettings" onchange="changeSelectSetting_s()" required="">\n' +
    '                        <option value="">选择...</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="col-md-auto">\n' +
    '                <label style="visibility: hidden">\'</label>\n' +
    '                <div class="row button-view"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row select-view p-3 my-3">\n' +
    '        <div class="col-md-12">\n' +
    '            <div class="dataT"></div>\n' +
    '        </div>\n' +
    '    </div>';

const account_setting = '<div class="row p-3 my-3 bg-white rounded box-shadow">\n' +
    '    <div class="col-md-3 text-center">\n' +
    '        <ul class="list-group Group-list">\n' +
    '            <li class="list-group-item">\n' +
    '                Group\n' +
    '                <a class="link" href="javascript:void(0)">新建</a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <div class="col-md-3 text-center">\n' +
    '        <ul class="list-group Setting-list">\n' +
    '            <li class="list-group-item">\n' +
    '                Setting\n' +
    '                <a class="link" href="javascript:void(0)">导入</a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <div class="col-md-3 text-center">\n' +
    '        <ul class="list-group Member-list">\n' +
    '            <li class="list-group-item">\n' +
    '                Member\n' +
    '                <a class="link" href="javascript:void(0)">邀请</a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <div class="col-md-3 text-center">\n' +
    '        <ul class="list-group Info-list">\n' +
    '            <li class="list-group-item">Info</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '</div>';

const todo_list = '<div class="p-3 my-3 bg-white rounded box-shadow" id="preview"></div>';
// 配置所属的用户所属的分组
let setting_group;
// 用户所属的分组
let user_group = [];
// 分组内配置
let group_setting = [];
// 分组内成员
let group_member = [];
// 用户ID
let user_id;
// 设置列表
let setting_list;
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
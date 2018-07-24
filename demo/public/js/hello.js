
$('body').on('change','.select-setting',function(){
    var setting_name = document.getElementById("InputSettings").value;
    var result = document.getElementById('result');
    if (setting_name!=='')
        get_setting(setting_name, result);
});

var apis;
var settings;

function addApi2View() {
    for (let i = 0; i < apis.length; i++) {
        console.log(apis[i]['name']);
    }
    var tmp = $('<div class="row">\n' +
        '                    <!--服务器配置名-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            服务器名\n' +
        '                        </label>\n' +
        '                        <input class="form-control" size="5" type="text"/>\n' +
        '                    </div>\n' +
        '                    <!--Sign用户名-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            Sign用户\n' +
        '                        </label>\n' +
        '                        <input class="form-control" size="5" type="text"/>\n' +
        '                    </div>\n' +
        '                    <!--选择api-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label for="InputApis">\n' +
        '                            测试api\n' +
        '                        </label>\n' +
        '                        <select class="custom-select d-block w-100" id="InputApis" required="">\n' +
        '                            <option value="">选择...</option>\n' +
        '                            <option>新建模板</option>\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                    <!--自定义参数-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label for="InputApis">\n' +
        '                            修改参数\n' +
        '                        </label>\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-md-auto">\n' +
        '                                <div class="row">\n' +
        '                                    <div class="col-md-auto d-flex">\n' +
        '                                        <b class="d-flex align-items-center">key:</b>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-auto">\n' +
        '                                        <select class="custom-select d-block w-100" required="" title="参数">\n' +
        '                                            <option value="">选择...</option>\n' +
        '                                            <option>channelId</option>\n' +
        '                                        </select>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="col-md-auto">\n' +
        '                                <div class="row">\n' +
        '                                    <div class="col-md-auto d-flex">\n' +
        '                                        <b class="d-flex align-items-center">value:</b>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-auto">\n' +
        '                                        <input class="form-control" size="8" type="text"/>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="col-md-auto d-flex">\n' +
        '                                <a class="d-flex align-items-center" href="#">\n' +
        '                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
        '                                </a>\n' +
        '                                <br>\n' +
        '                                <a class="d-flex align-items-center" href="#">\n' +
        '                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
        '                                </a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <!--测试次数-->\n' +
        '                    <div class="col-md-auto">\n' +
        '                        <label>\n' +
        '                            测试次数(0~9999)\n' +
        '                        </label>\n' +
        '                        <input class="form-control" type="text" size="4" maxlength="4" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>\n' +
        '                    </div>\n' +
        '                    <!--增加api-->\n' +
        '                    <div class="col-md-auto d-flex">\n' +
        '                        <a class="d-flex align-items-center" href="#">\n' +
        '                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
        '                        </a>\n' +
        '                        <br>\n' +
        '                        <a class="d-flex align-items-center" href="#">\n' +
        '                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
        '                        </a>\n' +
        '                    </div>\n' +
        '                </div>');
    $('.addApi').append(tmp)
}


function get_setting(setting_name, result) {
    $.ajax({
        type:'get',
        url:'/get_settings',
        data: {'setting_name':setting_name},
        timeout: 20000,
        success: function (data) {
            var str = JSON.stringify(data);
            result.append(str);

            apis = data['apis'];
            settings = data['settings'];
        },
        error: function () {
            result.append('获取失败');
        },
        complete: function(){

        }
    });
}
function IsPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    window.flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            window.flag = false;
            break;
        }
    }
}

$('body').on('click','.check',function(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let result = $(this).siblings('.result');
    login(username, password, result);
});

window.onload=function(){
    IsPC();
    checkCookie();
};

function checkCookie(){
    let username = getCookie("testEx_username");
    let password = getCookie("testEx_password");
    let result = $(this).siblings('.result');
    if (username!=="" && password!==""){
        login(username, password, result);
    }
}

function login(username, password, result) {
    $.ajax({
        type:'post',
        url:'/user/check',
        data: {'username':username,'password':password},
        timeout: 20000,
        success: function (data) {
            let value = '';
            if (flag) {
                if (data === '1') {
                    getCookie('testEx_username') === username ? "" : setCookie('testEx_username', username, 1);
                    getCookie('testEx_password') === password ? "" : setCookie('testEx_password', password, 1);
                    window.location.href = "/";
                } else if (data === '0') {
                    value = '用户名或密码不能为空'
                } else if (data === '-1') {
                    value = '用户名或密码错误'
                }
            }else{
                value = '目前只支持PC端操作';
            }
            result.length !== 0 ? $('.text-danger').remove() : '';
            let re = $('<labe class="text-danger">' + value + '</labe>');
            result.append(re);
        },
        error: function () {
            result.length !== 0 ? $('.text-danger').remove() : '';
            let re = $('<labe class="text-danger">登录失败</labe>');
            result.append(re);
        },
        complete: function(){

        }
    });
}
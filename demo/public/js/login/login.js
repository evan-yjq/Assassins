$('body').on('click','.check',function(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var result = $(this).siblings('.result');
    login(username, password, result);
});

window.onload=function(){
    checkCookie();
};

function checkCookie(){
    var username = getCookie("testEx_username");
    var password = getCookie("testEx_password");
    var result = $(this).siblings('.result');
    if (username!=="" && password!==""){
        login(username, password, result);
    }
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)===0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function login(username, password, result) {
    $.ajax({
        type:'post',
        url:'/user/check',
        data: {'username':username,'password':password},
        timeout: 20000,
        success: function (data) {
            var value = '';
            if (data === '1'){
                getCookie('testEx_username') === "" ? setCookie('testEx_username', username, 1) : "";
                getCookie('testEx_password') === "" ? setCookie('testEx_password', password, 1) : "";
                window.location.href = "/";
            }else if (data === '0') {
                value = '用户名或密码不能为空'
            }else if (data === '-1'){
                value = '用户名或密码错误'
            }
            result.length !== 0 ? $('.text-danger').remove() : '';
            var re = $('<labe class="text-danger">'+value+'</labe>');
            result.append(re);
        },
        error: function (data) {
            result.length !== 0 ? $('.text-danger').remove() : '';
            var re = $('<labe class="text-danger">登录失败</labe>');
            result.append(re);
        },
        complete: function(){

        }
    });
}
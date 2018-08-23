/**
 * 格式化JSON
 * @param msg   {string}    准备格式化的JSON
 * @returns     {string}    格式化后的JSON
 */
function formatJson(msg) {
    let rep = "~";
    let jsonStr = JSON.stringify(msg, null, rep);
    let str = "";
    for (let i = 0; i < jsonStr.length; i++) {
        let text2 = jsonStr.charAt(i);
        if (i > 1) {
            let text = jsonStr.charAt(i - 1);
            if (rep !== text && rep === text2) {
                str += "\n"
            }
        }
        str += text2;
    }
    jsonStr = "";
    for (let i = 0; i < str.length; i++) {
        let text = str.charAt(i);
        if (rep === text)
            jsonStr += "\t";
        else {
            jsonStr += text;
        }
        if (i === str.length - 2)
            jsonStr += "\n"
    }
    return jsonStr;
}

/**
* 文本框根据输入内容自适应高度
* @param elem       {HTMLElement}       输入框元素
* @param extra      {Number}            设置光标与输入框保持的距离(默认0)
* @param maxHeight  {Number}            设置最大高度(可选)
*/
function autoTextarea(elem, extra, maxHeight) {
    extra = extra || 0;
    let isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
    isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
    addEvent = function (type, callback) {
        elem.addEventListener ?
            elem.addEventListener(type, callback, false) :
            elem.attachEvent('on' + type, callback);
    },
    getStyle = elem.currentStyle ? function (name) {
        let val = elem.currentStyle[name];

        if (name === 'height' && val.search(/px/i) !== 1) {
            let rect = elem.getBoundingClientRect();
            return rect.bottom - rect.top -
                parseFloat(getStyle('paddingTop')) -
                parseFloat(getStyle('paddingBottom')) + 'px';
        }

        return val;
    } : function (name) {
            return getComputedStyle(elem, null)[name];
    },
    minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    let change = function () {
        let scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        }
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            }
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        }
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
}

/**
 * 在页面显示返回信息
 * @param elem  {HTMLElement}   页面元素
 * @param type  {string}        信息类型
 * @param msg   {string}        显示内容
 */
function showMessage(elem, type, msg) {
    $('.alert').remove();
    type = typeAll[type];
    let div =
        $('<div class="alert '+type['div']+' alert-dismissable fade show" role="alert">' +
        '    <button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '    <strong>'+type['content']+'</strong>' + msg +
        '  </div>');
    elem.append(div);
}

/**
 * 获取Cookie值
 * @param name      Cookie名
 * @returns {*}     Cookie值
 */
function getCookie(name) {
    let start = document.cookie.indexOf(name+"=");
    let len = start+name.length+1;
    if ((!start) && (name !== document.cookie.substring(0,name.length))) return null;
    if (start === -1) return null;
    let end = document.cookie.indexOf(";",len);
    if (end === -1) end = document.cookie.length;
    return decodeURI(document.cookie.substring(len,end));
}

/**
 * 插入Cookie
 * @param name      Cookie名
 * @param value     Cookie值
 * @param expires   有效时长
 * @param path      路径
 * @param domain
 * @param secure
 */
function setCookie(name,value,expires,path,domain,secure) {
    expires = expires * 60*60*24*1000;
    let today = new Date();
    let expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name + "=" +encodeURIComponent(value) +
        ( (expires) ? ";expires=" + expires_date.toGMTString() : "") +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
}

/**
 * 退出登录
 */
function logout() {
    setCookie('testEx_username', "", 0);
    setCookie('testEx_password', "", 0);
}

/**
 * 页面样式(转载
 */
$(function () {
    'use strict';
    $('[data-toggle="offcanvas"]').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })
});
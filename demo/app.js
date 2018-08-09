const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');

const index = require('./routes/index');
const settings = require('./routes/settings');
const user = require('./routes/user');
const userDB = require('./comm/userDB');

const app = express();

const errorLogfile = fs.createWriteStream('logs/error.log', {flags: 'a'});
const accessLogfile = fs.createWriteStream('logs/info.log', {flags: 'a'});

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(session({
    secret: 'demo',
    resave: true,
    saveUninitialized:true
}));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('TestEx'));
app.use(express.static(path.join(__dirname, 'public')));

// 获取url请求客户端ip
let get_client_ip = function(req) {
    let ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};

// 拦截未登录用户
app.use(function (req, res, next) {
    if (req.url !== '/user/check') {
        if (req.cookies["testEx_username"] == null || req.cookies["testEx_password"] == null) {
            res.render('login')
        } else{
            userDB.CHECK(req.cookies["testEx_username"])
                .then(function (result) {
                    if (result.user_pwd === req.cookies["testEx_password"]) {
                        next()
                    }else {
                        res.render('login')
                    }
                })
        }
    }else{
        next();
    }
});

// 打印访问接口日志
app.use(function (req, res, next) {
    let meta = '[' + new Date() + '] ' + get_client_ip(req) + '\n' + req.method + ' \t' + req.url + '\n';
    accessLogfile.write(meta);
    let tmp;
    if (req.method === 'GET') {
        tmp = req.query
    } else if (req.method === 'POST') {
        tmp = req.body
    }
    let s = [];
    for (let i = 0; i < Object.keys(tmp).length; i++) {
        s.push(Object.keys(tmp)[i] + ': ' + Object.values(tmp)[i]);
    }
    const a = s.join(',\t');
    if (a.length>0) accessLogfile.write(a + '\n');
    next();
});

app.use('/', index);
app.use('/settings', settings);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 打印错误日志
app.use(function(err, req, res, next){
    let meta = '[' + new Date() + '] ' + get_client_ip(req) + '\n' + req.method + ' \t' + req.url + '\n';
    errorLogfile.write(meta);
    let tmp;
    if (req.method === 'GET') {
        tmp = req.query
    } else if (req.method === 'POST') {
        tmp = req.body
    }
    let s = [];
    for (let i = 0; i < Object.keys(tmp).length; i++) {
        s.push(Object.keys(tmp)[i] + ': ' + Object.values(tmp)[i]);
    }
    const a = s.join(',\t');
    if (a.length>0) errorLogfile.write(a + '\n');
    errorLogfile.write(err.stack + '\n');
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
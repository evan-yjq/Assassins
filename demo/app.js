var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');

var index = require('./routes/index');
var settings = require('./routes/settings');
var user = require('./routes/user');

var app = express();

var errorLogfile = fs.createWriteStream('logs/error.log', {flags: 'a'});
var accessLogfile = fs.createWriteStream('logs/info.log', {flags: 'a'});

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

//获取url请求客户端ip
var get_client_ip = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};

app.use(function (req, res, next) {
    if (req.url !== '/user/check') {
        if (req.cookies["testEx_username"] == null || req.cookies["testEx_password"] == null) {
            res.render('login')
        }
    }
    next();
});

app.use(function (req, res, next) {
    var meta = '[' + new Date() + '] ' + get_client_ip(req) + ' \t' + req.method + ' \t' + req.url + ' \t';
    var tmp;
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
    accessLogfile.write(meta + a + '\n');
    next();
});

app.use('/', index);
app.use('/settings', settings);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
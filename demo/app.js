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
// var search = require('./routes/search');

var app = express();

var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});

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
app.use(cookieParser('demo'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    var meta = '[' + new Date() + '] '+ req.method + ' ' + req.url + '\t';
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
    const a = s.join(',t');
    accessLogfile.write(meta + a + '\n');
    next();
});

app.use('/', index);
app.use('/settings', settings);
// app.use('/search', search);

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

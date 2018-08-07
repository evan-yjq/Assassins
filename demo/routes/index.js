const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");
const exec=require('child_process').exec;
const markdown = require("markdown").markdown;
const userDB = require('../comm/userDB');
const settingDB = require('../comm/settingDB');

//返回测试界面
router.get('/', function (req, res) {
    res.render('hello');
});

//返回开发界面
router.get('/get_todo_list', function (req, res) {
    const mark = fs.readFileSync("TodoList.md").toString();
    res.send(markdown.toHTML(mark));
    return res.end();
});

//获取用户所属分组
router.get('/get_user_group', function (req, res) {
    var account = req.cookies["testEx_username"];
    userDB.GET_GROUP(account).then(function (data) {
        res.send(data);
        return res.end()
    })
});

//获取配置所属分组
router.get('/get_user_setting_group', function (req, res) {
    let user_id = req.query.user_id;
    let setting_id = req.query.setting_id;
    settingDB.GET_SETTING_GROUP(setting_id, user_id)
        .then(function (data) {
            res.send(data);
            res.end()
        })
});

router.get('/get_settings', function (req, res) {
    var file = req.query.setting_name;
    if (file === ""){
        return res.end();
    } else{
        const data = YAML.parse(fs.readFileSync("demo/settings/"+req.query.setting_name+".yaml").toString());
        res.send(data);
        return res.end();
    }
});

router.get('/get_setting_name_list', function (req, res) {
    var account = req.cookies["testEx_username"];
    userDB.GET_SET(account).then(function (data) {
        res.send(data);
        return res.end()
    });
});

router.get('/get_test_result', function (req, res, next) {
    let option = req.query.setting+' '+req.query.serverName+' '+req.query.apiKey+' '+req.query.cnt+' \''+req.query.params+'\' ';
    exec('python2.7 TestExtension.py '+option,
        {
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 10000 * 1024, // 默认 200 * 1024
            killSignal: 'SIGTERM'
        },
        function(err, stdout, stderr){
            if (err){
                console.log('stderr', err);
                next(err)
            }
            if (stdout) {
                res.send(stdout);
                return res.end()
            }
        });
});

router.get('/jump_settings', function (req, res) {
    res.render('settings');
});

router.get('/jump_todo', function (req, res) {
    res.render('todo')
});

module.exports = router;

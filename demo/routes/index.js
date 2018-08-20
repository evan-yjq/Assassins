const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");
const exec=require('child_process').exec;
const markdown = require("markdown").markdown;
const userDB = require('../comm/userDB');
const settingDB = require('../comm/settingDB');

//跳转测试界面
router.get('/', function (req, res) {
    res.render('hello');
});

//跳转todo界面
router.get('/todo', function (req, res) {
    res.render('todo')
});

//返回todoList内容
router.get('/get_todo_list', function (req, res) {
    const mark = fs.readFileSync("TodoList.md").toString();
    return res.send(markdown.toHTML(mark)).end();
});

//返回配置所属分组
router.get('/get_user_setting_group', function (req, res) {
    let user_id = req.query.user_id;
    let setting_id = req.query.setting_id;
    settingDB.GET_SETTING_GROUP(setting_id, user_id)
        .then(function (data) {
            return res.send(data).end();
        })
});

//返回配置内容
router.get('/get_settings', function (req, res) {
    let file = req.query.setting_name;
    // todo 验证读取权限


    if (file === ""){
        return res.end();
    } else{
        try {
            const data = YAML.parse(fs.readFileSync("demo/settings/"+req.query.setting_name+".yaml").toString());
            return res.send(data).end();
        }catch (e) {
            return res.end();
        }
    }
});

//返回用户配置列表
router.get('/get_setting_name_list', function (req, res) {
    let account = decodeURI(req.cookies["testEx_username"]);
    userDB.GET_SET(account).then(function (data) {
        res.send(data);
        return res.end()
    });
});

//返回测试结果
router.get('/get_test_result', function (req, res, next) {
    let setting = req.query.setting;
    let params = req.query.params;
    // todo 验证读取权限


    // 尝试载入自定义插件
    try {
        let plugin = require('../settings/'+setting);
        const data = YAML.parse(fs.readFileSync("demo/settings/"+setting+".yaml").toString());
        params = JSON.stringify(plugin.handle(data, JSON.parse(params)));
    }catch (e) {
        console.log(setting+'没有自定义插件或插件内部报错')
    }

    let option = req.query.setting+' '+req.query.serverName+' '+req.query.apiKey+' '+req.query.cnt+' \''+params+'\' ';
    try {
        exec('python2.7 TestExtension.py '+option,
        {
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 8 * 1024 * 1024 * req.query.cnt + 200 * 1024, // 默认 200 * 1024
            killSignal: 'SIGTERM'
        },
        function(err, stdout, stderr){
            if (err){
                console.log('stderr', err);
                res.send(err);
                return res.end()
            }
            if (stdout) {
                res.send(stdout);
                return res.end()
            }
        });
    }catch (e) {
        res.send(e);
        return res.end()
    }
});


module.exports = router;

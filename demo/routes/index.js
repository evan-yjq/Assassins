const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");
const join = require('path').join;
const pa = require('path');
const cp=require('child_process');
var markdown = require( "markdown" ).markdown;

router.get('/', function (req, res) {
    res.render('hello');
});

router.get('/get_todo_list', function (req, res) {
    const mark = fs.readFileSync("TodoList.md").toString();
    res.send(markdown.toHTML(mark));
    res.end();
});

router.get('/get_settings', function (req, res) {
    var file = req.query.setting_name;
    if (file === ""){
        res.end();
    } else{
        const data = YAML.parse(fs.readFileSync("demo/settings/"+req.query.setting_name+".yaml").toString());
        res.send(data);
        res.end();
    }
});

router.get('/get_setting_name_list', function (req, res) {
    res.send(findSync("demo/settings/"));
    res.end()
});

router.get('/get_test_result', function (req, res, next) {
    var option = req.query.setting+' '+req.query.serverName+' '+req.query.apiKey+' '+req.query.cnt+' \''+req.query.params+'\' ';
    cp.exec('python2.7 TestExtension.py '+option, function(err, stdout, stderr){
        if (err){
            console.log('stderr', err);
            next(err)
        }
        if (stdout) {
            res.send(stdout);
            res.end()
        }
    });
});

router.get('/jump_settings', function (req, res) {
    res.render('settings');
});

router.get('/jump_todo', function (req, res) {
    res.render('todo')
});

function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path, val);
            let stats=fs.statSync(fPath);
            if(stats.isFile())
                result.push(pa.basename(val, '.yaml'));
        });
    }
    finder(startPath);
    return result;
}
module.exports = router;

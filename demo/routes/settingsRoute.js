const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");
const join = require('path').join;
const pa = require('path');
const settingDB = require('../comm/settingDB');
const userDB = require('../comm/userDB');
const groupDB = require('../comm/groupDB');

router.post('/save', function (req, res, next) {
    const settings = req.body.settings;
    let settingName = req.body.settingName;
    const account = decodeURI(req.cookies["testEx_username"]);
    let file = 'demo/settings/' + settingName+'.yaml';
    let groupName = settingName.split('/')[0];
    settingName = settingName.split('/')[1];
    let txt = YAML.dump(JSON.parse(settings));
    let path = 'demo/settings/'+groupName;
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
    finder(path);
    fs.writeFile(file, txt, function (err) {
        if (err) next();
        if (result.indexOf(settingName) < 0) {
            // todo 验证写入权限


            insertDB(account, groupName, settingName, function () {
                console.log(file+"写入成功");
                return res.end()
            })
        }else{
            return res.end()
        }
    });
});

function insertDB(account, groupName, settingName, onFinish){
    let user_id;
    let group_id;
    userDB.GET_ID_BY_ACCOUNT(account).then(function (data) {
        user_id =  data.user_id;
        groupDB.GET_ID_BY_NAME(groupName).then(function (data) {
            group_id = data.group_id;
            settingDB.ADD_SETTING(settingName, group_id, user_id)
                .then(function () {
                    onFinish()
                })
        });
    });
}

module.exports = router;
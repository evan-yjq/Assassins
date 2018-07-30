const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");
var settingDB = require('../comm/settingDB');
var userDB = require('../comm/userDB');
var groupDB = require('../comm/groupDB');

router.post('/save', function (req, res) {
    const settings = req.body.settings;
    const settingName = req.body.settingName;
    const groupName = req.body.groupName;
    const account = req.cookies["testEx_username"];
    let file = 'demo/settings/' + groupName + '/' + settingName+'.yaml'
    let txt = YAML.dump(JSON.parse(settings));
    let path = 'demo/settings'+ groupName;
    
    fs.exists(path, function (exists) {
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
        let f;
        if(exists){
            finder(path);
            if (result.indexOf(settingName)>0) f = true;
            fs.writeFile(file, txt, function (err) {
                if (err) return false;
                if (f) intertDB(account, groupName, settingName)
            });
        }else{
            fs.mkdir(path, function (err) {
                if(err) return false;
                else{
                    finder(path);
                    if (result.indexOf(settingName)>0) f = true;
                    fs.writeFile(file, txt, function (err) {
                        if (err) return false;
                        if (f) intertDB(account, groupName, settingName)
                    });
                }
            });
        }
        console.log(file+"写入成功");
    });
    return res.end()
});

function intertDB(account, groupName, settingName){
    let user_id = userDB.GET_ID_BY_ACCOUNT(account);
    let group_id = groupDB.GET_ID_BY_NAME(groupName);
    settingDB.ADD_SETTING(settingName, group_id, user_id)
}

module.exports = router;
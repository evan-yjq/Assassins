const express = require('express');
const router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");

router.post('/save', function (req, res) {
    const settings = req.body.settings;
    const settingName = req.body.settingName;
    write('demo/settings', 'demo/settings/'+settingName+'.yaml', YAML.dump(JSON.parse(settings)), res);
    // console.log(YAML.parse(settings))
});

function write(path, file, txt, res){
    fs.exists(path, function (exists) {  //path为文件夹路径
        var retTxt = exists ? '文件存在' : '文件不存在';
        if(retTxt === '文件存在'){
            fs.writeFile(file, txt, function (err) {
                if (err){
                    return false;
                } else{
                    res.send("文件内容替换成功");
                    res.end();
                }
            });
        }else if(retTxt === '文件不存在'){
            fs.mkdir(path, function (err) {
                if(err){
                    return false;
                }else{
                    fs.writeFile(file, txt, function (err) {
                        if (err){
                            return false;
                        } else{
                            res.send("文件内容写入成功");
                            res.end();
                        }
                    });
                }
            });
        }
    });
}

module.exports = router;
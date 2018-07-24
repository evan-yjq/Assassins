var express = require('express');
var router = express.Router();
const YAML = require('yamljs');
const fs = require("fs");


router.get('/', function (req, res, next) {

    res.render('hello');
});

router.get('/get_settings', function (req, res) {
    // file为文件所在路径
    const data = YAML.parse(fs.readFileSync("settings/"+req.query.setting_name+".yaml").toString());
    res.send(data);
    res.end();
});

module.exports = router;

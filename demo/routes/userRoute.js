const express = require('express');
const router = express.Router();
const md5 = require("md5");
const userDB = require('../comm/userDB');

router.post('/check', function (req, res) {
    let account = req.body.username;
    let pwd = req.body.password;
    if (account === '' || pwd === '') {
        return res.send('0').end()
    }
    userDB.CHECK(account)
        .then(function (result) {
            if (result.user_pwd === md5("#*"+pwd+"*&"))
                return res.send('1').end();
            else return res.send('-1').end()
        }).catch(function (err) {
            return res.send('-1').end()
        })
});

//返回用户所属分组
router.get('/get_group', function (req, res) {
    let account = decodeURI(req.cookies["testEx_username"]);
    userDB.GET_GROUP(account).then(function (data) {
        return res.send(data).end();
    })
});

router.get('/get_group_setting', function (req, res) {
    let group_name = req.query.groupName;
    userDB.GET_GROUP_SETTING(group_name).then(function (data) {
        return res.send(data).end();
    })
});

router.get('/get_group_member', function (req, res) {
    let group_name = req.query.groupName;
    userDB.GET_GROUP_MEMBER(group_name).then(function (data) {
        return res.send(data).end();
    })
});

router.get('/get_user_setting', function (req, res) {
    let user_account = req.query.userAccount;
    let setting_file = req.query.settingFile;
    let group_name = req.query.groupName;
    userDB.GET_USER_SETTING(user_account, setting_file, group_name)
        .then(function (data) {
            return res.send(data).end();
        })
});

router.get('/get_user_id_by_account', function (req, res) {
    let account = decodeURI(req.cookies["testEx_username"]);
    userDB.GET_ID_BY_ACCOUNT(account)
        .then(function (data) {
            res.send(data.user_id.toString());
            res.end()
        })
});

router.get('/change_permission', function (req, res) {
    let by_user = decodeURI(req.cookies["testEx_username"]);
    let account = req.query.account;
    let setting_id = req.query.settingId;
    let permission = req.query.permission;
    userDB.GET_PERMISSION(account, setting_id)
        .then(function (data) {
            let type = "";
            if (data.permission === undefined) {
                type = "insert";
            }
            userDB.CHANGE_PERMISSION(type, permission, account, setting_id)
                .then(function (data) {
                    return res.send('修改成功').end()
                });
        })
});

router.post('/edit_pwd', function (req, res) {
    let old_pwd = req.body.pwd;
    let pwd = req.body.newPwd;
    let userId = req.body.userId;
    userDB.CHECK('', userId)
        .then(function (result) {
            if (result.user_pwd === md5("#*" + old_pwd + "*&")) {
                userDB.EDIT_PWD(md5("#*" + pwd + "*&"), userId).then(()=>{return res.send('修改成功').end()})
            }else return res.send('原密码错误').end();
        }).catch(function (err) {
            return res.send('修改失败').end()
        })
});

module.exports = router;
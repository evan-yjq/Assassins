const express = require('express');
const router = express.Router();
var userDB = require('../comm/userDB');

router.get('/', function (req, res) {
    res.render('login')
});

router.post('/check', function (req, res) {
    var account = req.body.username;
    var pwd = req.body.password;
    if (account === '' || pwd === '') {
        res.send('0');
        return res.end()
    }
    console.log('logining');
    userDB.CHECK(account)
        .then(function (result) {
            if (result.user_pwd === pwd){
                res.send('1');
            }else{
                res.send('-1')
            }
            return res.end()
        }).catch(function (err) {
            res.send('-1');
            return res.end()
        })
});

module.exports = router;
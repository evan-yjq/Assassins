const express = require('express');
const router = express.Router();
var sql = require('../comm/userDB');

router.get('/', function (req, res) {
    res.render('login')
});

router.post('/check', function (req, res) {
    var account = req.body.username;
    var pwd = req.body.password;
    if (account === '' || pwd === '') {
        res.send('0');
        res.end()
    }
    console.log('logining');
    sql.CHECK(account)
        .then(function (result) {
            if (result.user_pwd === pwd){
                res.send('1');
            }else{
                res.send('-1')
            }
            res.end()
        }).catch(function (err) {
            res.send('-1');
            res.end()
        })
});

module.exports = router;
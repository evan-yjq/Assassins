var file = "/home/Assassins/test.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var Promise = require("bluebird");


var sql = {
    SELECT: "select * from T_USER",
    CHECK: "select * from T_USER where user_account = ?"
};

function promiseQuery(sql, param, mode) {
    mode = mode === 'all' ? 'all' : mode === 'get' ? 'get' : 'run';
    return new Promise(function (res, rej) {
        db[mode](sql, param, function (err, data) {
            if (err) {
                rej(new SQLError(err))
            }else {
                if (data){
                    res(data)
                } else{
                    res('success')
                }
            }
        })
    })
}

function select_all_user(){
    return promiseQuery(sql.SELECT, [], 'all')
}

function check(account){
    return promiseQuery(sql.CHECK, [account], 'get')
}

module.exports = {
    SELECT_ALL: select_all_user,
    CHECK: check
};
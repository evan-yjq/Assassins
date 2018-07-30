var file = "/home/Assassins/test.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var Promise = require("bluebird");

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

module.exports = {
    QUERY: promiseQuery
};
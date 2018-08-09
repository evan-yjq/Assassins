const file = "./test.db";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);
const Promise = require("bluebird");

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
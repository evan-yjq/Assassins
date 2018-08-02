var DB = require("./DB");

var sql = {
    INSERT_SETTING: "insert into T_SETTING(setting_file)VALUES (?)",
    SELECT_LAST_SETTING: "select last_insert_rowid()",
    INSERT_GROUP_SETTING: "insert into T_GROUP_SETTING (group_id, setting_id) VALUES (?, ?)",
    INSERT_USER_SETTING: "insert into T_USER_SETTING(permission, setting_id, user_id) VALUES ('w/r', ?, ?)"
};

function insert_setting(setting_file, group_id, user_id){
    let setting_id;
    return new Promise(function (res, rej) {
        DB.QUERY(sql.INSERT_SETTING, [setting_file], 'run')
            .then(function () {
                DB.QUERY(sql.SELECT_LAST_SETTING, [], 'get')
                    .then(function (data) {
                        console.log(data);
                        setting_id = data['last_insert_rowid()'];
                        DB.QUERY(sql.INSERT_GROUP_SETTING, [group_id, setting_id], 'run');
                        DB.QUERY(sql.INSERT_USER_SETTING, [setting_id, user_id], 'run');
                        res();
                    })
            })
    })
}

module.exports = {
    ADD_SETTING: insert_setting
};
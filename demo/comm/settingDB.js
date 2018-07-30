var DB = require("./DB");

var sql = {
    INSERT_SETTING: "insert into T_SETTING(setting_file)VALUES (?)"
};

function insert_setting(setting_file, group_id, user_id){
    DB.QUERY(sql.INSERT_SETTING, [setting_file], 'run')
        .then(function (data) {
            console.log(data)
        })
}

module.exports = {
    ADD_SETTING: insert_setting
};
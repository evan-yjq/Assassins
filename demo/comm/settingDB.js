var DB = require("./DB");

var sql = {
    INSERT_SETTING: "insert into T_SETTING(setting_file)VALUES (?)",
    SELECT_LAST_SETTING: "select last_insert_rowid()",
    INSERT_GROUP_SETTING: "insert into T_GROUP_SETTING (group_id, setting_id) VALUES (?, ?)",
    INSERT_USER_SETTING: "insert into T_USER_SETTING(permission, setting_id, user_id) VALUES ('w/r', ?, ?)",
    SELECT_SETTING_GROUP: "select group_name from T_GROUP\n" +
    "  where group_id in (\n" +
    "    select gs.group_id from T_GROUP_SETTING gs\n" +
    "      left join T_GROUP_USER gu on gs.group_id = gu.group_id\n" +
    "    where gs.setting_id = ?\n" +
    "    and gu.user_id = ?\n" +
    "  )"
};

function insert_setting(setting_file, group_id, user_id){
    return new Promise(function (res, rej) {
        DB.QUERY(sql.INSERT_SETTING, [setting_file], 'run')
            .then(function () {
                DB.QUERY(sql.SELECT_LAST_SETTING, [], 'get')
                    .then(function (data) {
                        let setting_id = data['last_insert_rowid()'];
                        DB.QUERY(sql.INSERT_GROUP_SETTING, [group_id, setting_id], 'run');
                        DB.QUERY(sql.INSERT_USER_SETTING, [setting_id, user_id], 'run');
                        res();
                    })
            })
    })
}

function select_setting_group(setting_id, user_id){
    return DB.QUERY(sql.SELECT_SETTING_GROUP, [setting_id, user_id], 'all');
}


module.exports = {
    ADD_SETTING: insert_setting,
    GET_SETTING_GROUP: select_setting_group
};
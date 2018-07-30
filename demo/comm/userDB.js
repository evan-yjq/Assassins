var DB = require("./DB");

var sql = {
    SELECT: "select * from T_USER",
    CHECK: "select * from T_USER where user_account = ?",
    GET_SET:"select s.setting_id, s.setting_file, us.permission, gs.group_id, g.group_name\n" +
    "from T_SETTING s\n" +
    "left join T_GROUP_SETTING gs\n" +
    "left join T_GROUP_USER gu\n" +
    "left join T_USER u\n" +
    "left join T_USER_SETTING us\n" +
    "left join T_GROUP g\n" +
    "where u.user_account = ?\n" +
    "and gu.user_id=u.user_id\n" +
    "and u.user_id=us.user_id\n" +
    "and gs.group_id = gu.group_id\n" +
    "and g.group_id = gs.group_id\n" +
    "and gs.setting_id=s.setting_id\n" +
    "and s.setting_id=us.setting_id",
    GET_GROUP: "select group_name from T_GROUP\n" +
    "where group_id in (\n" +
    "  select group_id from T_GROUP_USER\n" +
    "  where user_id = (\n" +
    "    select user_id from T_USER\n" +
    "    where user_account = ?\n" +
    "  )\n" +
    ")",
    GET_ID_BY_ACCOUNT:"select user_id from T_USER\n" +
    "where user_account = ?"
};

function get_id_by_account(account) {
    return DB.QUERY(sql.GET_ID_BY_ACCOUNT, [account], 'get')
}

function select_all_user(){
    return DB.QUERY(sql.SELECT, [], 'all')
}

function check(account){
    return DB.QUERY(sql.CHECK, [account], 'get')
}

function get_settings(account){
    return DB.QUERY(sql.GET_SET, [account], 'all')
}

function get_group(account){
    return DB.QUERY(sql.GET_GROUP, [account], 'all')
}

module.exports = {
    SELECT_ALL: select_all_user,
    CHECK: check,
    GET_SET: get_settings,
    GET_GROUP: get_group,
    GET_ID_BY_ACCOUNT: get_id_by_account
};
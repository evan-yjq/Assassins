const DB = require("./DB");

const sql = {
    SELECT: "select * from T_USER",
    CHECK: "select * from T_USER where user_account = ?",
    GET_SET: "select s.setting_id, s.setting_file, gs.group_id, g.group_name, u.user_account,\n" +
        "       case\n" +
        "           when gu.identity = 'admin' then 'w/r'\n" +
        "           when us.permission is null then 'r'\n" +
        "           else us.permission\n" +
        "       end as permission\n" +
        "  from T_SETTING s\n" +
        "  left join T_GROUP_SETTING gs on gs.setting_id = s.setting_id\n" +
        "  left join T_GROUP_USER gu on gu.group_id = gs.group_id\n" +
        "  left join T_USER u on u.user_id = gu.user_id\n" +
        "  left join T_USER_SETTING us on us.user_id = u.user_id and s.setting_id=us.setting_id\n" +
        "  left join T_GROUP g on g.group_id = gs.group_id\n" +
        "where u.user_account = ?\n" +
        "order by gs.group_id",
    GET_GROUP: "select group_name from T_GROUP\n" +
        "where group_id in (\n" +
        "  select group_id from T_GROUP_USER\n" +
        "  where user_id = (\n" +
        "    select user_id from T_USER\n" +
        "    where user_account = ?\n" +
        "  )\n" +
        ")",
    GET_ID_BY_ACCOUNT: "select user_id from T_USER\n" +
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
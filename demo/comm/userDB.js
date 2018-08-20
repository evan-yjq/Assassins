const DB = require("./DB");

const sql = {
    SELECT: "select * from T_USER",
    CHECK: "select * from T_USER where user_account = ?",
    GET_SET: "select s.setting_id, s.setting_file, gs.group_id, g.group_name, u.user_account,\n" +
        "       case\n" +
        "           when gu.identity = 'admin' then 'w/r'\n" +
        "           when gu.identity = 'applicant' then ''\n" +
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
    GET_GROUP: "select group_name from T_GROUP g\n" +
        "left join T_GROUP_USER gu on gu.group_id = g.group_id\n" +
        "left join T_USER u on u.user_id = gu.user_id\n" +
        "where u.user_account = ?",
    GET_GROUP_SETTING: "select setting_file from T_SETTING s\n" +
        "  left join T_GROUP_SETTING gs on gs.setting_id = s.setting_id\n" +
        "  left join T_GROUP g on gs.group_id = g.group_id\n" +
        "where g.group_name = ?",
    GET_GROUP_MEMBER: "select user_account,identity from T_USER u\n" +
        "  left join T_GROUP_USER gu on gu.user_id = u.user_id\n" +
        "  left join T_GROUP g on g.group_id = gu.group_id\n" +
        "where g.group_name = ?",
    GET_USER_SETTING: "select s.setting_id, s.setting_file, gu.group_id, u.user_account,\n" +
        "  case\n" +
        "    when gu.identity = 'admin' then 'w/r'\n" +
        "    when gu.identity = 'applicant' then ''\n" +
        "    when us.permission is null then 'r'\n" +
        "    else us.permission\n" +
        "  end as permission\n" +
        "from T_SETTING s\n" +
        "left join T_GROUP_SETTING gs on gs.setting_id = s.setting_id\n" +
        "left join T_GROUP_USER gu on gu.group_id = gs.group_id\n" +
        "left join T_USER u on u.user_id = gu.user_id\n" +
        "left join T_USER_SETTING us on us.user_id = u.user_id and s.setting_id=us.setting_id\n" +
        "left join T_GROUP g on g.group_id = gs.group_id\n" +
        "where u.user_account = ?\n" +
        "and s.setting_file = ?\n" +
        "and g.group_name = ?",
    GET_ID_BY_ACCOUNT: "select user_id from T_USER\n" +
        "where user_account = ?",
    INSERT_PERMISSION: "insert into T_USER_SETTING VALUES (?, ?, ?)",
    UPDATE_PERMISSION: "update T_USER_SETTING set permission = ?\n" +
        "where setting_id = ?\n" +
        "and user_id = ?",
    GET_PERMISSION:"select permission from T_USER_SETTING\n" +
        "where user_id = (select user_id from T_USER where user_account = ?)\n" +
        "and setting_id = ?",
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

function get_group_setting(group_name){
    return DB.QUERY(sql.GET_GROUP_SETTING, [group_name], 'all')
}

function get_group_member(group_name){
    return DB.QUERY(sql.GET_GROUP_MEMBER, [group_name], 'all')
}

function get_user_setting(user_account, setting_file, group_name){
    return DB.QUERY(sql.GET_USER_SETTING, [user_account, setting_file, group_name], 'get')
}

function get_permission(user_account, setting_id){
    return DB.QUERY(sql.GET_PERMISSION, [user_account, setting_id], 'get')
}

function change_permission(type, permission, user_account, setting_id){
    return get_id_by_account(user_account).then(function (data) {
        let user_id = data.user_id;
        if (type === "insert") {
            return DB.QUERY(sql.INSERT_PERMISSION, [permission, setting_id, user_id])
        }else {
            return DB.QUERY(sql.UPDATE_PERMISSION, [permission, setting_id, user_id])
        }
    })
}

module.exports = {
    SELECT_ALL: select_all_user,
    CHECK: check,
    GET_SET: get_settings,
    GET_GROUP: get_group,
    GET_ID_BY_ACCOUNT: get_id_by_account,
    GET_GROUP_SETTING: get_group_setting,
    GET_GROUP_MEMBER: get_group_member,
    GET_USER_SETTING: get_user_setting,
    GET_PERMISSION: get_permission,
    CHANGE_PERMISSION: change_permission
};
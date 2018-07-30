var DB = require("./DB");

var sql = {
    GET_ID_BY_NAME: "select group_name from T_GROUP\n" +
    "where group_id = ?"
};

function get_id_by_name(name){
    return DB.QUERY(sql.GET_ID_BY_NAME, [name], 'get')
}

module.exports = {
    GET_ID_BY_NAME: get_id_by_name
};
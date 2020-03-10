const db = require("./../util/db");

module.exports = {
    // 查询所有的ip信息
    queryAllIp(callback) {
        let sql_selectAllIp = "SELECT id, address, date FROM ip;";
        db(sql_selectAllIp, (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    }
};

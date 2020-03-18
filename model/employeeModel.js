const db = require("./../util/db");

module.exports = {
    // 查询员工个人信息
    queryPersonalInfo(username, callback) {
        let sql_selectOneInfo =
            "SELECT username, grade FROM user WHERE username = ?";
        db(sql_selectOneInfo, [username], (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    }
};

const db = require("./../util/db");

module.exports = {
    // 登录，根据用户名查询用户信息
    login(username, callback) {
        let sql_selectUser = `SELECT username, password, grade FROM user WHERE username = ?`;
        db(sql_selectUser, [username], (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    },
    // 新用户注册
    register(username, password, callback) {
        let sql_insertUser =
            "INSERT INTO user (username, password, grade) VALUES (?, ?, 0)";
        db(sql_insertUser, [username, password], (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    }
};

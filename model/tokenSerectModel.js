const db = require("./../util/db");

/**
 * 获取token秘钥
 */

module.exports = {
    // 获取秘钥
    getTokenSecret(callback) {
        let sql_selectLastOne =
            "SELECT secretKey FROM tokenSecretKey DESC LIMIT 1";
        db(sql_selectLastOne, (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    },
    // 新增秘钥
    addTokenSecret(newSecret, time, callback) {
        let sql_insertOne =
            "INSERT INTO tokenSecretKey (secretKey, time) VALUES (?, ?)";
        db(sql_insertOne, [newSecret, time], (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    }
};

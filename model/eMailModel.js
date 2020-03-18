const db = require("./../util/db");

module.exports = {
    // 获取验证码并存到数据库
    saveAuthCode(eMail, authCode, timestamp, callback) {
        let insert_authCode =
            "INSERT INTO authcode (eMail, authCode, timestamp) values (?, ?, ?)";
        db(insert_authCode, [eMail, authCode, timestamp], (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    },
    // 查询 验证码
    verifyAuthCode(eMail, authCode, callback) {
        let select_authCode =
            "SELECT id, authCode, timestamp FROM authcode WHERE eMail = ? AND authCode = ? ORDER BY id DESC LIMIT 1";
        db(select_authCode, [eMail, authCode], (err, result) => {
            if (err) callback(err, null);
            else callback(null, result);
        });
    }
};

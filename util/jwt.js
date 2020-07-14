const jsonwebtoken = require("jsonwebtoken");

let tokenSecret = "1qaz2wsx"; // 初始化秘钥

module.exports = {
    // 获取秘钥
    getTokenSecret(secret) {
        tokenSecret = secret;
    },
    // 生成token
    generateToken(content) {
        let created = Math.floor(Date.now() / 1000); // 获取当前时间戳 单位 秒/s
        let token = jsonwebtoken.sign(
            {
                data: content,
                exp: created + 2 * 60 * 60 // 2小时后过期
            },
            tokenSecret, // 秘钥
            { algorithm: "HS512" } // 加密方式
        );
        return token;
    },
    // 校验token
    verifyToken(token, callback) {
        jsonwebtoken.verify(
            token,
            tokenSecret,
            { algorithms: ["HS512"] }, // 解密方式
            (err, decoded) => {
                callback(err, decoded);
            }
        );
    }
};

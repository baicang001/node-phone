const jsonwebtoken = require("jsonwebtoken");
let secret = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// 生成秘钥
const getJwtSecret = () => {
    let tokenSecret = "";
    for (let i = 0; i < secret.length; i++) {
        tokenSecret += secret.charAt(Math.floor(Math.random() * 62));
    }
    return tokenSecret;
};

let tokenSecret = getJwtSecret(); // 获取秘钥

module.exports = {
    // 生成token
    generateToken(content) {
        let created = Math.floor(Date.now() / 1000); // 获取当前时间戳 单位 秒/s
        let token = jsonwebtoken.sign(
            {
                data: content,
                exp: created + 2 * 60 * 60 // 2小时后过期
            },
            tokenSecret // 秘钥
            // { algorithm: "HS512" } // 加密方式
        );
        return token;
    },
    // 校验token
    verifyToken(token, callback) {
        jsonwebtoken.verify(
            token,
            tokenSecret,
            // { algorithms: ["HS512"] },
            (err, decoded) => {
                callback(err, decoded);
            }
        );
    }
};

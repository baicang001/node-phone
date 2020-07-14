const tokenSecretModel = require("./../model/tokenSerectModel");
const jwt = require("./../util/jwt");

/**
 * 处理token秘钥
 */

module.exports = {
    // 获取秘钥
    getTokenSecret(req, res) {
        tokenSecretModel.getTokenSecret((err, result) => {
            if (err) {
                res.json({
                    code: 403,
                    msg: "数据库异常",
                    status: "error",
                    err: err
                });
            } else {
                jwt.getTokenSecret(result[0].tokenSecretKey);
                res.json({
                    code: 200,
                    msg: "秘钥获取成功",
                    status: "ok"
                });
            }
        });
    },
    // 新增秘钥
    addTokenSecret(req, res) {
        let newSecret = req.body.secret;
        tokenSecretModel.addTokenSecret(newSecret, time, (err, result) => {
            if (err) {
                res.json({
                    code: 403,
                    msg: "数据库异常",
                    status: "error",
                    err: err
                });
            } else {
                jwt.getTokenSecret(result);
                res.json({
                    code: 200,
                    msg: "新增秘钥成功",
                    status: "ok"
                });
            }
        });
    }
};

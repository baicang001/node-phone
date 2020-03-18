const sendEMail = require("./../util/e-mail");
const eMailModel = require("./../model/eMailModel");

module.exports = {
    // 获取验证码
    getAuthCode(req, res) {
        let eMail = req.body.eMail;
        sendEMail(eMail, (err, result) => {
            if (err) {
                res.json({
                    code: 403,
                    msg: "验证码发送失败",
                    status: "error",
                    err: err
                });
            } else {
                let timestamp = Math.floor(Date.now() / 1000) + ""; // 获取当前时间戳，单位 秒/s
                eMailModel.saveAuthCode(
                    eMail,
                    result.authCode,
                    timestamp,
                    (qerr, data) => {
                        if (err) {
                            res.json({
                                code: 403,
                                msg: "系统异常，请重新获取验证码",
                                status: "warning",
                                warning: qerr
                            });
                        } else {
                            res.json({
                                code: 200,
                                msg: "验证码发送成功",
                                status: "ok",
                                result: result
                            });
                        }
                    }
                );
            }
        });
    },
    // 校验验证码
    verifyAuthCode(req, res) {
        let eMail = req.body.eMail;
        let authCode = req.body.authCode;
        let currentTimestamp = Math.floor(Date.now() / 1000); // 获取当前校验的时间戳 单位 秒/s
        eMailModel.verifyAuthCode(eMail, authCode, (err, result) => {
            if (err) {
                res.json({
                    code: 403,
                    msg: "系统异常，验证码校验失败",
                    status: "error",
                    err: err
                });
            } else {
                if (result.length === 0) {
                    res.json({
                        code: 400,
                        msg: "无效验证码",
                        status: "invalid",
                        result: result
                    });
                } else if (currentTimestamp - result[0].timestamp > 180) {
                    res.json({
                        code: 400,
                        msg: "验证码已过期",
                        status: "timeout",
                        result: result
                    });
                } else {
                    res.json({
                        code: 200,
                        msg: "验证码校验成功",
                        status: "ok",
                        result: result
                    });
                }
            }
        });
    }
};

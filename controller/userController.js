const userModel = require("./../model/userModel");
const jwt = require("./../util/jwt");
const crypto = require("./../util/cryptoJS");
const acl = require("./../util/acl");

module.exports = {
    // 登录，根据用户名查询用户信息，并赋予用户角色（权限）
    login(req, res) {
        let username = req.body.username; // 用户姓名
        let password = crypto(req.body.password); // 用户密码(并加密)
        userModel.login(username, (err, result) => {
            if (err) {
                res.json({
                    code: 403,
                    msg: "数据库异常",
                    status: "error",
                    err: err
                });
            } else {
                if (result.length === 0) {
                    res.json({
                        code: 404,
                        msg: "该用户不存在",
                        status: "usernameError"
                    });
                } else if (password !== result[0].password) {
                    res.json({
                        code: 404,
                        msg: "用户密码错误",
                        status: "passwordError"
                    });
                } else {
                    let token = jwt.generateToken(username);
                    let role = "";
                    switch (result[0].grade) {
                        case 0:
                            role = "normal";
                            break;
                        case 1:
                            role = "admin";
                            break;
                        case 2:
                            role = "director";
                            break;
                        default:
                            break;
                    }
                    acl.addUserRoles(username, role); // 给用户添加对应的角色
                    res.json({
                        code: 200,
                        msg: "用户登录成功",
                        status: "ok",
                        token
                    });
                }
            }
        });
    },
    // 新用户注册
    register(req, res) {
        let username = req.body.username;
        let password = crypto(req.body.password);
        // 先判断用户是否存在
        userModel.login(username, (err, result) => {
            if (err) {
                res.json({ code: 403, msg: "数据库异常", status: "error" });
            } else {
                // 注册的该用户名已存在
                if (result.length > 0) {
                    res.json({
                        code: 400,
                        msg: "该用户名已被注册",
                        status: "registered"
                    });
                } else {
                    userModel.register(username, password, (qerr, qresult) => {
                        if (qerr) {
                            res.json({
                                code: 403,
                                msg: "数据库异常",
                                status: "error"
                            });
                        } else {
                            res.json({
                                code: 200,
                                msg: "新用户注册成功",
                                status: "ok"
                            });
                        }
                    });
                }
            }
        });
    }
};

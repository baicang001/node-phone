const express = require("express");
const path = require("path");
const router = require("./router");
const jwt = require("./util/jwt");
const acl = require("./util/acl");

const app = express();

/* 加载静态资源html css js img... */
app.use(express.static(path.join(__dirname, "static")));

/* 配置获取post请求里的body数据 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 校验token(加载静态资源不需要验证token) */
app.use((req, res, next) => {
    if (
        req.url === "/user/login" ||
        req.url === "/user/register" ||
        req.url === "/email/getAuthCode" ||
        req.url === "/email/verifyAuthCode" ||
        req.url === "/favicon.ico"
    ) {
        next();
    } else {
        // let token = req.headers.token;
        let token = req.headers.token || req.body.token;
        if (token && token !== "") {
            // 验证token
            jwt.verifyToken(token, (err, decoded) => {
                if (err) {
                    // token失效 或 伪造的token
                    res.json({
                        code: 403,
                        msg: "登录已过期，请重新登录",
                        status: "expired"
                    });
                } else {
                    // 获取通行权限 decoded.data === 用户名
                    next(decoded.data);
                }
            });
        } else {
            // token不存在
            res.json({ code: 403, msg: "你还没有登录", status: "logout" });
        }
    }
});

/* 校验用户角色权限 */
app.use((username, req, res, next) => {
    // 登录/注册状态无需校验
    if (
        req.url === "/user/login" ||
        req.url === "/user/register" ||
        req.url === "/email/getAuthCode" ||
        req.url === "/email/verifyAuthCode" ||
        req.url === "/favicon.ico"
    ) {
        next();
    } else {
        let resource = req.url;
        // acl.isAllowed(req.session.username, resource, "*", (err, allowed) => {
        acl.isAllowed(username, resource, "*", (err, allowed) => {
            // allowed === true
            if (allowed) {
                next();
            } else {
                res.json({
                    code: 400,
                    msg: "你没有该权限",
                    status: "notAllowed",
                    err: err
                });
            }
        });
    }
});

/* 加载路由 */
app.use(router);

/* next(value)，next会将value的值传递给下一个app.use()，若再下一个app.use()要使用value值，则再上一个中next(value) */
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.static || 500);
    res.json({
        message: err.message,
        error: err
    });
});

/* 监听端口，启动node服务器 127.0.0.1  192.168.0.101 */
app.listen(9999, "192.168.0.101", () => {
    console.log("node服务器启动成功");
});

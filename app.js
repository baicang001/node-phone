const express = require("express");
const path = require("path");
const router = require("./router");
const jwt = require("./util/jwt");

const app = express();

// 加载静态资源html css js img...
app.use(express.static(path.join(__dirname, "static")));

// 配置获取post请求里的body数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 校验token(加载静态资源不需要验证token)
app.use((req, res, next) => {
    if (
        req.url === "/user/login" ||
        req.url === "/user/register" ||
        req.url === "/favicon.ico"
    ) {
        next();
    } else {
        // let token = req.headers.token;
        let token = req.body.token;
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
                    // 获取同行权限
                    next();
                }
            });
        } else {
            // token不存在
            res.json({ code: 403, msg: "你还没有登录", status: "logout" });
        }
    }
});

// 加载路由
app.use(router);

app.listen(9999, "127.0.0.1", () => {
    console.log("node服务器启动成功");
});

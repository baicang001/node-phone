const router = require("express").Router();
const userController = require("./controller/userController");
const ipController = require("./controller/ipController");

/**
 * 用户路由
 */
// 登录
router.post("/user/login", (req, res) => {
    userController.login(req, res);
});
// 注册
router.post("/user/register", (req, res) => {
    userController.register(req, res);
});

// ip路由
router.post("/ip/queryall", (req, res) => {
    ipController.queryAllIp(req, res);
});

module.exports = router;

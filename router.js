const router = require("express").Router();
const userController = require("./controller/userController");
const ipController = require("./controller/ipController");
const employeeController = require("./controller/employeeController");
const eMailController = require("./controller/eMailController");
const tokenSecretController = require("./controller/tokenSecretController");

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

/**
 * ip路由
 */
router.post("/ip/queryall", (req, res) => {
    ipController.queryAllIp(req, res);
});

/**
 * 员工信息路由
 */
router.post("/employee/personalInfo", (req, res) => {
    employeeController.queryPersonalInfo(req, res);
});

/**
 * 发送邮件
 */
// 获取验证码
router.post("/email/getAuthCode", (req, res) => {
    eMailController.getAuthCode(req, res);
});

// 校验验证码
router.post("/email/verifyAuthCode", (req, res) => {
    eMailController.verifyAuthCode(req, res);
});

/**
 * 更换token秘钥
 */
router.post("/api/secretkey/add", (req, res) => {
    tokenSecretController.addTokenSecret(req, res);
});

module.exports = router;

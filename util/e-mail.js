const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// 发件人信息
const transport = nodemailer.createTransport(
    smtpTransport({
        host: "smtp.qq.com", // 使用QQ服务
        port: 465, // smtp端口有
        secureConnection: true, // // 使用 SSL
        auth: {
            user: "631625277@qq.com", // 邮箱账号 发件地址
            pass: "631625277@qq.com" // smtp密码 发件密码
        }
    })
);

// 生成4位随机数字
const randomFn = () => {
    let authCode = Math.round(Math.random() * 10000 + 1000); // [1000, 11000)
    if (authCode >= 10000) authCode -= 1000;
    return authCode;
};

const sendEMail = (eMail, callback) => {
    // let EMail = req.body.email; // 获取收件人邮箱
    let authCode = randomFn(); // 获取验证码
    // 收件人信息
    transport.sendMail(
        {
            from: "631625277@qq.com", // 发件邮箱
            to: eMail, // 收件邮箱
            subject: "欢迎注册", // 标题
            html:
                '<p>您好！</p><p>感谢您的注册。</p><p>您的验证码是：<strong style="color: #ff4e2a;">' +
                authCode +
                '</strong></p><p>***该验证码3分钟内有效***</p><a href="#">www.test.com</a>' // html 内容
        },
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                result.authCode = authCode;
                callback(null, result);
            }
            transport.close(); // 关闭连接池
        }
    );
};

module.exports = sendEMail;

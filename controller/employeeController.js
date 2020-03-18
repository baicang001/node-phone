const employeeModel = require("./../model/employeeModel");

module.exports = {
    // 查询员工个人信息
    queryPersonalInfo(req, res) {
        let username = req.body.username;
        employeeModel.queryPersonalInfo(username, (err, result) => {
            if (err) {
                res.json({
                    code: 403,
                    msg: "数据库异常",
                    status: "error",
                    err: err
                });
            } else {
                res.json({
                    code: 200,
                    msg: "查询员工信息成功",
                    status: "ok",
                    result: result
                });
            }
        });
    }
};

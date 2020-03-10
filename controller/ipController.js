const ipModel = require("./../model/ipModel");

module.exports = {
    // 查询所有的ip信息
    queryAllIp(req, res) {
        ipModel.queryAllIp((err, result) => {
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
                    msg: "ip地址信息查询成功",
                    status: "ok",
                    result: result
                });
            }
        });
    }
};

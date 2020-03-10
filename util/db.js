const mysql = require("mysql");

// 数据库连接池
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "wy_record",
    port: "3306",
    timezone: "08:00" // 时区
});

module.exports = (...args) => {
    let sql = args[0];
    let params = [];
    let callback;
    if (args.length === 2 && typeof args[1] === "function") {
        callback = args[1];
    } else if (
        args.length === 3 &&
        Array.isArray(args[1]) &&
        typeof args[2] === "function"
    ) {
        params = args[1];
        callback = args[2];
    } else {
        throw new Error("参数不匹配");
    }

    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null); // 此时数据库还没有被连上
            return;
        }
        connection.query(sql, params, (qerr, result) => {
            connection.release(); // 释放连接
            callback(qerr, result); // 返回数据
        });
    });
};

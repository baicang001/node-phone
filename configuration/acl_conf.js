/**
 * 权限配置文件
 */

module.exports = [
    {
        roles: "normal", // 一般成员
        allows: [
            {
                resources: ["/employee/personalInfo"],
                permissions: "*"
            }
        ]
    },
    {
        roles: "director", // 主管
        allows: [
            {
                resources: ["/ip/queryall"],
                permissions: "*"
            }
        ]
    },
    {
        roles: "admin", // 超级管理员
        allows: [
            {
                resources: ["/ip/queryall"],
                permissions: "*"
            }
        ]
    }
];

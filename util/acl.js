const Acl = require("acl");
const acl_conf = require("./../configuration/acl_conf");

let acl = new Acl(new Acl.memoryBackend()); // 创建权限检验acl并存储在内存中
// director角色拥有normal角色所有的权限, 子属性继承父属性所有的权限
// acl.addRoleParents("child", "parent")
acl.addRoleParents("director", "normal");
acl.addRoleParents("admin", "director");
acl.allow(acl_conf); // 按照权限表允许运行

module.exports = acl;

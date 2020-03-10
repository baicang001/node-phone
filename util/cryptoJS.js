const crypto = require("crypto");

/**
 * @param {String} content 需要被加密的内容
 * @param {String} hashType 加密方式 默认 sha256
 * @param {String} outputType 加密后的内容输出方式 base64
 */
module.exports = (content, hashType = "sha256", outputType = "base64") => {
    const hash = crypto.createHash(hashType); // 创建加密算法
    hash.update(content); // 需要被加密的内容
    return hash.digest(outputType); // 输出加密内容
};

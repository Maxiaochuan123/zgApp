/*
 * @Description: 分离出来反向代理
 * @Author: shenah
 * @Date: 2019-10-09
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-13 10:03:42
 */
module.exports = {
  "/api": {
    // target: "http://101.207.135.55:6080", // 外网地址
    target: "http://192.168.0.92:6081", // crm 嵌入管家 调试地址
    // target: "http://192.168.0.92:6080",
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  },
  "/mock/*": {
    target: "http://127.0.0.1:9000",
    secure: false,
    pathRewrite: {
      "^/mock": ""
    }
  }
};

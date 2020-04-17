/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 09:55:54
 * @LastEditTime: 2019-12-16 10:54:55
 * @LastEditors: shenah
 */
// node 加密模块
var crypto = require("crypto");
export default {
  formatCurrency_wan: function(num){
    return "￥" + num+'.00' + " (万元)";
  },
  // 添加金额千分号
  formatCurrency: function(num) {
      num = num ? num : "0";
      num = num.toString().replace(/\$|\,/g, "");
      if (isNaN(num)) num = "0";
      let sign = num == (num = Math.abs(num));
      num = Math.floor(num * 100 + 0.50000000001);
      let cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num =
          num.substring(0, num.length - (4 * i + 3)) +
          "," +
          num.substring(num.length - (4 * i + 3));
      return "￥" + ((sign ? "" : "-") + num + "." + cents) + " (元)";
  },

  // 判断操作系统
  getSystem(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (u.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    
    if(flag){
      return 'Web'
    }else{
      if (isAndroid) {
        return 'Android';
      }
      if (isIOS) {
        return 'iOS'
      }
    }
  },

  // 防抖
  debounce(fn, wait = 600) {
    let timeout;
    return function() {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait)
    }
  },
  // 节流
  throttle(fn, wait = 600) {
    let canRun = true;
    return function() {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        canRun = true;
      }, wait);
    };
  },

  // 获取地址栏参数
  getUrlKey(key) {
    return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  },

  /**
   * @aes192加密模块
   * @param str string 要加密的字符串
   * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
   * @retrun string 加密后的字符串
   * */
  encAse192: function(str, secret) {
    var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, "utf8", "hex"); //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
  },

  /**
   * @aes192解密模块
   * @param str string 要解密的字符串
   * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
   * @retrun string 解密后的字符串
   * */
  decAse192: function(str, secret) {
    var decipher = crypto.createDecipher("aes192", secret);
    var dec = decipher.update(str, "hex", "utf8"); //编码方式从hex转为utf-8;
    dec += decipher.final("utf8"); //编码方式从utf-8;
    return dec;
  },
  // 退出登录
  signOut() {
    // 清空登录
    localStorage.removeItem("login");
    const ipHost = `${window.location.protocol}//${window.location.host}`;
    window.location.href = `${ipHost}#/login`;
  },
  // 解密登录的信息并返回userInfo的对象
  decUserInfo() {
    let login = localStorage.getItem("login");
    if (typeof login === "string" && login !== "") {
      return JSON.parse(login);
      // return JSON.parse(this.decAse192(login, "login"));
    } else {
      return {};
    }
  },
  guid() {
    // 用于文件多张上传需要传入的randow
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
  },
  // 打开loading
  openLoading(name = "加载中，请稍后...") {
    let loading = document.getElementById("ajaxLoading");
    let text = document.getElementById("loadingText");
    text.innerHtml = name;
    loading.style.display = "block";
  },
  // 关闭loading
  closeLoading() {
    let loading = document.getElementById("ajaxLoading");
    loading.style.display = "none";
  }
};

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

  /**
   * @Excel 导出
   * @param data object 数据
   * @param name string excel表名
   * @param that object 上下文
   * */
  downloadExcel(that, data, name) {
    if (!data) {
      return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    // let suffix = name.substring(name.lastIndexOf('.'))
    link.setAttribute('download', 'test.docx')
    document.body.appendChild(link)
    link.click()
  },
};

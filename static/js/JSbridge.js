function setupWebViewJavascriptBridge(callback) {
  var bridge = window.WebViewJavascriptBridge || window.WKWebViewJavascriptBridge
      if (bridge) {
          return callback(bridge);
      }
      var callbacks = window.WVJBCallbacks || window.WKWVJBCallbacks
      if (callbacks) {
          return callbacks.push(callback);
      }
      window.WVJBCallbacks = window.WKWVJBCallbacks = [callback];
  if (window.WKWebViewJavascriptBridge) {
      window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
  } else {
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () {
          document.documentElement.removeChild(WVJBIframe)
      }, 0)
  }
}


export default{
    getStatusBarHeight(){
        setupWebViewJavascriptBridge(function (bridge) {
            console.log('bridge_1:', bridge)
            bridge.getStatusBarHeight();
        })
    },

    //通用的call方法
    callHandler(name, data, callback){
        setupWebViewJavascriptBridge(function (bridge) {
            console.log('bridge_2:', bridge)
            bridge.callHandler(name,data, callback);
        })
    },
    //通用的registerHandler方法
    registerHandler(name, callback){
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(name, function (data, responseCallback) {
                callback(data, responseCallback)
            })
        })
    },
    //APP页面内部跳转
    loadurlwithmobile(data, callback){
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler("locationwithMB",data, callback);
        })
    },
    //消息提示
    showToast(data){
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler("showToast",data);
        })
    },
    //返回
    ReturnVC(index,refresh){
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler("ReturnVC",{"index":index,"refresh":refresh});
        })
    }
}

let ua = navigator.userAgent.toLowerCase();
//Android终端
let isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
//Ios终端
let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);



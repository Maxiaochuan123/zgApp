import axios from 'axios'
import Qs from 'qs';
import Toast from "muse-ui-toast";
import store from "@/vuex/store";
import tool from '@static/js/tool'
import ios_fn from '@static/js/ios_fn'

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development"){
  import Vue from "vue";
  import VConsole from "vConsole";
  Vue.prototype.$VConsole = new VConsole()
}


// 超时时间
axios.defaults.timeout = 5000;
const loginUrl = `http://${window.location.host}/#/login`;
const apiPrefix = `/api`;

// 携带 token
let otherApp = tool.getUrlKey('otherApp') || false;
let appToken = tool.getUrlKey('appToken') || "";

// list 页面
let listPages = ["repayment", "overdue", "compensatory", "phone", "business", "visit", "all", "collection"];

/*----------------------请求拦截----------------------*/
axios.interceptors.request.use(config => {
  
  const contentType = config.headers["Content-Type"];
  const configUrl = `/${config.url.substring(config.url.lastIndexOf("/") + 1)}`;

  // 判断 如果是列表 不显示 loading
  const listUrl = window.location.hash;
  let listStr = listUrl.split("#/")[1];
  listStr = listStr.indexOf('/') != -1 ? listStr.split("/")[1] : listStr;
  let listUrlName = listStr.indexOf('?') != -1 ? listStr.split("?")[0] : listStr;

  if (configUrl !== '/login'){
    if (!listPages.includes(listUrlName)){
      // console.log(listPages.includes(listUrlName), listUrlName)
      store.commit('showLoading');
    }
  }

  // 参数序列化
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    if (contentType && contentType.indexOf("json") > -1) {
      config.data = JSON.stringify(config.data);
    } else if (contentType && contentType.indexOf("form-data") > -1){
      config.data = config.data;
    }else{
      config.data = Qs.stringify(config.data);
    }
  };

  let token = localStorage.getItem('token');
  let _appToken = appToken;
  
  if (otherApp){
    if (_appToken && configUrl !== '/login') {
      config.headers.Authorization = _appToken;
    }
  }else{
    if (token && configUrl !== '/login') {
      token = tool.decAse192(token, 'token');
      config.headers.Authorization =  token;
    }
  }

  return config;
}, error => {
  Toast.warning("加载超时");
  store.commit('closeLoading');
  return Promise.reject(error);
})

/*----------------------响应拦截----------------------*/
axios.interceptors.response.use(response => {
  store.commit('closeLoading');
  if (response.data.message !== "success") Toast.error({ message: response.data.message });
  switch (response.data.code) {
    case 9999:
      if (otherApp) { 
        if (tool.getSystem() === "Android"){
          bridge.navigation("login", true);
        }else{
          ios_fn.loginClick();
        }
      } else { 
        window.location.href = loginUrl;
      }
      break;
  }
  // console.log('response:', response)
  return response
}, error => {
    // console.log('error:', error)

  store.commit('closeLoading');
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        Toast.error({ message: "登陆失效, 请重新登陆" });
        if (otherApp) {
          if (tool.getSystem === "Android") {
            bridge.navigation("login", true);
          } else {
            ios_fn.loginClick();
          }
        } else {
          window.location.href = loginUrl;
        }
        break;
      case 403:
        Toast.warning({ message: "您无权访问此页面" });
        setTimeout(() => window.history.go(-1), 500);
        break;
      case 408:
        Toast.warning({ message: "请求超时, 请稍后重试" });
        setTimeout(() => window.history.go(-1), 500);
        break;
      case 500:
        Toast.warning({ message: "服务器内部错误, 请稍后重试" });
        setTimeout(() => window.history.go(-1), 500);
        break;
      case 504:
        Toast.warning({ message: "网关超时" });
        break;

      default: 
        Toast.warning({ message: error.response.message });
        break;

    }
  }
  return Promise.reject(error)
})

export const get = ({ url, params }) => {
  return axios.get(apiPrefix + url, { params: params }).then(res => res.data);
}

export const post = ({ url, params, fileProgress, headers}) => {
  return axios.post(apiPrefix + url, params, { headers, 
    onUploadProgress: progressEvent => {
      let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
      if (fileProgress) fileProgress.progress.progressNum = complete; 
    } }).then(res => res.data);
}

export const put = ({ url, params }) => {
  return axios.put(apiPrefix + url, params).then(res => res.data);
}

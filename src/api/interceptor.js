import axios from 'axios'
import Qs from 'qs';
import Toast from "muse-ui-toast";
import store from "@/vuex/store";
import tool from '../../static/js/tool'

// 超时时间
axios.defaults.timeout = 5000;
const loginUrl = `http://${window.location.host}/#/login`;
const apiPrefix = `${window.location.protocol}//${window.location.host}/api`;

/*----------------------请求拦截----------------------*/
axios.interceptors.request.use(config => {
  const contentType = config.headers["Content-Type"];
  const configUrl = `/${config.url.substring(config.url.lastIndexOf("/") + 1)}`;

  if (configUrl !== '/login') store.commit('showLoading');

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

  // 携带 token
  let token = localStorage.getItem('token');
  if (token && configUrl !== '/login') {
    token = tool.decAse192(token, 'token');
    config.headers.token = token;
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
  return response
}, error => {
  store.commit('closeLoading');

  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        Toast.error({ message: "登陆失效, 请重新登陆" });
        window.location.href = loginUrl;
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

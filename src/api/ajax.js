/*
 * @Description: 封装axios
 * @Author: shenah
 * @Date: 2019-09-25 15:57:26
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-12 10:24:36
 */

import Qs from "qs";
import tool from "@static/js/tool";
import axios from "axios";
import Toast from "muse-ui-toast";
import bridge from '../../static/js/JSbridge'
import store from '../vuex/store'
import storage from "@static/js/storage";
const CODE_SUCCESS = 0;
const CODE_FAIL_LOGIN = 302; // 登录失效或者token过期
const NO_VIEW_RECORD_PERMISSION = 403;
const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};
const instance = axios.create({
  withCredentials: true,
  timeout: 5000
});

let token_GJ = store.state.token_GJ;

/*----------------------请求拦截----------------------*/
instance.interceptors.request.use(
  config => {
    // console.log("token_GJ:",accessToken_GJ);

    tool.openLoading();
    // 参数序列化
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      const type = config.headers["Content-Type"];
      if (type && type.indexOf("json") > -1) {
        config.data = JSON.stringify(config.data);
      } else if (type && type.indexOf("form-data") > -1) {
      } else {
        config.data = Qs.stringify(config.data);
      }
    }
    // console.log('app-JS')
    if(!store.state.crmToGroup){
      // console.log('app-JS-crmToGroup: ',store.state.crmToGroup)
      // 携带 token
      let loginObj = tool.decUserInfo("login");
      let accessToken = loginObj.accessToken;

      if (accessToken && config.url !== "/login") {
        config.headers.accessToken = accessToken;
        // console.log('app-JS-accessToken: ',accessToken)
      }
      // console.log('headers-Token-1:',config.headers.accessToken)
      
    }else{
      let url = `/${config.url.substring(config.url.lastIndexOf("/")+1)}`;
      // console.log('token_GJ - 1:',store.state.token_GJ)
      if (store.state.token_GJ && url !== "/authorization") {
        // config.headers.accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoidXNlcmNlbnRyZV8iLCJ1c2VyX25hbWUiOiI3MDEiLCJzY29wZSI6WyJzZXJ2ZXIiXSwiZXhwIjoxNTg4NTQyNTE5LCJ1c2VySWQiOjcwMSwiYXV0aG9yaXRpZXMiOlsiVVNFUkNFTlRSRUFQUExJQ0FUSU9OVFlQRTpTIiwiUk9MRV9VU0VSIl0sImp0aSI6Ijg4NDRkZDBhLWU2MDEtNDZhNS05MjkzLWU0ZGMxYjU5ZDY2YyIsImNsaWVudF9pZCI6Indzb3JkZXIiLCJ1c2VybmFtZSI6IjcwMSJ9.5bvJIO2tJ-7ogB4mTS1Ohh1C0cq3KiefaGhe2nw86s8";
        config.headers.accessToken = store.state.token_GJ;
        // console.log('headers-Token-2:',config.headers.accessToken)
      }
      
    }
    
    return config;
  },
  error => {
    Toast.error({
      message: "加载超时"
    });
    tool.closeLoading();
    return Promise.reject(error);
  }
);
/*----------------------响应拦截----------------------*/
instance.interceptors.response.use(
  response => {
    tool.closeLoading();
    return response;
  },
  error => {
    tool.closeLoading();
    if (error && error.response) {
      switch (error.response.status) {
        case CODE_FAIL_LOGIN:
          localStorage.clear();
          // console.log('响应-1 :',store.state.crmToGroup);
          if(!store.state.crmToGroup) window.location.href = `${window.location.protocol}//${window.location.host}/#/login`;
          break;
        case NO_VIEW_RECORD_PERMISSION:
          Toast.warning({
            message: "您无权访问该页面"
          });
          setTimeout(()=>{
            if(!store.state.crmToGroup){
              window.history.go(-1);
            }else{
              bridge.callHandler("returnBack", null, null);
            }
          },500)
          
          break;
        default:
      }
    }
    return Promise.reject(error);
  }
);
const request = ({
  url,
  params,
  headers = {},
  method = METHODS.GET,
  server = "service",
  extraFileParams
}) => {
  let httpUrl = window.config[server] + url;
  function checkCode(res) {
      return new Promise((resolve, reject) => {
        if (res.code === CODE_SUCCESS) {
          resolve(res);
        } else {
          if (res.code === CODE_FAIL_LOGIN) {
            Toast.error({
              message: "token过期,或者没有登录"
            });
            
            // console.log('响应-2 :',store.state.crmToGroup);
            if(!store.state.crmToGroup){
              tool.signOut();
            }else{
              localStorage.removeItem("login");
              setTimeout(()=>{
                bridge.callHandler("loginOut", null, null); // 调用原生回到登陆页面
              },1000);
            }
            
            if(!store.state.crmToGroup){
              const ipHost = `${window.location.protocol}//${window.location.host}`;
              window.location.href = `${ipHost}#/login`;
            }
          } else if (res.code === NO_VIEW_RECORD_PERMISSION) {
            Toast.error({
              message: "您没有权限访问"
            });
            setTimeout(()=>{
              if(!store.state.crmToGroup){
                window.history.go(-1);
              }else{
                bridge.callHandler("returnBack", null, null);
              }
            },500)
          } else if (res.msg) {
            Toast.error({
              message: res.msg
            });
          } else {
            Toast.error({
              message: `code:${res.code}`
            });
          }
          reject(res);
        }
      });
  }
  if (method === METHODS.GET) {
    return instance
      .get(httpUrl, { params: params })
      .then(res => checkCode(res.data));
  } else if (method === METHODS.POST) {
    return instance
      .post(httpUrl, params, {
        headers,
        onUploadProgress: progressEvent => {
          let complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          if (extraFileParams) {
            extraFileParams.progress.progressNum = complete;
          }
        }
      })
      .then(res => checkCode(res.data));
  }
};
const post = ({ url, params, headers, server, extraFileParams }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.POST,
    extraFileParams
  });
export const get = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.GET
  });
export default post;

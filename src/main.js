// import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex/store";

// UI 框架
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
Vue.use(MuseUI);

import options from "@static/js/options"; //Message, Toast 配置

import Message from "muse-ui-message"; //消息
Vue.use(Message);
Message.config(options.message);

import Toast from "muse-ui-toast"; //提示
Vue.use(Toast);
Toast.config(options.toast);

Vue.config.productionTip = false; //阻止启动控制台消息提示

import api from "./api/api"; //api接口
Vue.prototype.api = api;

import apiMethods from './api/apiMethods'; //api方法
Vue.prototype.apiMethods = apiMethods;

import mixins from "@/api/mixins"; //vue混入
Vue.mixin(mixins);

import tool from "@static/js/tool"; //常用 工具函数库
Vue.prototype.tool = tool;

import storage from "@static/js/storage"; //sessionStorage localStorage 封装库
Vue.prototype.storage = storage;

import dayjs from "dayjs"; //日期库
Vue.prototype.dayjs = dayjs;

import AlloyFinger from "alloyfinger"; //手势库
import AlloyFingerPlugin from "alloyfinger/vue/alloy_finger_vue";
Vue.use(AlloyFingerPlugin, { AlloyFinger });

// 解决移动端 click 300ms 延迟
import FastClick from "fastclick";
//FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

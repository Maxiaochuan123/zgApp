/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2020-03-30 11:07:58
 * @LastEditors: shenah
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex/store";
// import fastclick from "fastclick";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import Toast from "muse-ui-toast";
import options from "@static/js/options";
import Message from "muse-ui-message";
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import Loading from "muse-ui-loading";

Vue.use(MuseUI);
Vue.use(Toast);
Toast.config(options.toast);
Vue.use(Message);
Message.config(options.message);
Vue.use(Loading);
// fastclick.attach(document.body);

import mixins from "@static/js/mixins";
Vue.mixin(mixins);

import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;

Vue.config.productionTip = false;
import storage from "@static/js/storage";
Vue.prototype.storage = storage;

import api from "./api/api";
Vue.prototype.api = api;

import apiMethods from './api/apiMethod';
Vue.prototype.apiMethods = apiMethods;

import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
Vue.use(preview);

import AlloyFinger from "alloyfinger";
import AlloyFingerPlugin from "alloyfinger/vue/alloy_finger_vue";

Vue.use(AlloyFingerPlugin, {
  AlloyFinger
});
// const prefix = `${window.location.protocol}//${window.location.host}/api`;
const prefix = `${window.location.protocol}//${window.location.host}/mock`; // mocksever数据
window.config = {
  service: prefix
};
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

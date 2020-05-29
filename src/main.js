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

import mixins from "@/api/mixins";
Vue.mixin(mixins);

import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;

import tool from "@static/js/tool";
Vue.prototype.tool = tool;

Vue.config.productionTip = false;
import storage from "@static/js/storage";
Vue.prototype.storage = storage;

import api from "./api/api";
Vue.prototype.api = api;

import apiMethods from './api/apiMethods';
Vue.prototype.apiMethods = apiMethods;

import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
Vue.use(preview);

import AlloyFinger from "alloyfinger";
import AlloyFingerPlugin from "alloyfinger/vue/alloy_finger_vue";

Vue.use(AlloyFingerPlugin, {
  AlloyFinger
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

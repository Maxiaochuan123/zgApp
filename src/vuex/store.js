import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    crmToGroup: false, // 是否嵌入 集团 APP
    token_GJ: "", //管家跳转crm所需 token
    otherApp: "", //是否第三方 app 用于顶级路由返回判断
    bottomNav: "home" // 当前点击的底部页签
  },
  mutations: {
    // 设置数据
    setList: (state, obj) => {
      let { type, data } = obj;
      state.dataSet[type] = data;
    },
    // 改变 是否第三方APP 跳转 状态
    setCrmToGroup: (state, data) => {
      state.crmToGroup = data;
    },
    // 跳转管家的token
    setToken_GJ: (state, data) => {
      state.token_GJ = data;
    },
    // 设置 是否第三方 app
    setOtherApp: (state, data) => {
      state.otherApp = data;
    },

    // 基础方法
    setBottomNav: (state, data) => (state.bottomNav = data),
  }
});

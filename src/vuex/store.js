/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 14:09:01
 * @LastEditTime: 2020-03-30 15:08:54
 * @LastEditors: shenah
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dictionaries: {}, // 字典
    dataSet: {
      // 数据的结合
      lendPlatform: [] // 放款平台
    },
    crmToGroup: false, // 是否嵌入 集团 APP
    token_GJ: "", //管家跳转crm所需 token
    otherApp: "", //是否第三方 app 用于顶级路由返回判断
    accessToken: "", // token
    authorities: {
      crm: {
        customer: {}, // 客户
        pool: {}, // 公海
        contacts: {}, // 联系人
        leads: {} //线索
      },
      work: {
        task: {} // 任务
      }
    }, // 作者的权限
    loginUser: {}, // 登录者的信息
    bottomNav: "home" // 当前点击的底部页签
  },
  mutations: {
    // 设置字典
    setDic: (state, data) => {
      state.dictionaries = data;
    },
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
    // 登录的token
    setToken: (state, data) => {
      const { accessToken } = data;
      state.accessToken = accessToken;
    },
    // 根据token获取当前的登录信息
    setUser: (state, data) => {
      state.loginUser = data;
    },
    // 根据token获取当前用户的权限
    setAuthor: (state, data) => {
      state.authorities = data;
    }
  }
});

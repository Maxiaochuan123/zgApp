import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false, //页面全局loading
  
    searchInputValue: "", //搜索框数据
    customerInfoBtn: "", //用于显示客户信息按钮
    pageSource: "", //页面来源

    routeData: {}, //路由参数
  },
  mutations: {
    // 框架
    showLoading: state => state.loading = true,
    closeLoading: state => state.loading = false,

    // 页面
    setSearchInputVal: (state, data) => { state.searchInputValue = data },
    setCustomerInfoBtn: (state, data) => { state.customerInfoBtn = data },
    setPageSource: (state, data) => { state.pageSource = data },

    // 设置公共数据
    setCompany: (state, data) => { state.company = data },
    setLendingPlatform: (state, data) => { state.lendingPlatform = data },
    setRepaymentState: (state, data) => { state.repaymentState = data },

    // 设置路由参数
    setRouteData: (state, data) => { state.routeData = data }
  }
});

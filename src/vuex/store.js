import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false, //页面全局loading
    moreBox: "", //列表元素
    currentMoreBoxScrollTop: 0, //当前列表滚动位置
    searchInputValue: "", //搜索框数据
    customerInfoBtn: "", //用于显示客户信息按钮
    pageSource: "", //页面来源

    routeData: {}, //路由参数
  },
  mutations: {
    // 框架
    showLoading: state => state.loading = true,
    closeLoading: state => state.loading = false,

    // 设置滚动条位置
    setMoreBox: (state, data) => state.moreBox = data,
    setCurrentMoreBoxScrollTop: state => state.currentMoreBoxScrollTop = state.moreBox.scrollTop,
    setMoreBoxScrollTop: (state, data = "default") => {
      if (data === "reset") {
        state.moreBox.scrollTop = 0;
        state.currentMoreBoxScrollTop = 0;
      } else {
        state.moreBox.scrollTop = state.currentMoreBoxScrollTop;
      }
    },

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

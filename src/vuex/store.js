// import Vue from "vue";
// import Vuex from "vuex";
import storage from "@static/js/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false, //页面全局loading
    moreBox: "", //列表元素
    loanBox: "", //还款计划元素
    currentMoreBoxScrollTop: 0, //当前列表滚动位置
    currentLoanBoxScrollTop: 0, //当前还款计划列表滚动位置
    searchInputValue: "", //搜索框数据
    screenState: false, //筛选状态
    pageSource: "", //页面来源
    pageControl: {}, //页面权限
    activeBtn: "", //当前点击按钮名称 (对应权限中字段名)
    routeData: {}, //路由参数

    // 筛选栏下拉列表数据
    companyList: [], //公司
    lendingPlatformList: [], //放款平台
    personLiableList:[], //责任人
    repaymentState: [], //还款状态
    projectState: [], //项目状态
    collectionStatus: [], //催收状态
  },
  mutations: {
    // 框架
    showLoading: state => state.loading = true,
    closeLoading: state => state.loading = false,

    // 设置列表滚动条位置
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
    
    // 设置还款计划滚动条位置
    setLoanBox: (state, data) => state.loanBox = data,
    setCurrentLoanBoxScrollTop: state => {
      state.currentLoanBoxScrollTop = state.loanBox.scrollTop
    },
    setLoanBoxScrollTop: (state, data = "default") => {
      if (data === "reset") {
        state.loanBox.scrollTop = 0;
        state.currentLoanBoxScrollTop = 0;
      } else {
        state.loanBox.scrollTop = state.currentLoanBoxScrollTop;
      }
    },

    // 筛选栏
    setScreenState: (state, data) => { state.screenState = data },

    // 页面
    setSearchInputVal: (state, data) => { state.searchInputValue = data },
    setPageSource: (state, data) => { state.pageSource = data },

    // 权限
    setPageControl: (state, data) => { state.pageControl = data },
    setActiveBtn: (state, data) => { state.activeBtn = data },

    // 设置公共数据
    setScreenList: (state, data) => { 
      let { company, lendingPlatform, personLiable, repaymentState, projectState, collectionStatus} = {...data};
      state.companyList = filterList(company, "name");
      state.lendingPlatformList = filterList(lendingPlatform, "name");
      state.personLiableList = filterList(personLiable, "userName");
      state.repaymentState = [{ "name": "不限", "code": "" }, ...repaymentState || []];
      state.projectState = [{ "name": "不限", "code": "" }, ...projectState || []];
      state.collectionStatus = [{ "name": "不限", "code": "" }, ...collectionStatus || []];
     },
    setLendingPlatform: (state, data) => { state.lendingPlatform = data },
    setRepaymentState: (state, data) => { state.repaymentState = data },

    // 设置路由参数
    setRouteData: (state, data) => { state.routeData = data }
  }
});

// 过滤列表
let filterList = (data = [], field) => {
  return data.map(item => {
    return item[field]
  })
}
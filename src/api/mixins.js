// 日期处理
import dayjs from "dayjs";

// 工具函数
import tool from "@static/js/tool";

// 存储
import storage from "@static/js/storage";

// 原生通讯
// import bridge from "./JSbridge";

// 菜单
import menu from '@static/js/menu'

import store from "@/vuex/store";

export default {
  data() {
    return {
      // 用户信息
      userInfo: storage.localGet("userInfo"),

      // dialog
      dialogState: false,

      // 按钮状态
      btnLoading: false,
      btnDisabled: false,

      // picker 底部选择器
      pickerTitle: "",
      pickerList: [],

      // 侧边栏
      drawerState: false,

      // tabs 当前选中项
      tabsActive: 0,
      
       //网络状态
      // networkState: false,

      // 列表数据
      listData: [],

      // 数据获取失败
      dataError: false,

      // paging 分页
      paging: {
        pageSize: 10,
        pageIndex: 1
      },

      // 上拉加载 or 下拉刷新
      loadUpdate: {
        refreshing: false,
        loading: false,
        loadingState: "default",
        loadedAll: false
      },

      screenData: {}, //筛选数据

      menu: menu, //菜单

      // uploadPrefix: `${window.location.protocol}//${window.location.host}/`, // 图片,附件 路径前缀 (线上部署替换)
      uploadPrefix: 'http://192.168.0.92:8900/', // 图片,附件 路径前缀 (本地调试用)

      company: this.storage.localGet("company"), //公司
      lendingPlatform: this.storage.localGet("lendingPlatform"), //放款平台
      repaymentState: this.storage.localGet("repaymentState"), //还款状态
      projectState: this.storage.localGet("projectState"), //项目状态
      personLiable: this.storage.localGet("personLiable"), //责任人
      strategy: this.storage.localGet("strategy"), //策略
      followUp: this.storage.localGet("followUp"), //跟进类型
    };
  },
  computed: {
    // 列表按钮文字
    listBtnText() {
      switch (store.state.pageSource) {
        case "compensatory":
          return '代偿明细';

        default:
          return '还款计划';
      }
    },
    // 明细按钮文字
    detailedBtnText() {
      switch (store.state.pageSource) {
        case "compensatory":
          return '回款明细';

        default:
          return '还款明细';
      }
    },

    // 路由 其他参数
    routeData(){
      return store.state.routeData;
    },

    companyList() { //公司列表
      return this.company.map(item => {
        return item.name
      })
    },
    lendingPlatformList() { //放款平台列表
      return this.lendingPlatform.map(item => {
        return item.name
      })
    },
    personLiableList() { //责任人列表
      return this.personLiable.map(item => {
        return item.userName
      })
    }
  },
  methods: {
    // 下拉刷新 handle
    refreshHandle() {
      this.paging.pageIndex = 1;
      this.loadUpdate.refreshing = true;
      this.listData = [];
      this.loadUpdate.loadingState = "refresh";
    },
    // 上拉加载 handle
    loadHandle() {
      this.paging.pageIndex = ++this.paging.pageIndex;
      this.loadUpdate.loading = true;
      this.loadUpdate.loadingState = "load";
    },
    // 筛选栏 重置列表状态
    resetListHandle() {
      window.scrollTo(0, 0);
      this.loadUpdate.loadedAll = false;
      this.paging.pageIndex = 1;
      this.listData = [];
      this.loadUpdate.loadingState = "default";
    },

    // 返回第几页
    goBack(index = -1) {
      this.$router.go(index);
    },
    // 跳转页面
    goPage(linkName, params = {}, routeData) {
      this.$router.push({
        name: linkName,
        params
      });

      if (routeData){
        this.$store.commit("setRouteData", routeData)
      }
    },

    // 侧边栏
    openDrawerState() {
      this.drawerState = true;
    },
    closeDrawerState() {
      this.$parent.$parent.drawerState = false;
    },

    // 打电话
    dial(phoneNumber) {
      // if (!store.state.crmToGroup) {
        window.location.href = `tel:${phoneNumber}`;
      // } else {
      //   bridge.callHandler('callPhone', { phone: phoneNumber });
      // }
    },
  },
  filters: {
    // 金额千分号
    formatThousandBit(num) {
      if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
        return num;
      }
      const a = RegExp.$1;
      let b = RegExp.$2;
      const c = RegExp.$3;
      const re = new RegExp().compile("(\\d)(\\d{3})(,|$)");
      while (re.test(b)) b = b.replace(re, "$1,$2$3");
      return `${a}${b}${c}`;
    },
    // 日期格式化
    formatDate(timeStamp, type) {
      if (type === "date") {
        return dayjs(timeStamp).format("YYYY-MM-DD");
      }
      return dayjs(timeStamp).format("YYYY/MM/DD HH:mm:ss");
    },
    
    // 参数空处理 unit:单位
    paramsError(val, unit, showUnit=true) {
      let formatThousandBit = num => {
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
          return num;
        }
        const a = RegExp.$1;
        let b = RegExp.$2;
        const c = RegExp.$3;
        const re = new RegExp().compile("(\\d)(\\d{3})(,|$)");
        while (re.test(b)) b = b.replace(re, "$1,$2$3");
        return `${a}${b}${c}`;
      }
      if (val){
        if (unit){
          if (unit === '元') {
            if (showUnit){
              return `${formatThousandBit(val)}${unit}`
            }else{
              return `${formatThousandBit(val)}`
            }
          } else {
            return `${val}${unit}`
          }
        }else{
          return `${val}`
        }
      }else{
        return '一 一';
      }
    },

    // 字符串日期分割 并添加 -    : 20200507 => 2020-05-07
    // dateSlice(dateStr){
    //   return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
    // }

  }
};

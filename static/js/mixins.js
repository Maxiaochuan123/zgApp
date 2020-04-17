// 验证
import Rules from "./rules";
// 日期处理
import dayjs from "dayjs";
// 工具函数
import tool from "./tool";

// 存储
import storage from "./storage";

// 原生通讯
import bridge from "./JSbridge";

// 菜单
import menu from '../js/menu'

import store from "../../src/vuex/store";

export default {
  data() {
    return {
      // dialog
      dialogState: false,

      // btnLoading
      btnLoading: false,

      // picker 底部选择器
      pickerTitle: "",
      pickerList: [],

      // 侧边栏
      drawerState: false,

      // 跳转页面参数
      goPageParams:{},

      // tabs 当前选中项
      tabsActive: storage.sessionGet("tabsActive"),

      // paging 分页
      paging: {
        pageSize: 7,
        pageIndex: 1
      },

      // 上拉加载 or 下拉刷新
      loadUpdate: {
        refreshing: false,
        loading: false,
        loadingState: "default",
        loadedAll: false
      },

      screenData: {name:'zs'}, //筛选数据

      menu: menu //菜单
    };
  },
  methods: {
    // 下拉刷新 handle
    refreshHandle() {
      this.paging.pageIndex = 1;
      this.loadUpdate.refreshing = true;
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
      this.loadUpdate.loadingState = "default";
    },
    // tabs切换 handle
    // changeTabsHandle(activeTag) {
    //   window.scrollTo(0, 0);
    //   this.paging.pageIndex = 1;
    //   this.list = [];
    //   this.storage.sessionSet("tabsActive", activeTag);
    //   this.$refs.screen.resetDrawerList();
    // },

    // 返回第几页
    goBack(index = -1) {
      this.$router.go(index);
    },
    // 跳转页面
    goPage(linkName, params = {}, query = {}) {
      this.$router.push({
        name: linkName,
        params,
        query
      });
    },
    // 打电话
    dial(phoneNumber) {
      if (!store.state.crmToGroup) {
        window.location.href = `tel:${phoneNumber}`;
      } else {
        bridge.callHandler("callPhone", { phone: phoneNumber });
      }
    },

    // Dialog
    openDialog() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.dialogState = true;
        } else {
          this.$toast.warning("请将 必填 信息补充完整");
        }
      });
    },
    isEmptyObj(obj) {
      // 是否是空对象
      return JSON.stringify(obj) === "{}";
    },
    // 加载加载图片防止打包后图片的路径不对
    loadingImg(imgName) {
      return require(`../images/${imgName}`);
    },

    // 侧边栏
    openDrawerState() {
      this.drawerState = true;
    },
    closeDrawerState() {
      this.$parent.$parent.drawerState = false;
    }
  },
  filters: {
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
    formatDate(timeStamp, type) {
      if (type === "date") {
        return dayjs(timeStamp).format("YYYY-MM-DD");
      }
      return dayjs(timeStamp).format("YYYY/MM/DD HH:mm:ss");
    },
    formatCurrency_wan(money) {
      return tool.formatCurrency_wan(money);
    }
  }
};

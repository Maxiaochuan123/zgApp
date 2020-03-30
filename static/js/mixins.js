// 验证
import Rules from "./rules";
// 日期处理
import dayjs from "dayjs";
// 工具函数
import tool from "./tool";

// 存储
import storage from "./storage";

// 原生通讯
import bridge from "./JSbridge"

import store from '../../src/vuex/store'

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

      screenData:{}, //筛选数据

      // 验证
      myRules: {
        must: (mes, type) => this.must(mes, type),
        userName: [
          { validate: val => !!val, message: "必须填写用户名" },
          {
            validate: val => Rules.name.test(val),
            message: "必须是 2 ~ 10 位汉字姓名"
          }
        ],
        phone: [
          { validate: val => !!val, message: "必须填写手机号" },
          {
            validate: val => Rules.phone.test(val),
            message: "手机号格式不正确"
          }
        ],
        email: [
          {
            validate: val =>
              this.noRequired(val, this.myRules.email[0], "邮箱格式不正确")
          }
        ]
      }
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
    // 获取筛选 handle
    getApiParamsHandle() {
      window.scrollTo(0, 0);
      this.loadUpdate.loadedAll = false;
      this.paging.pageIndex = 1;
      this.loadUpdate.loadingState = "default";
    },
    // tabs切换 handle
    changeTabsHandle(item) {
      window.scrollTo(0, 0);
      this.paging.pageIndex = 1;
      this.list = [];
      this.storage.sessionSet("tabsActive", item);
      this.$refs.screen.resetDrawerList();
    },

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
    // 覆盖前面的跳转
    goReplacePage(linkName, params = {}, query = {}) {
      this.$router.replace({
        name: linkName,
        params,
        query
      });
    },
    // 打电话
    dial(phoneNumber) {
      if(!store.state.crmToGroup){
        window.location.href = `tel:${phoneNumber}`;
      }else{
        bridge.callHandler('callPhone', {phone:phoneNumber});
      }
    },

    // 非必填 验证函数
    noRequired(val, item, errorMessage) {
      if (val.length > 0) {
        if (!Rules.email.test(val)) {
          item.message = errorMessage;
          return false;
        } else {
          item.message = "";
          return true;
        }
      } else {
        item.message = "";
        return true;
      }
    },
    // 只有一个必填
    must(mes, type) {
      let error = `必须填写${mes}`;
      if (type === "select") {
        error = `必须选择${mes}`;
      } else if (type === "image") {
        error = `必须上传${mes}`;
      }
      return [
        {
          validate: val => !!val,
          message: error
        }
      ];
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
    closeDialog() {
      this.$refs.form.clear();
      for (let item in this.form) {
        if (this.form[item]) {
          this.form[item] = "";
        }
      }
      this.dialogState = false;
    },
    toFormData(form = {}) {
      // 变成formdata的形式
      let formdata = new FormData();
      Object.keys(form).forEach(item => {
        formdata.append(item, form[item]);
      });
      return formdata;
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
    formatDate(timeStamp, type) {
      if (type === "date") {
        return dayjs(timeStamp).format("YYYY-MM-DD");
      }
      return dayjs(timeStamp).format("YYYY/MM/DD HH:mm:ss");
    },
    formatCurrency_wan(money) {
      return tool.formatCurrency_wan(money);
    },
    emptyText(val, text) {
      // 先判断是否为对象
      if (!val) {
        return text || "";
      } else if (Array.isArray(val) && val.length === 0) {
        return text || "";
      } else if (JSON.parse(JSON.stringify(val)) === "{}") {
        return text || "";
      }
      return val;
    },
    codeInToName(value, list) {
      // 对应的编码转化成name
      if (!Array.isArray(list)) {
        return "";
      }
      if (value !== null) {
        const array = list.filter(item => item.value === value)[0];
        if (array) {
          return array.label;
        }
        return "";
      }
      return "";
    }
  }
};

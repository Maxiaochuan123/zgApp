// import Vue from "vue";
// import Router from "vue-router";
import store from "@/vuex/store";
import tool from '@static/js/tool'
import { controlInit } from "@static/js/control";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    // basics 基础页面
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@views/login/login.vue")
    }, {
      path: "/retrievePassword",
      name: "retrievePassword",
      component: () => import("@views/login/retrievePassword.vue")
    }, {
      path: "/userDetails",
      name: "userDetails",
      component: () => import("@views/login/userDetails.vue")
    }, {
      path: "/home",
      name: "home",
      component: () => import("@views/home/home.vue")
    }, {
      path: "/mailList",
      name: "mailList",
      component: () => import("@views/home/mailList.vue")
    }, {
      path: "/todoList",
      name: "todoList",
      component: () => import("@views/home/todoList.vue")
    }, {
      path: "/myInfo",
      name: "myInfo",
      component: () => import("@views/home/myInfo.vue")
    },

    /************************************** 公共页面组件 **************************************/
    // 写跟进
    {
      path: "/writeFollowup/",
      name: "writeFollowup",
      meta: { zIndex: 1 },
      component: () => import("../components/basics/WriteFollowup.vue")
    },
    // 还款明细
    {
      path: "/repayment/detailed/:orderId/:orderNo/:periodsIndex",
      name: "detailed",
      component: () => import("../components/card/Detailed.vue")
    },
    // 还款计划
    {
      path: "/repayment/plan/:orderId",
      name: "plan",
      component: () => import("../components/page/plan.vue")
    },
    // 资料归档
    {
      path: "/dataArchiving/archiving/:id/:state",
      name: "archiving",
      component: () => import("../views/repaymentTracking/dataFiling/archiving.vue")
    },
    
    // 客户信息
    {
      path: "/collection/customerInfo/:id",
      name: "customerInfo",
      component: () => import("../views/beOverdueCollection/call/customerInfo.vue")
    },
    // 新增补充信息
    {
      path: "/collection/customerInfo/addSupplementInfo/:id",
      name: "addSupplementInfo",
      component: () => import("../views/beOverdueCollection/call/addSupplementInfo.vue")
    },
    // 个人信息
    {
      path: "/mailList/personalInfo",
      name: "personalInfo",
      component: () => import("../components/page/personalInfo.vue")
    },
    // 更改策略
    {
      path: "/overdue/changeStrategy",
      name: "changeStrategy",
      component: () => import("../components/page/changeStrategy.vue")
    },
    // 转派
    {
      path: "/overdue/selectUser",
      name: "selectUser",
      component: () => import("../components/page/selectUser.vue")
    },
    // 回款
    {
      path: "/overdue/payment",
      name: "payment",
      component: () => import("../components/page/payment.vue")
    },
    
    /************************************** 列表 **************************************/

    // 还款列表
    {
      path: "/list/repayment",
      name: "repayment",
      meta: { keepAlive: true },
      component: () => import("../views/list/repayment.vue")
    },
    // 逾期列表
    {
      path: "/list/overdue",
      name: "overdue",
      meta: { keepAlive: true },
      component: () => import("../views/list/overdue.vue")
    },
    // 代偿列表
    {
      path: "/list/compensatory",
      name: "compensatory",
      meta: { keepAlive: true },
      component: () => import("../views/list/compensatory.vue")
    },
    // 资料归档
    {
      path: "/list/dataArchiving",
      name: "dataArchiving",
      meta: { keepAlive: true },
      component: () => import("../views/list/dataArchiving.vue")
    },

    // 电话催收
    {
      path: "/list/phone",
      name: "phone",
      meta: { keepAlive: true },
      component: () => import("../views/list/phone.vue")
    },
    // 业务催收
    {
      path: "/list/business",
      name: "business",
      meta: { keepAlive: true },
      component: () => import("../views/list/business.vue")
    },
    // 外勤催收
    {
      path: "/list/visit",
      name: "visit",
      meta: { keepAlive: true },
      component: () => import("../views/list/visit.vue")
    },
    // 全员催收
    {
      path: "/list/all",
      name: "all",
      meta: { keepAlive: true },
      component: () => import("../views/list/all.vue")
    },
    // 待催收列表
    {
      path: "/list/collection",
      name: "collection",
      meta: { keepAlive: true },
      component: () => import("../views/list/collection.vue")
    },
    // 其他
    {
      path: "/loanCalculate",
      name: "loanCalculate",
      component: () => import("../views/other/loanCalculation/loanCalculate.vue")
    }
  ]
});

// 解决路由报错 Error↵ at new NavigationDuplicated
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

let control = controlInit(); // 权限字段

// 嵌入 APP token
let appToken = tool.getUrlKey('appToken') || '';
let otherApp = tool.getUrlKey('otherApp') || false

router.beforeEach( (to, from, next) => {
  if (localStorage.getItem("token") || appToken) {
    
    next();

    // 需要控制的页面
    let listPages = ["repayment", "overdue", "compensatory", "phone", "business", "visit", "all", "collection"];
    
    //设置当前页面权限
    if (listPages.includes(to.name)) {
      store.commit('setPageControl', control[to.name])
    }

  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;

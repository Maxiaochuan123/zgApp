/*
 * @Author: your name
 * @Date: 2020-04-18 11:03:44
 * @LastEditTime: 2020-04-18 16:02:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zgApp\src\router\index.js
 */
import Vue from "vue";
import Router from "vue-router";
import store from "../vuex/store";
import storage from "../../static/js/storage";
Vue.use(Router);

const router = new Router({
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
      meta: { keepAlive: true },
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
      path: "/repayment/detailedCard/:id",
      name: "detailedCard",
      component: () => import("../components/card/Detailed.vue")
    },
    // 还款计划
    {
      path: "/repayment/plan/:orderId/:customerInfoBtn?",
      name: "plan",
      meta: { keepAlive: false },
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
    // 更改策略c
    {
      path: "/overdue/changeStrategy",
      name: "changeStrategy",
      component: () => import("../components/page/changeStrategy.vue")
    },
    // 个人信息
    {
      path: "/mailList/personalInfo",
      name: "personalInfo",
      component: () => import("../components/page/personalInfo.vue")
    },
    
    /************************************** 列表 **************************************/

    // 还款列表
    {
      path: "/list/repayment",
      name: "repayment",
      meta: { keepAlive: false },
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
      meta: { keepAlive: false },
      component: () => import("../views/list/compensatory.vue")
    },


    // 代偿列表
    // 资料归档
    {
      path: "/dataArchiving/dataArchivingList",
      name: "dataArchivingList",
      component: () => import("../views/list/dataArchiving.vue")
    },

    // 电话催收
    {
      path: "/dataArchiving/phoneCollectionList",
      name: "phoneCollectionList",
      component: () => import("../views/list/phoneCollection.vue")
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
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
  next();
});
export default router;

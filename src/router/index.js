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
      component: () => import("../views/basics/login/login.vue")
    }, {
      path: "/retrievePassword",
      name: "retrievePassword",
      component: () => import("../views/basics/login/retrievePassword.vue")
    }, {
      path: "/userDetails",
      name: "userDetails",
      component: () => import("../views/basics/login/userDetails.vue")
    }, {
      path: "/home",
      name: "home",
      component: () => import("../views/basics/home/home.vue")
    }, {
      path: "/mailList",
      name: "mailList",
      component: () => import("../views/basics/home/mailList.vue")
    }, {
      path: "/todoList",
      name: "todoList",
      component: () => import("../views/basics/home/todoList.vue")
    }, {
      path: "/myInfo",
      name: "myInfo",
      component: () => import("../views/basics/home/myInfo.vue")
    },

    /************************************** 公共页面组件 **************************************/
    // 写跟进
    {
      path: "/writeFollowup/:id/:type",
      name: "writeFollowup",
      meta: { zIndex: 1 },
      component: () => import("../components/basics/WriteFollowup.vue")
    },
    // 还款明细
    {
      path: "/repayment/detailedCard/:id",
      name: "detailedCard",
      component: () => import("../components/template/repayment/DetailedCard.vue")
    },
    // 还款计划
    {
      path: "/repayment/plan/:id/:customerInfoBtn?",
      name: "plan",
      component: () => import("../components/template/repayment/Plan.vue")
    },
    // 资料归档
    {
      path: "/dataArchiving/archiving/:id/:state",
      name: "archiving",
      component: () => import("../components/template/dataArchiving/Archiving.vue")
    },
    
    // 客户信息
    {
      path: "/collection/customerInfo/:id",
      name: "customerInfo",
      component: () => import("../components/template/collection/CustomerInfo.vue")
    },
    // 新增补充信息
    {
      path: "/collection/customerInfo/addSupplementInfo/:id",
      name: "addSupplementInfo",
      component: () => import("../components/template/collection/AddSupplementInfo.vue")
    },
    
    /************************************** 还款跟踪 **************************************/

    // 还款列表
    {
      path: "/repayment/repaymentList",
      name: "repaymentList",
      component: () => import("../views/repayment/repaymentList.vue")
    },
    
    

    // 逾期列表
    // 代偿列表
    // 资料归档
    {
      path: "/dataArchiving/dataArchivingList",
      name: "dataArchivingList",
      component: () => import("../views/dataArchiving/dataArchivingList.vue")
    },

    // 电话催收
    {
      path: "/dataArchiving/phoneCollectionList",
      name: "phoneCollectionList",
      component: () => import("../views/collection/phoneCollectionList.vue")
    },

    // 其他
    {
      path: "/loanCalculate",
      name: "loanCalculate",
      
      component: () => import("../views/other/loanCalculate.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  // if (localStorage.getItem("login")) {
  //   next();
  // } else {
  //   if (to.path == "/login") {
  //     next();
  //   } else {
  //     storage.localRemove("login");
  //     next("/login");
  //   }
  // }
  next();
});
export default router;

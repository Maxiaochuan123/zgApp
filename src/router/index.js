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
      component: () => import("../views/basics/login.vue")
    }, {
      path: "/retrievePassword",
      name: "retrievePassword",
      component: () => import("../views/basics/retrievePassword.vue")
    }, {
      path: "/home",
      name: "home",
      component: () => import("../views/basics/home.vue")
    }, {
      path: "/mailList",
      name: "mailList",
      component: () => import("../views/basics/mailList.vue")
    }, {
      path: "/todoList",
      name: "todoList",
      component: () => import("../views/basics/todoList.vue")
    }, {
      path: "/myInfo",
      name: "myInfo",
      component: () => import("../views/basics/myInfo.vue")
    },

    /************************************** 公共页面组件 **************************************/

    // 还款明细
    {
      path: "/repayment/detailedCard/:id",
      name: "detailedCard",
      component: () => import("../components/template/repayment/DetailedCard.vue")
    },
    // 还款计划
    {
      path: "/repayment/plan/:id",
      name: "plan",
      component: () => import("../components/template/repayment/Plan.vue")
    },
    // 资料归档
    {
      path: "/dataArchiving/archiving/:id",
      name: "archiving",
      component: () => import("../components/template/dataArchiving/Archiving.vue")
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

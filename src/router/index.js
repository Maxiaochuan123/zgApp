/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditors: shenah
 */
import Vue from "vue";
import Router from "vue-router";
import store from "../vuex/store";
import storage from "../../static/js/storage";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("../views/basics/pageTransition.vue"),
      children: [
        {
          path: "/",
          redirect: "/home"
        },
        // basics 基础页面
        {
          path: "/login",
          name: "login",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/login.vue")
        },
        {
          path: "/retrievePassword",
          name: "retrievePassword",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/retrievePassword.vue")
        },
        {
          path: "/home",
          name: "home",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/home.vue")
        },
        {
          path: "/mailList",
          name: "mailList",
          meta: {
            zIndex: 0
          },
          component: () => import("../views/basics/mailList.vue")
        },
        {
          path: "/todoList",
          name: "todoList",
          meta: {
            zIndex: 0
          },
          component: () => import("../views/basics/todoList.vue")
        },
        {
          path: "/myInfo",
          name: "myInfo",
          meta: {
            zIndex: 0
          },
          component: () => import("../views/basics/myInfo.vue")
        },


        // 还款管理
        {
          path: "/repayManage",
          name: "repayManage",
          meta: { zIndex: 0 },
          component: () => import("../views/repayment/repayManage.vue")
        },
        // 还款明细
        {
          path: "/repayPlan/:id",
          name: "repayPlan",
          meta: { zIndex: 0 },
          component: () => import("../views/repayment/repayPlan.vue")
        },
        // 其他
        {
          path: "/loanCalculate",
          name: "loanCalculate",
          meta: { zIndex: 0 },
          component: () => import("../views/other/loanCalculate.vue")
        }
      ]
    }
  ]
});
const crmToGroup = store.state.crmToGroup;
if (!crmToGroup) {
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
}
export default router;

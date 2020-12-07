<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    
    <router-view v-if="!$route.meta.keepAlive" />

    <Loading v-if="loading" />

    <BottomNav/>
  </div>
</template>

<script>
import Loading from '@components/basics/Loading'
import BottomNav from "@components/basics/BottomNav";
import Theme from "muse-ui/lib/theme";
// import VConsole from "vConsole";
import { mapState, mapMutations } from "vuex";
// import axios from 'axios'
import storage from '@static/js/storage';
export default {
  components: {
    Loading, BottomNav
  },
  methods: {
    ...mapMutations(["setScreenList"]),
  },
  mounted() {
    let otherApp = this.tool.getUrlKey('otherApp') || false;

    if(otherApp){
      let _this = this;

      axios.all ([this.api.company(), this.api.lendingPlatform(), this.api.repaymentState(), this.api.projectState(), this.api.collectionStatus(), this.api.personLiable(), 
      this.api.strategy(), this.api.followUp(), this.api.accessControl()])
      .then(axios.spread(function (data1, data2, data3, data4, data5, data6, data7, data8, data9) {

        // 设置  storage 数据
        storage.localSet("company", data1.data); //公司
        storage.localSet("lendingPlatform", data2.data); //放款平台
        storage.localSet("personLiable", data6.data); //责任人
        
        storage.localSet("strategy", data7.data); //策略类型
        storage.localSet("followUp", data8.data); //跟进类型
        storage.localSet("control", data9.data); //权限
        
        // 设置 vuex 侧边筛选栏数据
        _this.setScreenList({
          company:data1.data, 
          lendingPlatform:data2.data, 
          personLiable:data6.data,
          repaymentState:data3.data,
          projectState:data4.data,
          collectionStatus:data5.data,
        })
      }))
    }

    // 设置主题色
    Theme.add("theme", {primary: "#EC191F"}, "light");
    Theme.use("theme");
  },
  computed: {
    ...mapState(["loading","moreBox"])
  },
  watch: {
    $route(to, from) {
      if(to.path.includes("list")){
        if(from.name === "home" || from.name === "todoList"){
          to.meta.keepAlive = false;
        }
        if(from.name === "plan"){
          to.meta.keepAlive = true;
        }
      }
    }
  },
};
</script>

<style lang="less">
@import url("~@static/css/resetMuseUI.less");
@import url("~@static/css/public.less");
* {
  margin: 0px;
  padding: 0px;
}
#app::-webkit-scrollbar {
  width: 0;
  display: none;
}
body {
  padding-top: constant(safe-area-inset-top); //为导航栏+状态栏的高度 88px
  padding-left: constant(safe-area-inset-left); //如果未竖屏时为0
  padding-right: constant(safe-area-inset-right); //如果未竖屏时为0
  padding-bottom: constant(safe-area-inset-bottom); //为底下圆弧的高度 34px
}
@media only screen and (width: 375px) and (min-height: 690px) {
  body {
    height: 100vh;
  }
}
</style>
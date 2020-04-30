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
import { mapState } from "vuex";
export default {
  components: {
    Loading, BottomNav
  },
  created() {
    // new VConsole();
    // 设置主题色
    Theme.add("theme_one", {primary: "#EC191F"}, "light");
    Theme.use("theme_one");
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>

<style lang="less">
@import url("../static/css/resetMuseUI.less");
@import url("../static/css/public.less");
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
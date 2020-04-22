<template>
  <div id="app">
    <router-view />

    <BottomNav v-if="showBotNav && !crmToGroup" />
  </div>
</template>

<script>
import BottomNav from "./components/basics/BottomNav";
import Theme from "muse-ui/lib/theme";
import myTheme from "@static/json/myTheme.json";
import VConsole from "vConsole";
import tool from "@static/js/tool.js";
import Cookies from "js-cookie";
import { mapState, mapMutations } from "vuex";
import { promise } from "ora";
export default {
  components: {
    BottomNav
  },
  data() {
    return {
      showBotNav: true
    };
  },
  created() {

    // 设置当前选中 TAB 项
    if(!this.storage.sessionGet('tabsActive')) this.storage.sessionSet('tabsActive',0);

    // 设置主题色
    Theme.add("theme_one", {primary: "#EC191F"}, "light");
    Theme.use("theme_one");
  },
  watch: {
    $route(to, from) {
      // 恢复 TAB 默认项
      // if(to.path == '/home'){
      //   this.storage.sessionSet('tabsActive',1);
      // }
      // console.log('to:',to.name,'from:',from.name)
      
      if (to.path == "/home" || to.path == "/mailList" || to.path == "/todoList" || to.path == "/myInfo") {
        this.$store.commit("setBottomNav", to.path.split("/")[1]); // 设置 bottomNav 选中项
        this.showBotNav = true;
      } else {
        this.showBotNav = false;
      }
    }
  },
  computed: {
    ...mapState(["crmToGroup"])
  },
  methods: {
    
  }
};
</script>

<style lang="less">
@import url("../static/css/resetMuseUI.less");
@import url("../static/css/public.less");
@import url("../static/css/loading.less");
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
<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2020-03-30 11:46:32
 * @LastEditors: shenah
 -->
<template>
  <div id="app">
    <!-- <keep-alive v-if="$route.meta.keepAlive"> -->
    <router-view />
    <!-- </keep-alive> -->

    <!-- <router-view v-if="!$route.meta.keepAlive"/> -->

    <BottomNav v-if="showBotNav && !crmToGroup" />
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav";
import Theme from "muse-ui/lib/theme";
import myTheme from "../static/json/myTheme.json";
import VConsole from "vConsole";
import tool from "../static/js/tool.js";
import Api from "@api";
import Cookies from "js-cookie";
import { mapState, mapMutations } from "vuex";
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
    // 查询字典
    this.queryDic();
    // new VConsole();

    let otherApp = tool.getUrlKey("otherApp");
    const userObj = tool.decUserInfo();

    if (otherApp) {
      this.$store.commit("setCrmToGroup", true);
      this.$store.commit("setOtherApp", true);
    } else {
      this.$store.commit("setCrmToGroup", false);
      this.$store.commit("setOtherApp", false);
    }

    if (this.crmToGroup) {
      console.log("yes");
      let systemt = tool.getSystem();
      // let token_GJ = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoidXNlcmNlbnRyZV8iLCJ1c2VyX25hbWUiOiI3MDEiLCJzY29wZSI6WyJzZXJ2ZXIiXSwiZXhwIjoxNTg4NTUyMTA5LCJ1c2VySWQiOjcwMSwiYXV0aG9yaXRpZXMiOlsiVVNFUkNFTlRSRUFQUExJQ0FUSU9OVFlQRTpTIiwiUk9MRV9VU0VSIl0sImp0aSI6IjkwMGYyOWVkLTk2ZWMtNGJhZS1hNTI2LTExMzNkZmExNDE3ZCIsImNsaWVudF9pZCI6Indzb3JkZXIiLCJ1c2VybmFtZSI6IjcwMSJ9.SIzCXj9tbzaO8cCJHOijU2_fRH7v9AkA92hGRTtAACQ";
      let token_GJ = Cookies.get("token");
      this.$store.commit("setToken_GJ", token_GJ);
      this.api
        .onlyLogin({ accessToken: token_GJ, source: systemt })
        .then(res => {
          // 接受原生传递的 参数 区分 是否 第三方 APP 跳转

          // console.log("otherApp:",otherApp);

          // console.log("crmToGroup:",this.crmToGroup);
          if (userObj.accessToken || otherApp) {
            this.$store.commit("setToken", userObj);
            // this.queryLoginRight();
            // this.queryUser();
          }
        });
      // console.log("token_GJ:",token_GJ);
    }

    let activTheme = this.storage.localGet("theme");
    if (activTheme) {
      Theme.add("theme_one", activTheme, "light");
      Theme.use("theme_one");
    } else {
      this.storage.localSet("theme", myTheme[0]);
      Theme.add("theme_one", myTheme[0], "light");
      Theme.use("theme_one");
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/home" || to.path == "/myInfo") {
        this.$store.commit("setBottomNav", to.path.split("/")[1]);
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
    ...mapMutations(["setToken_GJ", "setCrmToGroup", "setOtherApp"]),
    // 查询字典
    queryDic() {
      return Api.queryDictionaries().then(res => {
        this.$store.commit("setDic", res.data);
      });
    },
    queryLoginRight() {
      return Api.getAuthorByToken().then(res => {
        this.$store.commit("setAuthor", res.data);
      });
    },
    queryUser() {
      return Api.getCurrentUserByToken().then(res => {
        this.$store.commit("setUser", res.data);
      });
    }
  }
};
</script>

<style lang="less">
@import url("../static/css/resetAmap.less");
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
<template>
  <div class="bottom-nav" v-if="showBotNav">
    <mu-bottom-nav :value.sync="bottomNav" color="primary">
      <mu-bottom-nav-item value="home" title="首页" icon=":iconfont iconshouye" to="/home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mailList" title="通讯录" icon=":iconfont icontongxunlu" to="/mailList"></mu-bottom-nav-item>
      <!-- <mu-bottom-nav-item value="todoList" title="待办" icon=":iconfont icondaiban" to="/todoList"></mu-bottom-nav-item> -->
      <mu-bottom-nav-item value="myInfo" title="我的" icon=":iconfont iconwode" to="/myInfo"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  name: "bottom-nav",
  data() {
    return {
      showBotNav: true,
      bottomNav: ""
    };
  },
  created () {
    // this.bottomNav = "home";
    // this.$router.push("home");
  },
  watch: {
    $route(to, from) {
      if (to.path == "/home" || to.path == "/mailList" || to.path == "/todoList" || to.path == "/myInfo") {
        this.showBotNav = true;
        this.bottomNav = to.name;
        this.$router.push(to.name);
      } else {
        this.showBotNav = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .bottom-nav{
    width: 100vw;
    height: 50px;
    position: fixed;
    bottom: 0;
    box-shadow:0px 16px 23px 0px rgba(159,159,159,1);

    .iconfont{
      font-size: 30px;
    }
  }
</style>

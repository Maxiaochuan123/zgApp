<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-09-03 18:12:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bottom-nav">
    <mu-bottom-nav :value.sync="bottomNav" color="primary" @change="navChange">
      <mu-bottom-nav-item value="home" title="首页" icon=":iconfont iconshouye" to="/home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="myInfo" title="我的" icon=":iconfont icon-wode" to="/myInfo"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  name: "bottom-nav",
  data() {
    return {

    };
  },
  computed:{
    bottomNav:{
      get(){
        return this.$store.state.bottomNav
      },
      set(data){
        this.$store.commit('setBottomNav',data);
      }
    }
  },
  methods:{
    navChange(val){
      this.$store.commit('setBottomNav',val)
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

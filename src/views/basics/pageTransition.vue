<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 20:58:12
 * @LastEditTime: 2019-09-01 11:09:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 基础路由 -->
  <!-- <router-view/> -->

  <!-- 路由缓存 -->
  <!-- <div> -->
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
    
    <!-- <router-view v-if="!$route.meta.keepAlive"/>
  </div> -->

  <!-- 路由缓存 + 路由动画 -->
  <!-- <transition :name="transitionName">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    
    <router-view :class="isHome ? 'child-view' : ''" v-if="!$route.meta.keepAlive"/>
  </transition> -->
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left",
      isHome: false
    };
  },
  created () {
    if(!this.storage.sessionGet('tabsActive')) this.storage.sessionSet('tabsActive',0);
  },
  watch:{
    $route(to, from){
      if(to.path == '/home'){
        this.storage.sessionSet('tabsActive',0);
      }
      if((to.path == '/home' || to.path == '/myInfo') && (from.path == '/home' || from.path == '/myInfo')){
        this.isHome = false;
      }else{
        this.isHome = true;
        if(to.meta.zIndex < from.meta.zIndex){
          this.transitionName = "slide-left";
        }else{
          this.transitionName = "slide-right";
        }
      }
    }
  }
};
</script>
<style lang="less">

    .child-view {
      position: absolute;
      width: 100%;
      transition: all .1s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(50px, 0);
      transform: translate(50px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-50px, 0);
      transform: translate(-50px, 0);
    }

  // .slide-left-enter,
  // .slide-right-leave-active {
  //   opacity: 0;
  //   -webkit-transform: translate(100%, 0);
  //   transform: translate(100%, 0);
  // }

  // .slide-left-leave-active,
  // .slide-right-enter {
  //   opacity: 0;
  //   -webkit-transform: translate(-50%, 0);
  //   transform: translate(-50% 0);
  // }
</style>

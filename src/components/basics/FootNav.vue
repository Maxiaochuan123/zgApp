<template>
  <div class="foot-nav topShadow">
    <div @click="writeFollowUp" class="nav-item" v-if="writeFlag" >
      <img src="@static/images/buttom-write-follow.png" />
      <div class="text">写跟进</div>
    </div>
    <div @click="dial(routeData.phone)" class="nav-item" v-if="callFlag" >
      <img src="@static/images/assign.png" />
      <div class="text">打电话</div>
    </div>
  </div>
</template>

<script>
// 原生通讯
export default {
  name: "FootNav",
  components: {},
  data() {
    return {};
  },
  props: {
    writeFlag:{
      type: Boolean
    },
    callFlag:{
      type: Boolean,
      default: true
    }
  },
  methods: {
    writeFollowUp(){
      this.goPage("writeFollowup");
    }
  }
};
</script>
<style lang='less' scoped>
  .foot-nav {
    display: flex;
    width: 100%;
    background-color: #fff;
    padding: 0 10px;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    position: fixed;
    bottom: 0;
    height: 87px;
    z-index: 100;
    .nav-item {
      display: flex;
      margin: 6px 10px 6px 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        position: relative;
        width: 40px;
        height: 40px;
      }
      .text {
        padding-top: 4px;
        font-size: 14px;
        color: @primary-text;
      }
    }
  }
</style>
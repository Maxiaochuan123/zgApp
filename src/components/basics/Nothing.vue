<!--
 * noData => 暂无数据
 * dataError => 数据获取失败
 * noNetwork => 暂无网络
 * @Author: shenah
 -->
<template>
  <div class="nothing" v-if="showNothing">
    <div class="no">
      <img :src="loadImage(`${imgType}.png`)" class="bc-img" />
      <div class="text">{{words || describe}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nothing",
  props: {
    // type: {
    //   type: String, 
    //   default: "noData"
    // },
    words: {
      type: String,
      default: "暂无数据"
    }
  },
  computed: {
    showNothing(){
      if(this.listData.length == 0 || this.departmentList.length == 0  || this.dataError){
        return true;
      }else{
        return false;
      }
    },
    imgType(){
      if(this.listData.length == 0 || this.departmentList.length == 0){
        return "noData"
      }else if(this.dataError){
        return "dataError"
      }
    },
    describe(){
      if(this.listData.length == 0){
        return "暂无数据"
      }else if(this.departmentList.length == 0){
        return "无子部门"
      }else if(this.dataError){
        return "获取数据失败"
      }
    }
  },
  // mounted() {
  //   window.ononline=()=>{
  //     this.networkState = true;
  //     this.$toast.success("网络已恢复")
  //   }
  //   window.onoffline=()=>{
  //     this.networkState = false;
  //     this.$toast.error("网络连接中断")
  //   }
  // },
};
</script>
<style lang='less' scoped>
.nothing {
  width: 100%;
  height: 100%;
  .no {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .bc-img {
      width: 254px;
      height: 254px;
    }
    .text {
      font-size: @primary-size;
      color: @primary-text;
      text-align: center;
    }
  }
}
</style>
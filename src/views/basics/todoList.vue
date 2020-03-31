<template>
  <div class="todoList">
    <div class="header">待办事项</div>
    <div class="functionalArea">
        <div class="fncBlock">
          <div>
            <img src="../../../static/images/archived.png">
            <span>待归档</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
        <div class="fncBlock">
          <div>
            <img src="../../../static/images/toBeAudited.png">
            <span>垫款待审核</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
        <div class="fncBlock">
          <div>
            <img src="../../../static/images/toBeCollected.png">
            <span>待派单</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
        <div class="fncBlock">
          <div>
            <img src="../../../static/images/waitingList.png">
            <span>待催收</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="less" scoped>
  .todoList{
    .header{
      height: 44px;
      line-height: 44px;
      color: @primary-text;
      font-size: 18px;
      text-align: center;
      background-color: #fff;
    }
    .functionalArea{
      margin-top: 12px;
      padding: 0 16px;
      background-color: #fff;
      position: relative;

      .fncBlock{
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
          display: flex;
          align-items: center;
          img{
            width: 40px;
            height: 40px;
          }
          span{
            font-size: 16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            margin-left: 10px;
            color: @primary-text;
            font-size: @primary-size;
          }
        }
      }
    }
  }
</style>

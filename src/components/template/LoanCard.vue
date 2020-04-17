<template>
  <div class="BasicCard">
    <div class="header">
      <div class="phase">1期</div>
      <div class="repaymentState">
        <div><span>2,526.52</span><span>应还金额(元)</span></div>
        <!-- <span><span>正常</span><span>还款行为</span></div> -->
        <div><span class="primaryColor">8</span><span class="primaryColor">逾期天数(天)</span></div>
        <div><mu-button flat @click="goPage('detailedCard')">还款明细</mu-button></div>
      </div>
    </div>
    <div :class="['middle', status ? 'foldAnimation' : '']">
      <div class="itemBox">
        <div class="item"><span>本期还款金额</span> <span>2,526.52元</span></div><div class="item"><span>应还日期</span> <span>2020/2/5</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>剩余应还金额</span> <span>80,000.00元</span></div><div class="item"><span>实际还款日期</span> <span>2020/2/5</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>本金</span> <span>10,854,78</span></div><div class="item"><span>利息</span> <span>80,000,00</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>罚息</span> <span>0元</span></div><div class="item"><span>违约金</span> <span>0元</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>还款状态</span> <span>已还款</span></div><div class="item"><span>还款行为</span> <span>正常</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>还款方式</span> <span>第三方代扣</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>公司</span> <span>贵州公司</span></div>
      </div>
    </div>
    <div class="foot" @click="status = !status">
      <img :src="status ? '../static/images/arrowUpper.png' : '../static/images/arrowLower.png' ">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status:false
    }
  },
}
</script>

<style lang="less" scoped>
  .BasicCard{
    background-color: #fff;
    padding: 12px 20px 0;
    &:not(:first-child){
      margin-top: 12px;
    }
    
    .primaryColor{
      color: @primary !important;
    }
    .header{
      // display: flex;
      // justify-content: space-between;
      // font-weight:400;
      // padding-bottom: 12px;
      // border-bottom: 1px solid @primary-border;
      // span:nth-child(2){
      //   font-weight:500;
      // }
      .phase{
        font-weight:400;
      }
      .repaymentState{
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid @primary-border;
        // border-bottom: 1px solid @primary-border;
        
        >div{
          display: flex;
          // direction: ;
          justify-content: center;
          flex-direction: column;
          align-content: space-between;
          // align-items: center;
          &:nth-child(2){
            margin-left: 10px;
          }
          span{
            text-align: center;
            &:first-child{
              font-size: @primary-size;
              font-weight: bold;
              padding-bottom: 4px;
            }
            &:last-child{
              color: @regular-text;
            }
          }
        }
        .mu-button{
          border-radius: 6px;
          color: @primary-text;
          border: 1px solid #9F9F9F;
          height: 30px;
        }
      }
    }
    .foldAnimation{
      height: 100% !important;
      padding: 12px 0 0;
      border-top: 1px solid @primary-border;
    }
    
    .middle{
      height: 0;
      overflow: hidden;
      color: @regular-text;
      
      .itemBox{
        display: flex;
        margin-bottom: 10px;
        .item{
          width: 50%;
          display: flex;
          span{
            display: inline-block;
          }
          span:nth-child(1){
            width: 80%;
            text-align: right;
            margin-right: 10px;
          }
          span:nth-child(2){
            width: 70%;
            color: @primary-text;
            text-align: left;
            word-wrap:break-word;
            white-space:normal;
          }
        }
      }
    }
    .foot{
      padding-bottom: 6px;
      display: flex;
      justify-content: center;
      img{
        width: 18px;
      }
    }
  }
</style>

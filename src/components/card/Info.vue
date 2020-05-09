<template>
  <div class="infoCard">
    <div class="header">
      <span>{{ infoData.name | paramsError }}</span> <mu-button flat @click="goPage('customerInfo',{id:333})" v-if="$route.params.customerInfoBtn">客户信息</mu-button>
    </div>
    <div :class="['middle', status ? 'foldAnimation' : '']">
      <div class="itemBox">
        <div class="item"><span>身份证号</span> <span>{{infoData.cardId | paramsError}}</span></div><div class="item"><span>手机号</span> <span>{{infoData.phone | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>贷款金额</span> <span>{{infoData.orderSourceAmount | paramsError('元')}}</span></div><div class="item"><span>应还总金额</span> <span>{{infoData.repaymentTotalAmount | paramsError('元')}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>已还总金额</span> <span>{{infoData.readyRepaymentAmount | paramsError('元')}}</span></div><div class="item"><span>剩余应还金额</span> <span>{{infoData.surplusRepaymentAmount | paramsError('元')}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>贷款周期</span> <span>{{infoData.periodsCount | paramsError('期')}}</span></div><div class="item"><span>贷款时间</span> <span>{{infoData.orderStartDate | paramsError}} - {{infoData.orderEndDate | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>每月还款日</span> <span>{{infoData.repaymentDay | paramsError('号')}}</span></div><div class="item"><span>放款日期</span> <span>{{infoData.fundingLoanDate | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>还款卡号</span> <span>{{infoData.repaymentNo | paramsError}}</span></div><div class="item"><span>放款平台</span> <span>{{infoData.platformName | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>公司</span> <span>{{infoData.organizationName | paramsError}}</span></div><div class="item" v-if="type == '逾期' || type == '代偿' || type == '催收'"><span>逾期阶段</span> <span>{{num | paramsError}}</span></div>
      </div>
      <div v-if="type == '逾期' || type == '代偿' || type == '催收'">
        <div class="itemBox">
          <div class="item"><span>当前到期还款日</span> <span>{{num | paramsError}}</span></div><div class="item"><span>连续逾期天数</span> <span>{{num | paramsError('天')}}</span></div>
        </div>
        <div class="itemBox">
          <div class="item"><span>累计逾期次数</span> <span>{{num | paramsError('次')}}</span></div><div class="item" v-if="type == '代偿'"><span>当前代偿金额</span> <span>{{num | paramsError('元')}}</span></div>
        </div>
        <div class="itemBox" v-if="type == '代偿'">
          <div class="item"><span>累计代偿金额</span> <span>{{num | paramsError('元')}}</span></div><div class="item"><span>累计代偿次数</span> <span>{{num | paramsError('次')}}</span></div>
        </div>
      </div>
      
    </div>
    <div class="foot" @click="status = !status">
      <img :src="status ? '../../../../static/images/arrowUpper.png' : '../../../../static/images/arrowLower.png' ">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoData:{
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      status: true,
      type: '还款',
      num: '',
    }
  }
}
</script>

<style lang="less" scoped>
  .infoCard{
    background-color: #fff;
    padding: 12px 20px 0;
    &:not(:first-child){
      margin-top: 12px;
    }
    
    .primaryColor{
      color: @primary;
    }
    .header{
      display: flex;
      justify-content: space-between;
      font-weight:400;
      padding-bottom: 12px;
      border-bottom: 1px solid @primary-border;
      span{
        line-height: 2;
      }
      .mu-button{
        border-radius: 6px;
        color: @primary-text;
        border: 1px solid #9F9F9F;
        height: 30px;
      }
    }
    .foldAnimation{
      height: 100% !important;
    }
    
    .middle{
      height: 56px;
      overflow: hidden;
      padding: 12px 0 0;
      color: @regular-text;
      .itemBox{
        display: flex;
        margin-bottom: 12px;
        .item{
          width: 50%;
          display: flex;
          span{
            display: inline-block;
          }
          span:nth-child(1){
            width: 40%;
            text-align: right;
            margin-right: 10px;
          }
          span:nth-child(2){
            width: 56%;
            color: @primary-text;
            text-align: left;
            word-wrap:break-word;
            white-space:normal;
          }
        }
      }
    }
    .foot{
      height: 24px;
      padding-bottom: 6px;
      display: flex;
      justify-content: center;
      img{
        width: 18px;
      }
    }
  }
</style>

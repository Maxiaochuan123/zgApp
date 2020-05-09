<template>
  <div class="loanCard">
    <div class="header">
      <div class="phase">{{item.periodsIndex | paramsError('期')}}</div>
      <div class="repaymentState">
        <div><span>{{item.periodsTotalAmount | paramsError('元',false)}}</span><span>本期还款金额(元)</span></div>
        <div v-show="item.periodsRepaymentAction === '正常' "><span>{{item.periodsRepaymentAction}}</span><span>还款行为</span></div>
        <div v-show="item.periodsRepaymentAction === '逾期' "><span class="primaryColor">{{item.overdueDays}}</span><span class="primaryColor">逾期天数(天)</span></div>
        <div><mu-button flat disabled @click="goPage('detailedCard')">{{ detailedBtnText }}</mu-button></div>
      </div>
    </div>
    <div :class="['middle', status ? 'foldAnimation' : '']">
      <div class="itemBox">
        <div class="item"><span>本期还款金额</span> <span>{{item.periodsTotalAmount | paramsError('元')}}</span></div><div class="item"><span>应还日期</span> <span>{{item.periodsRepaymentDay | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>剩余应还金额</span> <span>{{routeData.totalSurplus | paramsError('元')}}</span></div><div class="item"><span>实际还款日期</span> <span>{{item.periodsRepaymentDate | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>本金</span> <span>{{(item.periodsPlatformBaseAmount+item.periodsFundingBaseAmount) | paramsError('元')}}</span></div><div class="item"><span>利息</span> <span>{{(item.periodsFundingInterestAmount+item.periodsPlatformInterestAmount) | paramsError('元')}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>罚息</span> <span>{{(item.periodsFundingPenaltyAmount+item.periodsPlatformPenaltyAmount) | paramsError('元')}}</span></div><div class="item"><span>违约金</span> <span>{{(item.periodsFundingFineAmount+item.periodsPlatformFineAmount) | paramsError('元')}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>还款状态</span> <span>{{item.periodsRepaymentStatusComment | paramsError}}</span></div><div class="item"><span>还款行为</span> <span>{{item.periodsRepaymentAction | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>还款方式</span> <span>{{item.periodsRepaymentModel | paramsError}}</span></div>
      </div>
      <div class="itemBox">
        <div class="item"><span>公司</span> <span>{{routeData.organizationName | paramsError}}</span></div>
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
    item:{
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      status:false
    }
  }
}
</script>

<style lang="less" scoped>
  .loanCard{
    background-color: #fff;
    padding: 12px 20px 0;

    &:not(:first-child){
      margin-top: 12px;
    }
    
    
    .primaryColor{
      color: @primary !important;
    }
    .header{
      .phase{
        font-weight:400;
        padding-bottom: 12px;
      }
      .repaymentState{
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid @primary-border;
        
        >div{
          display: flex;
          // direction: ;
          justify-content: center;
          flex-direction: column;
          align-content: space-between;
          // align-items: center;
          &:nth-child(2){
            margin-left: -16px;
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
          opacity: .2;
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
        margin-bottom: 12px;
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

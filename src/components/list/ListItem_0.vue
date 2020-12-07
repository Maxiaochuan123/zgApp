<template>
  <div class="listBox">
    <div ref="listItem" class="listItem" v-for="(item,index) in list" :key="index">
      <div class="header">
        <span>{{item.orderNo | paramsError}}</span> <span class="status primaryColor">
          <!-- 非待办 -->
          <span v-if="!todoWhiteList.includes(pageSource)">{{item.repaymentStateName | paramsError}}</span>
          <!-- 待办中的列表处理 -->
          <!-- 待催收 -->
          <span v-else-if="pageSource === 'collection' ">{{item.collectionCount > 0 ? `已催收 (${item.collectionCount}次)` : "未催收" | paramsError}}</span>
        </span>
      </div>
      <div class="content">
        <div class="itemBox">
          <div class="item"><span>{{item.name | paramsError}}</span> <span>{{item.phone | paramsError}}</span></div><div class="item"><span>还款卡号</span> <span>{{item.repaymentNo | paramsError}}</span></div>
        </div>
        <div class="itemBox">
          <div class="item"><span>应还总金额</span> <span>{{item.totalSurplus | paramsError('元')}}</span></div><div class="item"><span>到期还款日</span> <span>{{item.latelyRepaymentDate || item.repaymentDate | paramsError}}</span></div>
        </div>
        <div class="itemBox">
          <div class="item"><span>还款期数</span> <span>第{{item.periodsIndex | paramsError}}/{{item.periodsCount | paramsError}}期</span></div><div class="item"><span>本期应还</span> <span>{{item.amountPayable | paramsError('元')}}</span></div>
        </div>
      </div>
      <div class="bottom">
        <span class="updateTime">{{item.updateDate ? item.updateDate.split(" ")[0] : ''}} 更新</span>
        <!-- 非待办 -->
        <div v-if="!todoWhiteList.includes(pageSource)">
          <mu-button flat v-show="pageControl.searchBtn" @click="handler(item)">{{ listBtnText }}</mu-button>
        </div>
        <!-- 待办中的列表处理 -->
        <!-- 待催收 -->
        <div v-else-if="pageSource === 'collection' ">
          <mu-button flat @click="handler(item, '跟进记录')" v-show="pageControl.followupRecord">跟进记录</mu-button>
          <mu-button flat @click="handler(item, '跟进')" v-show="pageControl.followUp">跟进</mu-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
  props: {
    list:{
      type: Array,
      default: ()=>[]
    }
  },
  activated () {
    if(this.loanBox) this.setLoanBoxScrollTop("reset");
  },
  computed: {
    ...mapState(["loanBox", "pageSource"])
  },
  methods: {
    ...mapMutations(["setCurrentMoreBoxScrollTop", "setLoanBoxScrollTop", "setActiveBtn"]),

    handler(item, type){
      this.setCurrentMoreBoxScrollTop();

      // 非待办
      if(!this.todoWhiteList.includes(this.pageSource)){
        this.setActiveBtn("searchBtn");
        this.goPage('plan',{orderId:item.orderId},{...item});
      
      // 待办 - 待催收
      }else if(this.pageSource === "collection"){
        switch (type) {
          case "跟进记录":
            this.setActiveBtn("followupRecord");
            this.goPage('plan',{orderId:item.orderId},{...item});
            break;
          case "跟进":
            this.setActiveBtn("followup");
            this.goPage('writeFollowup',{},{...item});
            break;
        }
      }

    },
  }
}
</script>

<style lang="less" scoped>
.listBox{
  .listItem{
    margin-top: 12px;
    padding: 12px 20px;
    background-color: #fff;
    color: @primary-text;

    .primaryColor{
      color: @primary;
    }

    .header, .content, .itemBox{
      margin-bottom: 12px;
      background-color: #fff;
    }

    .header, .bottom, .itemBox{
      display: flex;
      justify-content: space-between;
    }

    .header{
      font-weight:400;
      span:nth-child(2){
        font-weight:500;
      }
    }

    .bottom{
      span{
        color: @regular-text;
        line-height: 30px;
      }
      .operation{
        display: flex;
        flex-direction: row-reverse;
        margin-left: 10px;
      }
    }
    .content{
      padding: 12px 0;
      // position: relative;
      border-top: 1px solid @primary-border;
      border-bottom: 1px solid @primary-border;
      color: @regular-text;
    }

    .itemBox{
      .item{
        width: 50%;
        display: flex;
        span{
          display: inline-block;
        }
        span:nth-child(1){
          width: 84px;
          text-align: right;
          margin-right: 10px;
        }
        span:nth-child(2){
          width: calc(100% - 84px);
          color: @primary-text;
          text-align: left;
          word-wrap:break-word;
          white-space:normal;
        }
      }
    }
    .mu-button{
      border-radius: 6px;
      color: @primary;
      border: 1px solid @primary;
      margin-left: 10px;
      min-width: 52px;
      height: 30px;
      font-weight:500;
    }
  }
}
</style>

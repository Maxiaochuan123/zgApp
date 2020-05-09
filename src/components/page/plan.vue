<template>
  <!-- 还款计划 -->
  <div class="plan">
    <AppBar pageTitle="还款计划" :occupyBtn="getMenuList.length > 0 ? false : true" :shadow="pageSource === 'repayment'" :menuList="getMenuList" @menuChange="menuChange"></AppBar>
    <div class="contentBox">
      <div :class="[pageSource !== 'repayment' ? tabsActive == 1 ? 'content-tabs followRecord' : 'content-tabs' : 'content-appBar']">
        <mu-tabs v-if="pageSource !== 'repayment'" :value.sync="tabsActive" inverse color="primary" indicator-color="primary" center>
          <mu-tab>基本信息</mu-tab>
          <mu-tab>跟进记录</mu-tab>
        </mu-tabs>
        <div class="basicInfo" v-show="tabsActive==0">
          <Info :infoData="infoData"></Info>
          <Loan v-for="(item,index) in loanInfoList" :key="index" :item="item"></Loan>
        </div>
        <div class="followUp" v-show="tabsActive==1">
          <FollowRecord :record="followUpRecord"></FollowRecord>
          <FootNav></FootNav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import Info from '@components/card/Info'
import Loan from '@components/card/Loan'
import FollowRecord from '@components/basics/FollowRecord'
import FootNav from '@components/basics/FootNav'
import { mapState } from 'vuex'
export default {
  components: {
    AppBar, Info, Loan, FollowRecord, FootNav
  },
  data() {
    return {
      route: this.$route.params,
      infoData:{},
      loanInfoList:[],
      followUpRecord:[]
    }
  },
  created () {
    // 获取借款人基础信息
    this.api.seeMainLoanPersonInfo({orderId:this.route.orderId}).then(res => {
      if(res.message === "success"){
        this.infoData = res.data;
      }else{
        this.$tost.error("数据加载失败")
      }
    })

    // 获取还款期数 及信息
    this.api.seeRepaymentStageNumInfo({orderId:this.route.orderId}).then(res => {
      if(res.message === "success"){
        this.loanInfoList = res.data;
      }else{
        this.$tost.error("数据加载失败")
      }
    })

    // 获取跟进记录
    this.api.seeFollowUpRecord({orderId:this.route.orderId}).then(res => {
      if(res.message === "success"){
        this.followUpRecord = res.data;
      }else{
        this.$tost.error("数据加载失败")
      }
    })
  },
  methods: {
    menuChange(item){
      
    }
  },
  computed: {
    ...mapState(["pageSource"]),

    getMenuList(){
      switch (this.pageSource) {
        case "repayment":
          return this.menu.repayment;

        case "overdue":
          return this.menu.overdue;

        default:
          return [];
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .followUp{
    height: 100%;
  }
</style>

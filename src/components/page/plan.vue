<template>
  <!-- 还款计划 -->
  <div class="plan">
    <AppBar :pageTitle="pageTitle" :occupyBtn="getMenuList.length > 0 ? false : true" :shadow="pageSource === 'repayment'" :menuList="getMenuList" @menuChange="menuChange"></AppBar>
    <div class="contentBox">
      <div ref="loanBox" :class="[pageSource !== 'repayment' ? tabsActive === 1 ? 'content-tabs followRecord' : 'content-tabs' : 'content-appBar']">
        <mu-tabs v-if="pageSource !== 'repayment'" :value.sync="tabsActive" @change="tabsChange" inverse color="primary" indicator-color="primary" center>
          <mu-tab>基本信息</mu-tab>
          <mu-tab>跟进记录</mu-tab>
        </mu-tabs>
        <div class="basicInfo" v-show="tabsActive === 0">
          <Info :infoData="infoData"></Info>
          <Loan v-for="(item,index) in loanInfoList" :key="index" :item="item"></Loan>
        </div>
        <div class="followUp" v-show="tabsActive === 1">
          <FollowRecord :record="followUpRecord"></FollowRecord>
          <FootNav :writeFlag="pageControl.followUp"></FootNav>
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
import { setMenu } from "@static/js/menu";
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    AppBar, Info, Loan, FollowRecord, FootNav
  },
  data() {
    return {
      route: this.$route.params,
      menu:{},
      infoData:{},
      loanInfoList:[],
      followUpRecord:[]
    }
  },
  watch: {
    loanInfoList:{
      handler(n,o){
        if(this.tabsActive === 0 && n.length > 0){
          setTimeout(() => this.setLoanBoxScrollTop());
        }
      }
    }
  },
  created () {
    this.menu = setMenu(this.pageControl);

    if(this.todoWhiteList.includes(this.pageSource)) this.tabsActive = 1;

    // 获取借款人基础信息
    this.api.seeMainLoanPersonInfo({orderId:this.route.orderId}).then(res => {
      if(res.message === "success"){
        this.infoData = res.data;
      }
    })

    // 获取还款期数 及信息
    this.api.seeRepaymentStageNumInfo({orderId:this.route.orderId}).then(res => {
      if(res.message === "success"){
        this.loanInfoList = res.data;
      }
    })

    // 获取跟进记录
    if(this.pageSource !== 'repayment'){
      this.api.seeFollowUpRecord({orderId:this.route.orderId}).then(res => {
        if(res.message === "success"){
          this.followUpRecord = res.data;
        }
      })
    }
  },
  mounted () {
    this.setLoanBox(this.$refs.loanBox);
  },
  methods: {
    ...mapMutations(["setLoanBox", "setLoanBoxScrollTop", "setActiveBtn"]),
    tabsChange(val){
      if(val === 1) this.setActiveBtn("followUp");
    },
    menuChange(item){
      console.log(item)
      // switch (item.title) {
      //   case "":
      //     break;
      
      //   default:
      //     break;
      // }
    }
  },
  computed: {
    ...mapState(["pageSource", "pageControl"]),

    pageTitle(){
      if(this.pageSource === "compensatory"){
        return "代偿明细";
      }else{
        if(this.todoWhiteList.includes(this.pageSource)){
          return "跟进记录"
        }else{
          return "还款计划";
        }
      }
    },

    getMenuList(){
      if(this.pageSource === "repayment"){
        return this.menu.repayment;
      }else if(this.pageSource === "overdue"){
        return this.menu.overdue;
      }else if(this.pageSource === "phone" || this.pageSource === "visit" || this.pageSource === "business" || this.pageSource === "all"){
        return this.menu.collection;
      }else if(this.pageSource === "compensatory"){
        return this.menu.compensatory;
      }else{
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

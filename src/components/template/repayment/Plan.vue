<template>
  <!-- 还款计划 -->
  <div class="plan">
    <AppBar pageTitle="还款计划" :menuList="menu.repayment"></AppBar>
    <div class="contentBox">
      <div class="content">
        <mu-tabs :value.sync="tabsActive" inverse color="primary" indicator-color="primary" center>
          <mu-tab>基本信息</mu-tab>
          <mu-tab>跟进记录</mu-tab>
        </mu-tabs>
        <div class="body">
          <div class="basicInfo" v-if="tabsActive==0">
            <InfoCard></InfoCard>
            <LoanCard></LoanCard>
          </div>
          <div class="followUp" v-if="tabsActive==1">
            <h1>followUp</h1>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AppBar from '@components/AppBar'
import InfoCard from '@components/template/repayment/InfoCard'
import LoanCard from '@components/template/repayment/LoanCard'

export default {
  components: {
    AppBar, InfoCard, LoanCard
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .plan{
    .contentBox{
      height: 100vh;
      overflow: hidden;
    }
    .content{
      height: 100vh;
      overflow-y: scroll;
      padding-bottom: 12px;

      .clueList{
        margin-top: 12px;
      }
      .mu-tabs{
        position: fixed;
        top: 44px;
        z-index: 9;
        border-top: 1px solid @primary-border;
        box-shadow: 0px 2px 6px 0px #ededed;
      }

      .body{
        margin-top: 96px;
        
      }
      
    }
  }
</style>

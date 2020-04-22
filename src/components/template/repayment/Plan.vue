<template>
  <!-- 还款计划 -->
  <div class="plan">
    <AppBar pageTitle="还款计划" :menuList="menu.repayment"></AppBar>
    <div class="contentBox">
      <div class="content-tabs">
        <mu-tabs :value.sync="tabsActive" inverse color="primary" indicator-color="primary" center>
          <mu-tab>基本信息</mu-tab>
          <mu-tab>跟进记录</mu-tab>
        </mu-tabs>
        <div class="basicInfo" v-if="tabsActive==0">
          <InfoCard></InfoCard>
          <LoanCard></LoanCard>
        </div>
        <div class="followUp" v-if="tabsActive==1">
          <FollowRecord :record="[]"></FollowRecord>
          <FootNav phoneNumber="13111866951" :linkParams="{id:route.id, type:'Plan'}"></FootNav>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import InfoCard from '@components/template/repayment/InfoCard'
import LoanCard from '@components/template/repayment/LoanCard'
import FollowRecord from '@components/basics/FollowRecord'
import FootNav from '@components/basics/FootNav'

export default {
  components: {
    AppBar, InfoCard, LoanCard, FollowRecord, FootNav
  },
  data() {
    return {
      route: this.$route.params
    }
  }
}
</script>

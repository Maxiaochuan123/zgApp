<template>
  <!-- 归档明细 -->
  <div class="Archiving">
    <AppBar pageTitle="归档明细" :menuList="menu.repayment"></AppBar>
    <div class="contentBox">
      <div class="content-tabs">
        <mu-tabs :value.sync="tabsActive" inverse color="primary" indicator-color="primary" center>
          <mu-tab>基本信息</mu-tab>
          <mu-tab>相关记录</mu-tab>
        </mu-tabs>

        <div class="basicInfo" v-if="tabsActive==0">
          <!-- 基础信息 -->
          <InfoCard></InfoCard>
          <!-- 编辑 -->
          <Edit v-if="route.state != 'alreadyFile' && route.state != 'alreadyBorrowing' && route.state != 'alreadyDestruction'"></Edit>
          <!-- 查看 -->
          <See v-else></See>
        </div>
        <div class="followUp" v-if="tabsActive==1">
          <h1>followUp</h1>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import InfoCard from '@components/template/dataArchiving/InfoCard'
import Edit from '@components/template/dataArchiving/Edit'
import See from '@components/template/dataArchiving/See'

export default {
  components: {
    AppBar, InfoCard, Edit, See
  },
  data () {
    return {
      route: this.$route.params
    }
  }
}
</script>

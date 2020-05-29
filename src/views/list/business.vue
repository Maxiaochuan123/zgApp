<template>
  <div class="businessList">
    <List pageTitle="业务催收" :drawerList="drawerList" listType="0"></List>
  </div>
</template>

<script>
import List from '@components/list/List'
export default {
  components: { List },
  data() {
    return {
      drawerList:{}
    }
  },
  created () {
    this.drawerList = {
      dateSwitch:{
        fileTitle:'更新日期',
        type:'date',
        val:[]
      },
      lendingPlatform:{
        fileTitle:'放款平台',
        type:'select',
        options:this.lendingPlatformList,
        val:''
      },
      company:{
        fileTitle:'所属公司',
        type:'select',
        options:this.companyList,
        val:''
      },
      personLiable:{
        fileTitle:'责任人',
        type:'select',
        options:this.personLiableList,
        val:''
      },
      repaymentState:{
        defaultValue:[],
        fileTitle:'还款状态',
        mode:'single',
        valueField:'code',
        labelField:'name',
        list:this.repaymentState
      },
    }
    this.$store.commit('setPageSource',"business");
  },
  activated () {
    this.$store.commit('setPageSource',"business");
  }
}
</script>

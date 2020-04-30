<template>
  <!-- 还款列表 -->
  <div class="repayment">
    <List pageTitle="还款列表" listType="0" :drawerList="drawerList"></List>
  </div>
</template>

<script>
import List from '@view/template/List'
export default {
  components: {
    List
  },
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
      projectState:{
        defaultValue:[],
        fileTitle:'项目状态',
        mode:'single',
        valueField:'code',
        labelField:'name',
        list:this.projectState
      },
    }
    this.$store.commit('setPageSource',"repayment");

    this.$store.commit('setCustomerInfoBtn',false);
  }
}
</script>
<template>
  <div class="allList">
    <List pageTitle="全员催收" :drawerList="drawerList" listType="0"></List>
  </div>
</template>

<script>
import { mapState } from "vuex"
import List from '@components/list/List'
export default {
  components: { List },
  data() {
    return {
      drawerList:{}
    }
  },
  computed: {
    ...mapState(["lendingPlatformList", "companyList", "personLiableList", "repaymentState"])
  },
  created () {
    this.$store.commit('setPageSource',"all");
  },
  activated () {
    this.$store.commit('setPageSource',"all");
  },
  mounted () {
    setTimeout(() => {
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
          defaultValue:[""],
          fileTitle:'还款状态',
          mode:'single',
          valueField:'code',
          labelField:'name',
          list:this.repaymentState
        },
      }
    }, 500);
  }
}
</script>

<template>
  <!-- 待催收列表 -->
  <div class="collection">
    <List pageTitle="待催收" listType="0" :drawerList="drawerList"></List>
  </div>
</template>

<script>
import List from '@components/list/List'
import { mapState } from "vuex"
export default {
  components: { List },
  data() {
    return {
      drawerList:{}
    }
  },
  computed: {
    ...mapState(["lendingPlatformList", "companyList", "collectionStatus"])
  },
  created () {
    this.$store.commit('setPageSource',"collection");
  },
  activated () {
    this.$store.commit('setPageSource',"collection");
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
        collectionStatus:{
          defaultValue:["UNCOLLECTED"],
          fileTitle:'催收状态',
          mode:'single',
          valueField:'code',
          labelField:'name',
          list:this.collectionStatus
        },
      }
    }, 500);
  }
}
</script>
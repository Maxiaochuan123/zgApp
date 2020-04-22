<template>
  <div class="phoneCollectionList">
    <List pageTitle="电话催收" :drawerList="drawerList" listType="0" pageSource="dataArchivingList"></List>
  </div>
</template>

<script>
import List from '@components/template/List'
export default {
  components: {
    List
  },
  data() {
    return {
      drawerList:{
        dateSwitch:{
          fileTitle:'更新日期',
          type:'month',
          val:[]
        },
        platform:{
          fileTitle:'放款平台',
          type:'select',
          options:['平台A', '平台B', '平台C', '平台D'],
          val:''
        },
        company:{
          fileTitle:'所属公司',
          type:'select',
          options:['公司A', '公司B', '公司C', '公司D'],
          val:''
        },
        personLiable:{
          fileTitle:'负责人',
          type:'select',
          options:['负责人A', '负责人B', '负责人C', '负责人D'],
          val:''
        },
        leadsSource:{
          defaultValue:['不限'],
          fileTitle:'还款状态',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'不限',
            state:false
          },{
            title:'未还款',
            state:false
          },{
            title:'已还款',
            state:false
          },{
            title:'已代偿',
            state:false
          },{
            title:'已回款',
            state:false
          },{
            title:'已回款(部分)',
            state:false
          }]
        },
      }
    }
  },
  created () {
    this.$store.commit('setCustomerInfoBtn',true)
  }
}
</script>

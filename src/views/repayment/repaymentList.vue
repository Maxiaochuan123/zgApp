<template>
  <!-- 还款列表 -->
  <div class="repaymentList">
    <List pageTitle="还款列表" :drawerList="drawerList" listType="0" pageSource="repaymentList"></List>
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
          type:'date',
          placeholder:'请选择日期',
          val:[]
        },
        select:{
          fileTitle:'放款平台',
          type:'select',
          placeholder:'请选择放款平台',
          options:['四川公司', '四川公司', '四川公司', '四川公司'],
          val:''
        },
        select2:{
          fileTitle:'所属公司',
          type:'select',
          placeholder:'请选择所属公司',
          options:['四川公司', '四川公司', '四川公司', '四川公司'],
          val:''
        },
        leadsSource:{
          defaultValue:['不限'],
          fileTitle:'状态',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'不限',
            state:false
          },{
            title:'还款中',
            state:false
          },{
            title:'已完成',
            state:false
          }]
        },
      }
    }
  },
  created () {
    this.$store.commit('setCustomerInfoBtn',false)
  }
}
</script>
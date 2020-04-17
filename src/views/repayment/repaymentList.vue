<template>
  <!-- 还款列表 -->
  <div class="repaymentList">
    <List :drawerList="drawerList" pageSource="repaymentList" goPageName="plan"></List>
  </div>
</template>

<script>
import List from '@components/template/List'
import Screen from "@components/Screen";
export default {
  components: {
    List,Screen
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
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .repaymentList{

  }
</style>

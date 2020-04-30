<template>
  <!-- 资料归档 -->
  <div class="dataArchivingList">
    <List pageTitle="资料归档" :drawerList="drawerList" listType="1"></List>
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
      drawerList:{
        dateSwitch:{
          fileTitle:'更新日期',
          type:'month',
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
            title:'待移交',
            state:false
          },{
            title:'移交驳回',
            state:false
          },{
            title:'待归档',
            state:false
          },{
            title:'已归档',
            state:false
          },{
            title:'已借阅',
            state:false
          },{
            title:'已销毁',
            state:false
          }]
        },
      }
    }
  },
  created () {
    this.$store.commit('setPageSource',"dataArchivingList");
  }
}
</script>

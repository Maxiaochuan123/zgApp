<!--
 * @Author: your name
 * @Date: 2020-04-18 11:03:44
 * @LastEditTime: 2020-04-19 10:42:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zgApp\src\components\template\List.vue
 -->
<template>
  <div class="list">
    <AppBar v-bind="$attrs" v-on="$listeners" guolv @getScreenParams="getScreenParams"></AppBar>
    <SearchInputBar placeholderText="搜索项目编号/客户姓名/手机号码" @searchInputBarChange="searchInputBarChange"></SearchInputBar>
    <div class="contentBox">
      <div class="content">
        <mu-load-more :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll">
          <ListItem_0 v-if="listType == '0'" v-on="$listeners" :listData="listData" @goPage="goPage('plan',$store.state.goPageParams)"></ListItem_0>
          <ListItem_1 v-if="listType == '1'" v-on="$listeners" :listData="listData_1" @goPage="goPage('archiving',$store.state.goPageParams)"></ListItem_1>
        </mu-load-more>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/AppBar'
import SearchInputBar from "@components/SearchInputBar";
import ListItem_0 from "@components/template/repayment/ListItem_0";
import ListItem_1 from "@components/template/dataArchiving/ListItem_1";
export default {
  components: {
    AppBar, SearchInputBar, ListItem_0, ListItem_1
  },
  props: {
    listType:{
      type:String,
      default:""
    },
    pageSource:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      listData:[
        {
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          phone:'13695872546',
          carId:'6211365998523',
          money:'90954.72',
          dateTime:'2020/04/03',
          qishu:'13/36',
          yinhuan:'2526.52',
          updateTime:'2019/9/6'
        }
      ],
      listData_1:[
        {
          num:'Z190215000049876',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },{
          num:'Z190215000049877',
          status:'还款中',
          name:'杜斯',
          dateTime:'2020/04/03',
        },
      ],
    }
  },
  created () {
    this.apiMethods.getListCallback(this,this.pageSource);
  },
  mounted () {
    
  },
  methods: {
    searchInputBarChange(val){
      // console.log(val)
      this.apiMethods.getListCallback(this,this.pageSource,"search");
    },
    getScreenParams(data){
      console.log(data)
      this.screenData = data;
      this.resetListHandle();
      this.apiMethods.getListCallback(this,this.pageSource,"screen");
    },
    // 下拉刷新
    refresh() {
      console.log('下拉刷新')
      this.refreshHandle();
      this.apiMethods.getListCallback(this,this.pageSource,"screen");
    },
    // 上拉加载
    load() {
      console.log('上拉加载')
      this.loadHandle();
      this.apiMethods.getListCallback(this,this.pageSource,"screen");
    },
  }
}
</script>

<style lang="less" scoped>
  .list{
    .contentBox{
      height: 100vh;
      overflow: hidden;
    }
    .content{
      height: calc(100vh - 104px);
      overflow-y: scroll;
      margin-top: 104px;
    }
  }
</style>

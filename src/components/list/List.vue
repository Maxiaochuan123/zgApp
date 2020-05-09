<template>
  <div class="list">
    <AppBar v-bind="$attrs" v-on="$listeners" guolv @getScreenParams="getScreenParams"></AppBar>
    <SearchInputBar placeholderText="搜索项目编号/客户姓名/手机号码" @searchInputBarChange="searchInputBarChange" @searchClose="searchClose"></SearchInputBar>
    <div class="contentBox">
      <div class="content-list" v-if="listData.length > 0 && !dataError">
        <mu-load-more :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll">
          <ListItem_0 v-if="listType == '0'" v-on="$listeners" :list="listData"></ListItem_0>
          <ListItem_1 v-if="listType == '1'" v-on="$listeners" :list="listData"></ListItem_1>
        </mu-load-more>
      </div>
      <Nothing></Nothing>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import SearchInputBar from "@components/basics/SearchInputBar";
import ListItem_0 from "@components/list/ListItem_0";
import ListItem_1 from "@components/list/ListItem_1";
import Nothing from "@components/basics/Nothing";
export default {
  components: {
    AppBar, SearchInputBar, ListItem_0, ListItem_1, Nothing
  },
  props: {
    listType:{
      type:String,
      default:""
    }
  },
  created () {
    this.apiMethods.getListCallback(this);
  },
  methods: {
    searchInputBarChange(val){
      this.apiMethods.getListCallback(this,"search");
    },
    searchClose(){
      this.apiMethods.getListCallback(this,"search");
    },
    getScreenParams(data){
      this.screenData = data;
      this.resetListHandle();
      this.apiMethods.getListCallback(this,"screen");
    },
    // 下拉刷新
    refresh() {
      this.refreshHandle();
      this.apiMethods.getListCallback(this,"screen");
    },
    // 上拉加载
    load() {
      this.loadHandle();
      this.apiMethods.getListCallback(this,"screen");
    },
  }
}
</script>

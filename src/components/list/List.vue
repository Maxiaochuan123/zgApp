<template>
  <div class="list">
    <AppBar ref="appbar" v-bind="$attrs" v-on="$listeners" guolv @getScreenParams="getScreenParams"></AppBar>
    <SearchInputBar placeholderText="搜索项目编号/客户姓名/手机号码" @searchInputBarChange="searchInputBarChange" @searchClose="searchClose"></SearchInputBar>
    <div class="contentBox">
      <div class="content-list" ref="moreBox">
        <mu-load-more v-if="listData.length > 0 && !dataError" :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll">
          <ListItem_0 v-if="listType == '0'" v-on="$listeners" :list="listData"></ListItem_0>
          <ListItem_1 v-if="listType == '1'" v-on="$listeners" :list="listData"></ListItem_1>
        </mu-load-more>
        <Nothing v-else></Nothing> 

        <Skeleton v-if="skeleton"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import SearchInputBar from "@components/basics/SearchInputBar";
import ListItem_0 from "@components/list/ListItem_0";
import ListItem_1 from "@components/list/ListItem_1";
import Nothing from "@components/basics/Nothing";
import Skeleton from "@components/basics/Skeleton";
import { mapState, mapMutations } from "vuex"
export default {
  components: {
    AppBar, SearchInputBar, ListItem_0, ListItem_1, Nothing, Skeleton
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
  mounted () {
    this.setMoreBox(this.$refs.moreBox);
  },
  activated () {
    if(this.moreBox) this.setMoreBoxScrollTop();
  },
  computed: {
    ...mapState(["moreBox"])
  },
  methods: {
    ...mapMutations(["setMoreBox", "setMoreBoxScrollTop"]),

    searchInputBarChange(val){
      this.apiMethods.getListCallback(this,"search");
    },
    searchClose(){
      this.apiMethods.getListCallback(this,"search");
    },
    getScreenParams(data){
      this.screenData = data;
      this.$refs.appbar.closeDrawer();
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

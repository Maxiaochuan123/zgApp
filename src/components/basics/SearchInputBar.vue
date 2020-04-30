<template>
  <div class="search-input-bar bottomShadow">
    <div class="serch-input">
      <mu-icon value=":iconfont icon-sousuo"></mu-icon>
      <input :placeholder="placeholderText" class="query-input" @keypress="searchGoods" type="serch" v-model="value"/>
      <img v-show="value" src="@static/images/delete.png" @click.stop="close" class="close" />
    </div>
  </div>
</template>

<script>
import tool from '@static/js/tool'
export default {
  name: "SearchInputBar",
  data() {
    return {
      value: ""
    };
  },
  props: {
    placeholderText: {
      type: String,
      default: "搜索"
    }
  },
  methods: {

    // 实时搜索
    // searchInput:tool.debounce(function(){
    //   this.resetListHandle();
    //   this.$store.commit('setSearchInputVal',this.value);
    //   this.$emit("searchInputBarChange", this.value);
    // },1200),

    // 移动端点击搜索 || 前往
    searchGoods(event) { 
      if (event.keyCode == 13) {
        event.preventDefault(); //禁止默认事件（默认是换行） 
        this.resetListHandle();
        this.$store.commit('setSearchInputVal',this.value);
        this.$emit("searchInputBarChange", this.value);
        let el = document.querySelector(".query-input")
        el.blur();
      } 
    },

    // 清空
    close(){
      this.value = ''
      this.$store.commit('setSearchInputVal',"");
      this.$emit("searchClose")
    }
  }
};
</script>
<style lang="less">
.query-input {
  .mu-text-field-input {
    height: auto !important;
  }
}
</style>
<style lang='less' scoped>
.search-input-bar {
  position: fixed;
  top: 44px;
  z-index: 99;
  width: 100%;
  height: 60px;
  padding: 8px 15px;
  background-color: #fff;
  .serch-input {
    position: relative;
    width: 100%;
    height: 44px;
    border-radius: 10px;
    padding: 7px 10px;
    color: @regular-text;
    background-color: @primary-border;
    display: flex;
    align-items: center;
    .query-input {
      width: 100%;
      padding-left: 12px;
      border: none;
      background-color: @primary-border;
      outline: none;
    }
    .close {
      width: 20px;
      height: 20px;
      visibility: visible;
      margin-left: 10px;
    }
  }
}
</style>
<!--
 * @Description: 搜索框input类型
 * @Author: shenah
 -->
<template>
  <div class="search-input-bar">
    <div class="serch-input">
      <mu-icon value=":iconfont icon-sousuo"></mu-icon>
      <input
        :placeholder="placeholderText"
        class="query-input"
        type="text"
        v-model="inputValue"
        @input="searchInput"
      />
      <img v-show="inputValue"
        :src="loadingImg('delete.png')"
        @click.stop=" inputValue = '' "
        class="close"
      />
      <br />
    </div>
  </div>
</template>

<script>
import tool from '@static/js/tool'
export default {
  name: "SearchInputBar",
  components: {},
  data() {
    return {
      inputValue: ""
    };
  },
  props: {
    placeholderText: {
      type: String,
      default: "搜索"
    }
  },
  methods: {
    searchInput:tool.debounce(function(){
      this.$emit("searchInputBarChange", this.inputValue);
    })
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
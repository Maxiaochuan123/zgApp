<template>
  <div class="search-input-bar bottomShadow">
    <div class="serch-input">
      <mu-icon value=":iconfont icon-sousuo"></mu-icon>
      <input class="query-input" type="serch" v-model="value" :placeholder="placeholderText" @focus="searchFocus" @blur="searchBlur" @keypress="searchGoods"/>
      <img v-show="value" src="@static/images/delete.png" @click.stop="close" class="close" />
    </div>
    <div :class="['candidate', isShow ? 'show' : '']" v-show="isShow">
      <ul>
        <slot name="candidateList"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import tool from '@static/js/tool'
import { mapState, mapMutations } from 'vuex'
export default {
  name: "SearchInputBar",
  data() {
    return {
      value: "",
      isShow:false,
    };
  },
  props: {
    placeholderText: {
      type: String,
      default: "搜索"
    },
    isCandidate: { //是否显示候选列表
      type: Boolean,
      default: false
    },
    candidateList: { //候选列表
      type: Array,
      default: ()=>[]
    }
  },
  created () {
    if(this.searchInputValue) this.value = this.searchInputValue;
  },
  watch:{
    searchInputValue(newVal, oldVal){
      if(!newVal) this.value = "";
    }
  },
  computed: {
    ...mapState(["searchInputValue"])
  },
  methods: {
    ...mapMutations(["setSearchInputVal"]),
    // 实时搜索
    // searchInput:tool.debounce(function(){
    //   this.resetListHandle();
    //   this.setSearchInputVal(this.value);
    //   this.$emit("searchInputBarChange", this.value);
    // },1200),

    // 移动端点击搜索 || 前往
    searchGoods(event) { 
      if (event.keyCode === 13) {
        event.preventDefault(); //禁止默认事件（默认是换行） 
        this.resetListHandle();
        this.setSearchInputVal(this.value);
        this.$emit("searchInputBarChange", this.value);

        // 搜索触发后, 清除输入框中的数据
        // this.value = ''
        // this.setSearchInputVal("");

        if(this.value) this.isShow = true;
        if(!this.isCandidate){
          let el = document.querySelector(".query-input")
          el.blur();
        }
        
      } 
    },

    // 清空
    close(){
      this.value = ''
      this.setSearchInputVal("");
      this.$emit("searchClose")
    },
    searchFocus(){
      if(this.candidateList.length > 0) this.isShow = true;
    },
    searchBlur(){
      setTimeout(()=>this.isShow = false)
    },
  }
};
</script>
<style lang="less" scoped>
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
  .show{
    animation: searchAnimation .3s ease;
    animation-fill-mode: forwards;
  }
  @keyframes searchAnimation {
    to {
      margin-top: 6px;
      opacity: 1;
    }
  }
  .candidate{
    width: 100%;
    border-radius: 6px;
    margin-top: 0;
    opacity: 0;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
    // backface-visibility: hidden; //解决 动画闪烁 抖动 bug
    ul>li{
      list-style: none;
      padding: 0 14px;
      height: 40px;
      color: @primary-text;
      position: relative;
      display: flex;
      align-items: center;
      img{
        width: 24px;
        height: 24px;
      }
      span{
        line-height: 40px;
        margin-left: 10px;
        &:last-child{
          color: @regular-text;
        }
      }
      &::before{
        content:'';
        width: 91%;
        height: 1px;
        background-color: @primary-border;
        bottom: 0;
        position: absolute;
      }
      &:last-child::before{
        content: none;
      }
    }
  }
}
</style>
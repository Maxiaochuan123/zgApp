<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime : 2019-12-26 15:42:57
 * @LastEditors  : shenah
 -->
<template>
  <div class="search-bar">
    <div class="serchInput">
      <mu-icon size="16" value=":iconfont icon-sousuo"></mu-icon>
      <mu-select full-width filterable v-model="search.value" :placeholder="placeholderText">
        <mu-option
          v-for="(item,index) in searchList"
          :key="index"
          :label="item.userName"
          :value="item.userName"
          @click.native="isGoPage ? goPage(pageLinkName,list[index],{},setStoreMethodName) : goTag(item.tag)"
        ></mu-option>
      </mu-select>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "search-bar",
  props: {
    showLabel:{
      type: String,
      default: "name"
    },
    placeholderText:{
      type: String,
      default: "搜索"
    },
    list: {
      type: Array,
      default: () => []
    },
    isGoPage: {
      type: Boolean,
      default: false
    },
    pageLinkName: {
      type: String,
      default: ""
    },
    setStoreMethodName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchList: [],
      search: {
        value: ""
      }
    };
  },
  computed:{
    ...mapState(['userList'])
  },
  watch:{
    list(val){
      this.searchList = [];
      this.search.value = '';
      this.setSearchList(val);
    }
  },
  
  methods: {
    setSearchList(list){
      if(this.isGoPage){
        list.forEach( item => {
          this.searchList.push({userName:item.realname})
        })
      }else{
        list.forEach( item => {
          for(let item_1 in item){
            for(let item_2 in item[item_1]){
              this.searchList.push({userName:item[item_1][item_2][this.showLabel],tag:item_1,ascllTag:item_1.charCodeAt()})
            }
          }
        })
      }
    },
    goTag(tag) {
      document.querySelector(`#tag${tag.charCodeAt()}`).scrollIntoView(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.search-bar {
  position: fixed;
  top: 44px;
  z-index: 88;
  width: 100%;
  height: 60px;
  padding: 12px 15px;
  background-color: #fff;

  .serchInput {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 7px 10px;
    display: flex;
    color: @regular-text;
    background-color: @primary-border;

    .mu-input {
      min-height: 32px;
      margin-bottom: 0;
      padding-bottom: 0;
      padding-top: 0;
      padding-left:6px;

      .mu-select-action,
      .mu-input-line,
      .mu-input-focus-line {
        display: none;
      }
      .mu-select-input.is-enable {
        padding-left: 12px;
      }
      .mu-select-content input {
        position: absolute;
        top: -5px;
      }
    }
  }
}
</style>

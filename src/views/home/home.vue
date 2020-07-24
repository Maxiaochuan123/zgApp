<template>
  <div class="home">
    <div class="header">
      <p class="title_1">欢迎使用资管系统!</p>
      <p class="title_2">您好, {{userInfo.userName}}</p>
      <div class="serchInputBox">
        <mu-icon value=":iconfont icon-sousuo"></mu-icon>
        <input v-model.trim="searchInputVal" type="text" class="query-input" placeholder="项目编号, 客户姓名, 手机号码" @focus="isShow = searchList.length > 0 ? true : false" @blur="isShow = false" @keypress="searchGoods">
        <div class="alternativeList" v-show="isShow">
          <ul>
            <li v-for="(item, index) in searchList" :key="index" v-show="item.hidden" @click="searchCallback(item.modularName)">
              <span>{{item.modularName}}</span><span>{{item.count}}条</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="block" v-for="(block,index) in blockList" :key="index" v-show="block.itemList.some(item => item.hidden)">
        <p class="title">{{block.title}}</p>
        <div :class="['itemBox', block.itemList.length > 4 ? 'moreBox' : '']">
          <div :class="['item',item.disabled ? '' : 'plan']" v-show="item.hidden" v-for="(item,index2) in block.itemList" :key="index2" @click="goPage(item.linkName)">
            <img :src="item.src">
            <span>{{item.describe}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import tool from "@static/js/tool.js";
import storage from '@static/js/storage';
import { controlInit } from "@static/js/control";
import { mapMutations } from "vuex"
export default {
  data() {
    return {
      isShow:false,
      searchInputVal:'',
      searchList:[],
      blockList:[]
    };
  },
  created  () {

    let control = controlInit();

    this.blockList = [
      {
        title:"还款跟踪",
        itemList:[
          {src: this.loadImage("repayment.png"),describe:"还款列表",disabled:true,hidden:control.repayment.search,linkName:"repayment"},
          {src:this.loadImage("overdue.png"),describe:"逾期列表",disabled:true,hidden:control.overdue.search,linkName:"overdue"},
          {src:this.loadImage("compensatory.png"),describe:"代偿列表",disabled:true,hidden:control.compensatory.search,linkName:"compensatory"},
          {src:this.loadImage("dataArchiving.png"),describe:"资料归档",disabled:false,hidden:false,linkName:"dataArchiving"},
        ]
      },
      {
        title:"逾期回收",
        itemList:[
          {src:this.loadImage("phoneCollection.png"),describe:"电话催收",disabled:true,hidden:control.phone.search,linkName:"phone"},
          {src:this.loadImage("business.png"),describe:"业务催收",disabled:true,hidden:control.business.search,linkName:"business"},
          {src:this.loadImage("collection.png"),describe:"外勤催收",disabled:true,hidden:control.visit.search,linkName:"visit"},
          {src:this.loadImage("all.png"),describe:"全员催收",disabled:true,hidden:control.all.search,linkName:"all"},
        ]
      },
      {
        title:"其他",
        itemList:[
          {src:this.loadImage("loanCalculation.png"),describe:"贷款计算",disabled:false,hidden:false,linkName:""},
          {src:this.loadImage("reportForm.png"),describe:"统计报表",disabled:false,hidden:false,linkName:""},
          {src:this.loadImage("customer.png"),describe:"客户信息",disabled:false,hidden:false,linkName:""},
          {src:this.loadImage("bond.png"),describe:"保证金",disabled:false,hidden:false,linkName:""},
        ]
      }
    ]
  },
  watch: {
    searchInputVal(n, o){
      if(!n) this.searchList = [];
    }
  },
  methods: {
    ...mapMutations[("setSearchInputVal")],

    // 搜索
    searchGoods(event){
      // 移动端点击搜索 || 前往
      if (this.searchInputVal && event.keyCode === 13) {
        event.preventDefault(); //禁止默认事件（默认是换行）
        this.api.seeModulCount({condition:this.searchInputVal}).then(res => {
          if(res.message === 'success'){
            this.searchList = res.data;

            let control = controlInit();
            this.searchList.forEach(item => {
              switch (item.modularName) {
                case "还款列表":
                  item.hidden = control.repayment.search
                  break;
                case "逾期列表":
                  item.hidden = control.overdue.search
                  break;
                case "代偿列表":
                  item.hidden = control.compensatory.search
                  break;
                case "电话催收":
                  item.hidden = control.phone.search
                  break;
                case "业务催收":
                  item.hidden = control.business.search
                  break;
                case "外勤催收":
                  item.hidden = control.visit.search
                  break;
                case "全员催收":
                  item.hidden = control.all.search
                  break;
              }
            })
            this.isShow = true;
          }
        })
        // if(!this.isCandidate){
        //   let el = document.querySelector(".query-input")
        //   el.blur();
        // }
      } 
    },
    // 点击列表跳转
    searchCallback(text){
      this.setSearchInputVal(this.searchInputVal);
      
      switch (text) {
        case "还款列表":
            this.goPage("repayment")
          break;
        case "逾期列表":
            this.goPage("overdue")
          break;
        case "代偿列表":
            this.goPage("compensatory")
          break;
        case "电话催收":
            this.goPage("phone")
          break;
        case "业务催收":
            this.goPage("business")
          break;
        case "外勤催收":
            this.goPage("visit")
          break;
        case "全员催收":
            this.goPage("all")
          break;
      }
    }
  }
};
</script>
<style scope lang="less">
.home {
  .header{
    width: 100%;
    height: 190px;
    background-image: url("~@static/images/home_banner.png");
    background-position: 0px -46px;
    background-size: cover;
    padding: 23px 25px 32px;
    
    .title_1,.title_2{
      color: #fff;
    }
    .title_1{
      font-size: 20px;
      margin-top: 23px;
    }
    .title_2{
      margin-top: 4px;
    }

    .serchInputBox{
      background-color: #fff;
      border-radius: 6px;
      height: 44px;
      line-height: 44px;
      margin-top: 16px;
      padding-left: 10px;
      color: @regular-text;
      position: relative;
      input{
        position: absolute;
        width: 90%;
        margin-left: 8px;
        font-size: 15px;
        &:focus+.alternativeList{
          animation: searchAnimation .3s ease;
          animation-fill-mode: forwards;
        }
      }
      .alternativeList{
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        opacity: 0;
        overflow: hidden;
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
        backface-visibility: hidden; //解决 动画闪烁 抖动 bug
        ul>li{
          list-style: none;
          padding: 0 14px;
          color: @primary-text;
          position: relative;
          display: flex;
          justify-content: space-between;
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
      @keyframes searchAnimation {
        to {
          top: 46px;
          opacity: 1;
        }
      }
    }
  }
  .content{
    height: calc(100vh - 167px - 50px);
    background-color: #fff;
    overflow-y: scroll;
    padding: 30px 15px;

    .block{
      padding-bottom: 24px;
      .title{
        font-size: 18px;
        font-size: @primary-text;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .itemBox{
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-content: space-between;
        // padding: 0 12px;
        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 0 0 25%;

          img{
            width: 40px;
            height: 40px;
          }
          span{
            font-size: 12px;
          }
        }
      }

      // 当存在项大于 4时 开启大盒子模式
      .moreBox{
        min-height: 130px;
      }
    }
  }
  .plan {
    opacity: 0.2;
  }
}
</style>
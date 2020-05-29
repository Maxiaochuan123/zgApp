<template>
  <div class="home">
    <div class="header">
      <p class="title_1">欢迎使用资管系统!</p>
      <p class="title_2">您好, {{userInfo.userName}}</p>
      <div class="serchInputBox">
        <mu-icon value=":iconfont icon-sousuo"></mu-icon>
        <input type="text" placeholder="项目编号, 客户姓名, 手机号码" @focus="isShow = true" @blur="searchBlur" @input="searchInputCallback" disabled>
        <div class="alternativeList" v-show="isShow">
          <ul>
            <li @click="searchCallback('还款管理')"><span>还款管理</span><span>1条</span></li>
            <li @click="searchCallback('垫款管理')"><span>垫款管理</span><span>1条</span></li>
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
import tool from "@static/js/tool.js";
import { controlInit } from "@static/js/control";
export default {
  data() {
    return {
      isShow:false,
      blockList:[]
    };
  },
  async created  () {
    let control = await controlInit();

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
  methods: {
    // 搜索
    searchInputCallback:tool.debounce(()=>{
      console.log('sss')
    }),
    // 搜索失去焦点
    searchBlur(){
      setTimeout(()=>this.isShow = false)
    },
    // 点击列表跳转
    searchCallback(text){
      switch (text) {
        case "还款管理":
            console.log(1)
          break;
        case "垫款管理":
            console.log(2)
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
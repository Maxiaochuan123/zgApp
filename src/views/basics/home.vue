<template>
  <div class="home">
    <div class="header">
      <p class="title_1">欢迎使用资管系统!</p>
      <p class="title_2">您好, 马总</p>
      <div class="serchInputBox">
        <mu-icon value=":iconfont icon-sousuo"></mu-icon>
        <input type="text" placeholder="项目编号, 客户姓名, 手机号码" @focus="isShow = true" @blur="searchBlur" @input="searchInputCallback">
        <div class="alternativeList" v-show="isShow">
          <ul>
            <li @click="searchCallback('还款管理')"><span>还款管理</span><span>1条</span></li>
            <li @click="searchCallback('垫款管理')"><span>垫款管理</span><span>1条</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="block" v-for="(block,index) in blockList" :key="index">
        <p class="title">{{block.title}}</p>
        <div :class="['itemBox', block.itemList.length>4?'moreBox':'']">
          <div :class="['item',item.haveInHandlink?'':'plan']" v-for="(item,index2) in block.itemList" :key="index2" @click="goPage(item.linkName)">
            <img :src="item.src">
            <span>{{item.describe}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@api";
import tool from "@static/js/tool.js";
import { mapState } from 'vuex'
export default {
  components: {
    
  },
  data() {
    return {
      isShow:false,
      blockList:[
        {
          title:"还款跟踪",
          itemList:[
            {src:"../../../static/images/repayment.png",describe:"还款列表",haveInHandlink:true,linkName:"repaymentList"},
            {src:"../../../static/images/overdue.png",describe:"逾期列表",haveInHandlink:true,linkName:""},
            {src:"../../../static/images/endowment.png",describe:"代偿列表",haveInHandlink:true,linkName:""},
            {src:"../../../static/images/dataArchiving.png",describe:"资料归档",haveInHandlink:true,linkName:""},
          ]
        },
        {
          title:"逾期回收",
          itemList:[
            {src:"../../../static/images/phoneCollection.png",describe:"电话催收",haveInHandlink:true,linkName:""},
            {src:"../../../static/images/business.png",describe:"业务催收",haveInHandlink:true,linkName:""},
            {src:"../../../static/images/collection.png",describe:"外勤催收",haveInHandlink:true,linkName:""},
            {src:"../../../static/images/settle.png",describe:"全员催收",haveInHandlink:true,linkName:""},
          ]
        },
        {
          title:"其他",
          itemList:[
            {src:"../../../static/images/loanCalculation.png",describe:"贷款计算",haveInHandlink:true,linkName:""},
            {src:"../../../static/images/reportForm.png",describe:"统计报表",haveInHandlink:false,linkName:""},
            {src:"../../../static/images/customer.png",describe:"客户信息",haveInHandlink:false,linkName:""},
            {src:"../../../static/images/bond.png",describe:"保证金",haveInHandlink:false,linkName:""},
          ]
        }
      ]
    };
  },
  created() {
    
  },
  computed:{
    
  },
  methods: {
    // 搜索
    searchInputCallback:tool.debounce(()=>{
      console.log('sss')
    }),
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
  // /deep/ .app-bar {
  //   box-shadow: 0px 2px 6px 0px #ededed;
  // }
  .header{
    width: 100%;
    height: 190px;
    background-image: url("../../../static/images/home_banner.png");
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
        &:hover+.alternativeList{
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
    // img {
    //   // filter: grayscale(100%);
    //   filter: gray;
    // }
    // span {
    //   color: red;
    // }
    opacity: 0.2;
  }
}
</style>
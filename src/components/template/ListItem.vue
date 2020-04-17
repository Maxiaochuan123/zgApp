<template>
  <div class="listBox">
    <div class="listItem" v-for="(item,index) in listData" :key="index">
      <div class="header">
        <span>{{item.num}}</span> <span class="status primaryColor">{{item.status}}</span>
      </div>
      <div class="content">
        <div class="itemBox">
          <div class="item"><span>{{item.name}}</span> <span>{{item.phone}}</span></div><div class="item"><span>还款卡号</span> <span>{{item.carId}}</span></div>
        </div>
        <div class="itemBox">
          <div class="item"><span>应还总金额</span> <span>{{item.money}}</span></div><div class="item"><span>到期还款日</span> <span>{{item.dateTime}}</span></div>
        </div>
        <div class="itemBox">
          <div class="item"><span>还款期数</span> <span>第{{item.qishu}}期</span></div><div class="item"><span>本期应还</span> <span>{{item.yinhuan}}</span></div>
        </div>
      </div>
      <div class="bottom">
        <span class="updateTime">{{item.updateTime}}更新</span>
        <mu-button flat @click="$emit('goPage')">还款计划</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="less" scoped>
.listBox{
  .listItem{
    margin-top: 12px;
    padding: 12px 20px;
    background-color: #fff;
    color: @primary-text;

    .primaryColor{
      color: @primary;
    }

    .header, .content, .itemBox{
      margin-bottom: 12px;
      background-color: #fff;
    }

    .header, .bottom, .itemBox{
      display: flex;
      justify-content: space-between;
    }

    .header{
      font-weight:400;
      span:nth-child(2){
        font-weight:500;
      }
    }

    .bottom{
      span{
        color: @regular-text;
        line-height: 30px;
      }
      .operation{
        display: flex;
        flex-direction: row-reverse;
        margin-left: 10px;
      }
    }
    .content{
      padding: 12px 0;
      // position: relative;
      border-top: 1px solid @primary-border;
      border-bottom: 1px solid @primary-border;
      color: @regular-text;
    }

    .itemBox{
      .item{
        width: 50%;
        display: flex;
        span{
          display: inline-block;
        }
        span:nth-child(1){
          width: 84px;
          text-align: right;
          margin-right: 10px;
        }
        span:nth-child(2){
          width: calc(100% - 84px);
          color: @primary-text;
          text-align: left;
          word-wrap:break-word;
          white-space:normal;
        }
      }
    }
    .mu-button{
      border-radius: 6px;
      color: @primary;
      border: 1px solid @primary;
      margin-left: 10px;
      min-width: 52px;
      height: 30px;
      font-weight:500;
    }
  }
}
</style>

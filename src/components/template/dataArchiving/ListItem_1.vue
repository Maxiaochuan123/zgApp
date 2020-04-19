<template>
  <div class="listBox">
    <div class="listItem" v-for="(item,index) in listData" :key="index" @click="$emit('goPage')">
      <div class="header">
        <span>{{item.num}}</span> <span class="status primaryColor">{{item.status}}</span>
      </div>
      <div class="content">
        <div class="itemBox">
          <span>{{item.name}}</span> <span>{{item.dateTime}}</span>
        </div>
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
  margin-top: 12px;
  .listItem{
    padding: 12px 15px;
    background-color: #fff;
    color: @primary-text;

    &:not(:last-child){
      border-bottom: 1px solid @primary-border;
    }

    .primaryColor{
      color: @primary;
    }

    .header, .content{
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

    .content{
      margin-top: 4px;
      color: @regular-text;
    }

    .itemBox{
      display: flex;
    }
  }
}
</style>

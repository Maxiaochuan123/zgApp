<template>
  <div class="listBox">
    <!-- waitTransfer:待移交  reject:移交驳回  waitFile:待归档  alreadyFile:已归档  alreadyBorrowing:已借阅  alreadyDestruction:已销毁  -->
    <div class="listItem" v-for="(item,index) in list" :key="index" @click="handler(item)">
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
import { mapMutations } from "vuex"
export default {
  props: {
    list:{
      type: Array,
      default: ()=>[]
    }
  },
  methods: {
    ...mapMutations(["setCurrentScrollTop"]),
    handler(item){
      this.setCurrentScrollTop();
      this.goPage('archiving',{id:222,state:item.state});
    },
  }
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

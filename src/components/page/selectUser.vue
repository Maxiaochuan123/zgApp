<template>
  <div class="selectUser">
    <AppBar pageTitle="转派" occupyBtn></AppBar>
    <div class="contentBox">
      <div class="content-appBar">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="switch" @click="switchUser(item)">
            <img :src="listData[index].state ? loadImage('selected.png') : loadImage('no-selected.png') ">
          </div>
          <div :class="['info', index + 1 != listData.length  ? 'borderBottom' : '']" @click="goPage('personalInfo',item)">
            <img :src="loadImage('defaultHeadPortrait.png')">
            <div class="describe"> <p>{{item.userName}}</p> </div>
          </div>
        </div>
        <div class="selectBar topShadow">
          <div class="selectUser textEllipsis">
            <span>已选择:</span>
            <span>{{activeUser.userName}}</span>
          </div>
          <div class="selectConfirm">
            <mu-button color="primary" :disabled="Object.keys(activeUser).length === 0" @click="confirm">确定</mu-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar";
import SearchInputBar from "@components/basics/SearchInputBar";
export default {
  components: { AppBar, SearchInputBar },
  data() {
    return {
      listData: [],
      activeUser: {},
    }
  },
  created () {
    this.getUserList();
  },
  methods: {
    confirm(){
      let params = {
        orderList: [{
          orderId: this.routeData.orderId,
          orderNo: this.routeData.orderNo,
          periodsIndex: this.routeData.periodsIndex,
          sourceUserId: this.routeData.remindersId,
          sourceUserName: this.routeData.remindersName,
          strategyState: this.routeData.strategyState,
        }],
        userId: this.activeUser.id,
        userName: this.activeUser.userName,
      }
      this.$confirm(`确定分配给${this.activeUser.userName}?`, "提示").then(res =>{
        if(res.result){
          this.api.transfer(params).then(res => {
            if(res.message === "success"){
              this.$toast.success("转派成功!"); setTimeout(() => this.$router.go(-1), 500);
            }else{
              this.$toast.error("转派失败, 请重试!");
            }
          })
        }
      });
    },
    switchUser(row){
      this.listData.forEach(item => {
        item.state = item.id === row.id ? true : false;
      })

      if(row.state){
        this.activeUser = row;
      }else{
        this.activeUser = {}
      }
    },

    // 获取用户列表
    getUserList(type){
      this.api.seeAllUser().then(res => {
        if (res.message !== 'success') this.$toast.warning("用户列表获取失败!");
        if (res.data){
          let data = res.data;
          data.forEach(item => item.state = false);
          this.listData = data;
        }else{
          this.dataError = true;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .selectUser{
    .list{
      height: 66px;
      background-color: #fff;
      display: flex;
      padding-top: 14px;
      .switch {
        display: flex;
        justify-content:flex-end;
        align-items: center;
        height: 40px;
        margin-left: 14px;

        img{
          width: 18px;
          height: 18px;
        }
      }

      .borderBottom{
        border-bottom: 1px solid @primary-border;
      }

      .info{
        height: 100%;
        width: 100%;
        display: flex;
        margin-left: 14px;
        img{
          width: 40px;
          height: 40px;
        }

        .describe{
          margin-left: 12px;
          padding-bottom: 8px;
          display: flex;
          align-items: center;
          p{
            font-size: 16px;
            font-weight: 500;
            color: @primary-text;
          }
        }
      }
    }

    .selectBar{
      width: 100%;
      height: 60px;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      padding: 0 14px;
      display: flex;
      align-items: center;
      .selectUser{
        width: calc(100% - 50px);
        span{
          &:nth-child(1){
            font-size: @primary-size;
            color: @primary-text;
          }
          &:nth-child(2){
            margin-left: 4px;
            font-size: @primary-size;
            color: @regular-text;
          }
        }
      }
      .selectConfirm{
        margin-left: 8px;
        /deep/ .mu-button{
          border-radius:6px;
          min-width: 60px;
          height: 28px;
          box-shadow: none;
          .mu-button-wrapper{
            padding: 0;
          }
        }
      }
    }
  }
</style>

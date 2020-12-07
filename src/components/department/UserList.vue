<template>
  <div :class="['userList', state ? 'show' : '']" v-show="state">
    <div class="header">
      <div class="bar"><i class="iconfont icon-cuo" @click="close"></i><span>{{ isSelectUser ? "转派" : departmentItem.name}}</span></div>
      <SearchInputBar v-if="isSelectUser==false" placeholderText="输入关键字 姓名 / 手机号" @searchInputBarChange="searchInputBarChange" @searchClose="searchClose"></SearchInputBar>
    </div>
    <div class="contentBox">
      <div :class="['content-list', isSelectUser ? 'selectUserContent' : '']">
        <mu-load-more :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll">
          <div class="list" v-for="(item, index) in listData" :key="index">
            <div class="switch" @click="switchUser(item, index)" v-if="isSelectUser">
              <img :src="item.state ? loadImage('selected.png') : loadImage('no-selected.png') ">
            </div>
            <div :class="['info', index = listData.length - 1 && index + 1 != listData.length  ? 'borderBottom' : '']" @click="goPage('personalInfo',item)">
              <img :src="loadImage('defaultHeadPortrait.png')">
              <div class="describe">
                <p>{{item.userName}}</p>
                <p>{{item.roles.map(val=>val.name).join(", ")}}</p>
              </div>
            </div>
          </div>
        </mu-load-more>
        <div class="selectBar topShadow" v-if="isSelectUser">
          <div class="selectUser textEllipsis">
            <span>已选择:</span>
            <span>{{switchUserList.map(val=>val.userName).join(", ")}}</span>
          </div>
          <div class="selectConfirm">
            <mu-button color="primary" @click="confirm">{{confirmText}}</mu-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInputBar from "@components/basics/SearchInputBar";
export default {
  components: { SearchInputBar },
  props: {
    isSelectUser:{
      type: Boolean,
      default: false
    },
    departmentItem:{
      type: Object,
      default: ()=>{}
    },
    confirmText:{
      type: String,
      default: "分 配"
    }
  },
  data() {
    return {
      tagState: false, //出现props数据无法同步 bug 所以新增加一个 状态判断
      state: false,
      listData: [],
      switchUserList: [],
    }
  },
  watch: {
    tagState(newVal, oldVal){
      if(newVal) this.getUserList();
    }
  },
  methods: {
    confirm(){
      let ids = this.switchUserList.map(item => item.id);
      this.$emit("getUserListId", ids)
    },
    show(){
      this.tagState = true;
    },
    close(){
      this.state = false;
      this.tagState = false;
      this.switchUserList = [];
      this.refreshHandle();
    },
    searchInputBarChange(val){
      this.getUserList();
    },
    searchClose(){
      this.getUserList();
    },
    // 下拉刷新
    refresh() {
      this.refreshHandle();
      this.getUserList();
    },
    // 上拉加载
    load() {
      this.loadHandle();
      this.getUserList();
    },

    switchUser(row,index){
      row.state = !row.state;
      if(row.state){
        this.switchUserList.push(row)
      }else{
        this.switchUserList = this.switchUserList.filter(item => item.userName != row.userName)
      }
    },

    // 获取用户列表
    getUserList(type){
      
      if(!this.isSelectUser){
        this.api.seeDepUserInfo({...this.paging, departmentId:this.departmentItem.id, param:this.searchInputValue}).then(res => {
          if (res.message !== 'success') this.$toast.warning("用户列表获取失败!");

          if (res.data){ 
            
            let results = res.data.results;
            results.forEach(item => item.state = false);
            if(results.length > 0){
              this.state = true
            }else{
              this.tagState = false;
            }

            this.loadUpdate.loadedAll = results.length === 0 ? true : false;

            if (this.loadUpdate.loadingState === 'default' || this.loadUpdate.loadingState === 'refresh') {
              this.listData = results; this.loadUpdate.refreshing = false;
            } else {
              this.listData.push(...results); this.loadUpdate.loading = false;
            }

          }
        })
      }else{
        this.api.seeAllUser().then(res => {
          if (res.message !== 'success') this.$toast.warning("用户列表获取失败!");
          if (res.data){
            let data = res.data;
            data.forEach(item => item.state = false);
            // this.listData = data;
            console.log(data)
          }
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .userList{
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background-color: #F8F8F8;
    position: fixed;
    bottom: -100vh;

    .header{
      width: 100%;
      height: 44px;
      background-color: #fff;
      position: fixed;
      top: 0;
      
      .bar{
        height: 100%;
        line-height: 44px;
        text-align: center;
        padding: 0 12px;
        i{
          width: 24px;
          height: 40px;
          font-size: 24px;
        }
        span{
        display: inline-block;
          font-size: 18px;
          font-weight: 600;
          width: calc(100% - 30px);
        }
      }

      .search-input-bar{
        position: absolute;
        top: 44px;
      }
    }
    .content-list{
      margin-top: 116px;
      height: calc(100vh - 104px);
    }
    .selectUserContent{
      margin-top: 56px;
      height: calc(100vh - 104px);
    }
    .mu-load-more{
      height: 100%;
    }
    .list{
      height: 66px;
      background-color: #fff;
      display: flex;
      padding-top: 8px;
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
          flex-direction: column;
          p{
            &:nth-child(1){
              font-size: 16px;
              font-weight: 500;
              color: @primary-text;
            }
            &:nth-child(2){
              font-size: 14px;
              color: @regular-text;
            }
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
  
  .show{
    animation: show 0.2s ease;
    animation-fill-mode: forwards;
  }
  @keyframes show {
    from {
      opacity: 0;
      bottom: -100vh;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }
</style>

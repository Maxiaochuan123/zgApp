<!-- 个人资料 -->
<template>
  <div class="personal-details">
    <AppBar pageTitle="个人资料" occupyBtn ></AppBar>
    <div class="content">
      <div class="headers">
        <div class="header regular-words">
          <div>头像</div>
          <mu-avatar size="48">
            <img :src=" loginInfo.img ? loginInfo.img : loadingImg('defaultHeadPortrait.png') " />
          </mu-avatar>
        </div>
        <div class="brief">
          <div class="regular-words">简介</div>
          <div>{{ loginInfo.remark || "暂无简介" }}</div>
        </div>
      </div>
      <div class="basic">
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">真实姓名</div>
            <div class="sub-title">{{ loginInfo.realname }}</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">所在企业</div>
            <div class="sub-title">{{ loginInfo.deptName }}</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">职位</div>
            <div class="sub-title">{{ loginInfo.post || "暂无职位" }}</div>
          </div>
        </div>
        <div class="basic-details-item no-border-bottom">
          <div class="basic-details-item-left">
            <div class="title">联系方式</div>
            <div class="sub-title">{{ loginInfo.mobile }}</div>
          </div>
        </div>
      </div>
      <div class="login-btn-wrap">
        <mu-button @click="loginOut" class="login-out" color="primary">退出登录</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@components/basics/AppBar";
import tool from "@static/js/tool";
export default {
  name: "personalDetails",
  components: { AppBar },
  data () {
    return {
      loginInfo:{
        realname:'AA',
        deptName:'AA',
        post:'AA',
        mobile:'AA',
      }
    }
  },
  methods: {
    loginOut() {
      
    }
  }
};
</script>
<style lang="less" scoped>
.personal-details {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
    padding-top: 44px;
    .headers {
      padding: 12px 15px;
      margin-top: 12px;
      background-color: #fff;
      .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 12px 0;
        border-bottom: 1px solid @primary-border;
      }
      .brief {
        width: 100%;
        font-size: @primary-size;
        color: @regular-text;
        padding: 12px 0 0 0;
      }
    }
    .basic {
      padding: 0 15px;
      margin-top: 12px;
      background-color: #fff;

      .basic-details-item {
        width: 100%;
        padding: 12px 15px 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid @primary-border;
        .basic-details-item-left {
          .title {
            font-size: @regular-size;
            font-weight: @regular-weight;
            color: @regular-text;
          }
          .sub-title {
            margin-top: 2px;
            font-size: @primary-size;
            font-weight: @primary-weight;
            color: @primary-text;
          }
        }
        .basic-details-item-right {
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .login-btn-wrap {
      margin-top: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
      .login-out {
        width: 250px;
        height: 44px;
        border-radius: 6px;
        font-size: @primary-size;
      }
    }
  }
}
</style>

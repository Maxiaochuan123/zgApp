<!--
 * @Description: 主页个人资料详情
 * @Author: shenah
 -->
<template>
  <div class="personal-details">
    <AppBar
      :isShowRightBtn="false"
      pageTitle="个人资料"
    ></AppBar>
    <div class="content">
      <div class="headers">
        <div class="header regular-words">
          <div>头像</div>
          <mu-avatar size="48">
            <img :src="loginUser.img?loginUser.img:loadingImg('default-header.png')" />
          </mu-avatar>
        </div>
        <div class="brief">
          <div class="regular-words">简介</div>
          <div>{{loginUser.remark || '暂无简介'}}</div>
        </div>
      </div>
      <div class="basic">
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">真实姓名</div>
            <div class="sub-title">{{loginUser.realname}}</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">所在企业</div>
            <div class="sub-title">{{loginUser.deptName}}</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">职位</div>
            <div class="sub-title">{{loginUser.post || '暂无职位'}}</div>
          </div>
        </div>
        <div class="basic-details-item no-border-bottom">
          <div class="basic-details-item-left">
            <div class="title">联系方式</div>
            <div class="sub-title">{{loginUser.mobile}}</div>
          </div>
        </div>
      </div>
      <div class="login-btn-wrap">
        <mu-button
          @click="loginOut"
          class="login-out"
          color="primary"
        >退出登录</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@components/AppBar.vue";
import tool from "@static/js/tool";
import Api from "@api";
export default {
  name: "personalDetails",
  components: { AppBar },
  computed: {
    ...mapState(["loginUser"])
  },
  data() {
    return {
      date: ""
    };
  },
  props: {},
  mounted() {},
  methods: {
    loginOut() {
      // 退出登录
      Api.userLoginOut().then(res => {
        this.$store.commit('setBottomNav','home')
        tool.signOut();
      });
    }
  }
};
</script>
<style lang='less' scoped>
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
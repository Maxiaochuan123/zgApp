<!--
 * @Description: 主页菜单的我的
 * @Author: shenah
 -->
<template>
  <div class="my-user">
    <div class="header-bc">
      <div class="title">我的</div>
    </div>
    <div class="user-info">
      <div class="user-info-wrap">
        <div
          @click="toGoTo('personalDetails')"
          class="user"
        >
          <div class="user-left">
            <div class="main-name">
              <span class="name">{{loginUser.realname}}</span>
              <img
                :src="loadingImg('male.png')"
                v-if="loginUser.sex === 1"
              />
              <img
                :src="loadingImg('female.png')"
                v-if="loginUser.sex === 2"
              />
            </div>
            <div class="sub-name">
              <!-- 职务 -->
              <span class="name">{{loginUser.post||'暂无职务'}}</span>
              <img :src="loadingImg('more.png')" />
            </div>
          </div>
          <div class="user-right">
            <mu-avatar size="60">
              <img :src="loginUser.img?loginUser.img:loadingImg('default-header.png')" />
            </mu-avatar>
          </div>
        </div>
        <div class="menu-list">
          <div class="menu-item">
            <img :src="loadingImg('about-us.png')" />
            <div class="text">关于我们</div>
          </div>
          <div class="menu-item">
            <img :src="loadingImg('help-note.png')" />
            <div class="text">帮助说明</div>
          </div>
          <div class="menu-item">
            <img :src="loadingImg('feedback.png')" />
            <div class="text">意见反馈</div>
          </div>
          <div class="menu-item">
            <img :src="loadingImg('setting.png')" />
            <div class="text">我的设置</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["loginUser"])
  },
  mounted() {},
  methods: {
    toGoTo(type) {
      this.goPage(type);
    }
  }
};
</script>
<style scope lang="less">
.my-user {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @auxiliary;
  .header-bc {
    height: 130px;
    background: url("../../../static/images/my-user-bc.png") no-repeat;
    background-size: 100% 100%;
    .title {
      width: 100%;
      text-align: center;
      height: 74px;
      line-height: 74px;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }
  }
  .user-info {
    position: relative;
    width: 100%;
    padding: 0 15px;
    height: 126px;
    top: -63px;
    .user-info-wrap {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 6px;
      .user {
        padding: 0 30px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-left {
          .main-name {
            display: flex;
            align-items: center;
            .name {
              font-size: 20px;
              font-weight: 600;
              color: @primary-text;
            }
            img {
              width: 20px;
              height: 20px;
              margin-left: 6px;
            }
          }
          .sub-name {
            display: flex;
            align-items: center;
            margin-top: 4px;
            .name {
              font-size: @primary-size;
              font-weight: 400;
              color: @regular-text;
            }
            img {
              width: 14px;
              height: 14px;
              margin-left: 6px;
            }
          }
        }
      }
      .menu-list {
        margin-top: 12px;
        padding: 0 30px @primary-size 30px;
        display: flex;
        background-color: #fff;
        border-radius: 6px;
        justify-content: space-between;
        flex-wrap: wrap;
        .menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: @primary-size 6px 0 0;
          &:last-child {
            margin-right: 0;
          }
          img {
            width: 40px;
            height: 40px;
          }
          .text {
            margin-top: 6px;
            font-size: 14px;
            font-weight: 400;
            color: @primary-text;
          }
        }
      }
    }
  }
}
</style>
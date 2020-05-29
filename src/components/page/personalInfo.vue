<template>
  <div class="personalInfo">
    <AppBar pageTitle="个人信息" occupyBtn />

    <div class="content">
      <mu-paper :z-depth="0" class="topInfo" >
        <div class="headImg">
          <img src="@static/images/defaultHeadPortrait.png" />
        </div>
        <div class="info">
          <div class="name">
            <span>{{route.userName}}</span>
          </div>
          <div class="level">{{route.roles ? route.roles.map(val=>val.name).join(", ") : ''}}</div>
        </div>
      </mu-paper>

      <mu-paper :z-depth="0" class="describeInfo" >
        <mu-list>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>手机号码</mu-list-item-title>
              <mu-list-item-sub-title>{{route.mobile}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-icon @click="dial(route.mobile)" value=":iconfont icon-dianhua" ></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>部门</mu-list-item-title>
              <mu-list-item-sub-title>{{route.departments ? route.departments.map(val=>val.name).join(", ") : ''}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar";
export default {
  name: "personalInfo",
  components: { AppBar },
  data() {
    return {
      route:this.$route.params
    };
  }
};
</script>

<style scoped lang="less">
.personalInfo {
  .content {
    padding: 44px 0;
    .topInfo {
      display: flex;
      padding: 20px @primary-size;
      margin: 12px 0;
      .headImg {
        width: 60px;
        height: 60px;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .info {
        flex-grow: 1;
        padding-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          color: @primary-text;
          font-size: @primary-size;
          font-weight: 600;
          display: flex;
          align-items: center;
          padding-bottom: 2px;
          img {
            width: 20px;
            height: 20px;
            margin-left: 6px;
          }
        }
        .level {
          font-size: 14px;
          color: @regular-text;
        }
      }

      .mu-item-content {
        padding-left: 12px;
        .mu-avatar {
          width: 60px;
          height: 60px;
        }
        .mu-item-title {
          position: relative;
          font-weight: 600;
        }
      }

      .sex {
        position: absolute;
        top: 12px;
        left: 30px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }

    .mu-icon {
      width: 40px;
      height: 40px;
      text-align: right;
    }
    .mu-divider {
      margin-left: 4%;
      width: 92%;
    }

    .describeInfo {
      .mu-item-content {
        .mu-item-title {
          font-size: 14px;
          color: @regular-text;
        }
        .mu-item-sub-title {
          color: @primary-text;
          font-size: @primary-size;
        }
      }
      .mu-list /deep/ .mu-item {
        height: 72px;
      }
      i {
        font-size: 22px;
        color: @primary;
        position: absolute;
        top: 24px;
        right: 18px;
      }
    }
  }
}
</style>
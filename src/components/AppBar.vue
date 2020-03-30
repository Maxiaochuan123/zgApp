<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-12-18 10:25:06
 * @LastEditors: shenah
 -->
<template>
  <div class="app-bar">
    <mu-appbar z-depth="0">
      <mu-button
        @click="leftClick()"
        icon
        slot="left"
      >
        <mu-icon
          :size="iconSize"
          :value="`:iconfont ${leftIcon}`"
        ></mu-icon>
      </mu-button>
      <span class="title">{{pageTitle}}</span>
      <mu-button
        @click="openDrawerState"
        icon
        v-if="isDrawer"
      >
        <mu-icon
          :size="iconSize"
          :value="`:iconfont ${drawerIcon}`"
        ></mu-icon>
      </mu-button>

      <!-- 自定义筛选按钮 用于crm 嵌入 集团APP -->
      <mu-button
        @click="goPage('contacts')"
        icon
        v-if="customDrawer"
      >
        <mu-icon
          :size="iconSize"
          value=":iconfont icon-lianxiren"
        ></mu-icon>
      </mu-button>

      <!-- 右侧按钮 -->
      <mu-menu
        :open.sync="menuFlag"
        placement="bottom-end"
        slot="right"
        v-if="!custom"
      >
        <mu-button
          :disabled="!isShowRightBtn"
          @click="rightBtn()"
          icon
          v-if="rightIconFlag"
        >
          <mu-icon
            :size="iconSize"
            :value="`:iconfont ${rightIcon}`"
          ></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <template v-for="(item, index) in menuList">
            <mu-list-item
              :key="index"
              @click="menuItem(item)"
              button
              v-if="item.flag"
            >
              <mu-list-item-content>
                <mu-list-item-title>{{item.title}}</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </template>
        </mu-list>
      </mu-menu>

      <!-- 自定义右侧按钮 -->
      <mu-button
        @click="customFnc"
        class="customBtn"
        flat
        slot="right"
        v-if="custom"
      >{{customTitle}}</mu-button>
    </mu-appbar>
    <mu-drawer
      :docked="false"
      :open.sync="drawerState"
      right
    >
      <slot name="drawerContent"></slot>
    </mu-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bridge from '../../static/js/JSbridge'
export default {
  name: "app-bar",
  props: {
    topLevelPage: { //用于第三方嵌入 第三方 app 判断 是否顶级页面返回
      type: Boolean,
      default: false
    },
    leftLinkName: {
      type: String
    },
    leftIcon: {
      type: String,
      default: "icon-fanhui"
    },
    iconSize: {
      type: String,
      default: "24"
    },

    pageTitle: {
      type: String,
      default: "pageTitle"
    },
    isShowRightBtn: {
      // 是否禁用右边的按钮
      type: Boolean,
      default: true
    },
    rightIcon: {
      type: String
    },
    rightLinkName: {
      type: String
    },
    rightLinkParams: {
      type: Object,
      default: () => {}
    },
    rightIconFlag: {
      type: Boolean,
      default: true
    },
    isDrawer: {
      type: Boolean,
      default: false
    },
    drawerIcon: {
      type: String
    },
    customDrawer: {
      type: Boolean,
      default: false
    },
    

    //为 true 时 menuList 是必须的
    isMenu: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => []
    },
    //是否自定义 右侧按钮
    custom: {
      type: Boolean,
      default: false
    },
    customTitle: {
      type: String
    },
    customFnc: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      menuFlag: false
    };
  },
  computed:{
    ...mapState(["crmToGroup","otherApp"])
  },
  methods: {
    leftClick() {
      if (this.leftLinkName) {
        this.goPage(this.leftLinkName);
      } else {
        if(this.topLevelPage && this.otherApp){
          // 调用原生关闭 webView
          bridge.callHandler("returnBack", null, null);
        }else{
          console.log('go -1 :')
          this.$router.go(-1);
        }
      }
    },
    rightBtn() {
      if (!this.isMenu) {
        this.goPage(this.rightLinkName, this.rightLinkParams);
      }
    },
    menuItem(item) {
      const { isLink, title, linkName, linkParams = {} } = item;
      if (isLink) {
        this.goPage(linkName, linkParams);
      } else {
        this.$emit("menuChange", item);
        this.menuFlag = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.app-bar {
  .title{
    font-size:18px;
  }
  .mu-popover {
    top: 52px !important;
    right: 2px !important;
  }
  .customBtn {
    color: @primary;
    font-size: @primary-size;
  }
  .mu-drawer{
    width: 70%;
    padding: 46px 25px;
  }
  .drawerTitle {
    font-size: 20px;
    font-weight: @primary-weight;
    color: @primary-text;
  }
  .drawerContent {
    margin-top: 20px;
  }
}
</style>

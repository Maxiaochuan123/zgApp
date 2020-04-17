<template>
  <div class="app-bar">
    <mu-appbar z-depth="0">

      <!-- 左侧按钮 -->
      <mu-button @click="$router.go(-1)" icon slot="left" v-if="isGoBack">
        <mu-icon size="24" value=":iconfont icon-fanhui"></mu-icon>
      </mu-button>

      <!-- 标题 -->
      <span class="title">{{ pageTitle }}</span>

      <!-- 右侧筛选按钮 -->
      <mu-button @click="openDrawerState" icon slot="right" v-if="guolv">
        <mu-icon size="24" value=":iconfont icon-guolv"></mu-icon>
      </mu-button>
      

      <!-- 右侧菜单按钮 -->
      <mu-menu :open.sync="menuStatus" placement="bottom-end" slot="right" v-if="menuList.length > 0 && !custom">
        <mu-button icon>
          <mu-icon size="18" value=":iconfont icon-gengduo1"></mu-icon>
        </mu-button>

        <mu-list slot="content">
          <template v-for="(item, index) in menuList">
            <mu-list-item button :key="index" @click="menuItem(item)" v-if="item.flag" >
              <mu-list-item-content>
                <mu-list-item-title>{{ item.title }}</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </template>
        </mu-list>
      </mu-menu>

      <!-- 自定义右侧按钮 -->
      <mu-button icon slot="right" @click="customCallback" v-if="custom" >
        <mu-icon size="18" :value="`:iconfont ${customIcon}`"></mu-icon> 
        {{ customIcon ? '' : customText }}
      </mu-button>

    </mu-appbar>
    <mu-drawer :docked="false" :open.sync="drawerState" right>
      <Screen v-bind="$attrs" v-on="$listeners"></Screen>
    </mu-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import bridge from "../../static/js/JSbridge";
import Screen from "@components/Screen";
export default {
  name: "app-bar",
  components: {
    Screen
  },
  props: {
    // 是否显示返回按钮
    isGoBack: {
      type: Boolean,
      default: true
    },

    // 标题
    pageTitle: {
      type: String,
      default: "pageTitle"
    },

    // 筛选按钮
    guolv: {
      type: Boolean,
      default: false
    },

    // 右侧菜单
    menuList: {
      type: Array,
      default: () => []
    },

    //是否自定义 右侧按钮
    custom: {
      type: Boolean,
      default: false
    },
    // 文字按钮
    customText: {
      type: String
    },
    //图标按钮
    customIcon: {
      type: String
    },
    // 方法
    customCallback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      menuStatus: false
    };
  },
  methods: {
    leftClick() {
      this.$router.go(-1);
    },
    menuItem(item) {
      const { title, linkName, linkParams = {} } = item;
      if (linkName) {
        this.goPage(linkName, linkParams);
      } else {
        this.$emit("menuChange", item);
        this.menuStatus = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app-bar {
  .title {
    font-size: 18px;
  }
  .mu-popover {
    top: 52px !important;
    right: 2px !important;
  }
  .mu-drawer {
    width: 76%;
    padding: 46px 0;
  }
  .drawerTitle {
    font-size: 20px;
    font-weight: @primary-weight;
    color: @primary-text;
  }
}
</style>

<!--
 * @Description: 底部导航,不同于主页的底部
 * @Author:shenah
 -->
<template>
  <div class="foot-nav">
    <template v-for="(item,index) in list">
      <div
        :key="index"
        @click="navItem(item)"
        class="nav-item"
        v-if="item.flag"
      >
        <img :src="item.img" />
        <div class="text">{{item.label}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "FootNav",
  components: {},
  data() {
    return {};
  },
  props: {
    list: {
      // 数组对象
      // img => 图片的地址
      // label => 显示的名字
      // linkName=> 跳转的链接
      // isLink => 是否跳转链接
      // type => 代表的是点击的哪个
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    navItem(item) {
      let { linkName, isLink, linkParams } = item;
      if (isLink) {
        this.goPage(linkName, linkParams);
      } else {
        this.$emit("footNavChange", item);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.foot-nav {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 0 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
  position: fixed;
  bottom: 0;
  height: 87px;
  box-shadow: 0px 16px 23px 0px rgba(159, 159, 159, 1);
  z-index: 100;
  .nav-item {
    display: flex;
    margin: 6px 10px 6px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      position: relative;
      width: 40px;
      height: 40px;
    }
    .text {
      padding-top: 4px;
      font-size: 14px;
      color: @primary-text;
    }
  }
}
</style>
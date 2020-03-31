<!--
 * @Description: 展开与收缩的面板
 * @Author: shenah
 * @Date: 2020-03-31 10:32:28
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-31 11:05:36
 -->
<template>
  <div class="open-shrink">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="title-line">
      <mu-divider></mu-divider>
    </div>
    <!-- 默认展示内容 -->
    <div class="default-show">
      <slot name="default-show"></slot>
    </div>
    <!-- 点击按钮展示 -->
    <transition name="open">
      <div
        class="click-show"
        v-show="isShow"
      >
        <slot name="click-show"></slot>
      </div>
    </transition>
    <div
      @click="changeArrow"
      class="open-btn"
    ></div>
  </div>
</template>

<script>
export default {
  name: "OpenShrink",
  components: {},
  data() {
    return {
      isShow: true
    };
  },
  props: {
    defaultValue: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.isShow = this.defaultValue;
  },
  methods: {
    changeArrow() {
      let el = document.querySelector(".open-shrink .open-btn");
      if ([...el.classList].indexOf("rotate-rignth180") > -1) {
        el.classList.remove("rotate-rignth180");
        this.isShow = false;
      } else {
        el.classList.add("rotate-rignth180");
        this.isShow = true;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.open-shrink {
  position: relative;
  background-color: #fff;
  width: 100%;
  padding-bottom: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    color: @primary-text;
  }
  .default-show,
  .click-show {
    padding: 0 10px;
    width: 100%;
    height: auto;
  }
  .title-line {
    padding: 0 0 12px 10px;
  }
  .open-btn {
    position: absolute;
    bottom: 4px;
    left: 50%;
    margin-left: -9px;
    width: 18px;
    height: 18px;
    background: url("../../static/images/arrow.png") no-repeat;
    background-size: 100%;
    transform: rotate(0deg);
    transition: transform 0.3s;
    transform-origin: center center;
  }
  .open-enter-active,
  .open-leave-active {
    height: auto;
    transition: all 0.3s ease;
  }
  .open-enter,
  .open-leave-to {
    height: 0;
  }
}
</style>
<!--
 * @Description: 展开与收缩的面板
 * @Author: shenah
 * @Date: 2020-03-31 10:32:28
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-31 15:34:39
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
      :class="{'rotate-rignth180':isShow}"
      @click="changeArrow"
      class="open-btn"
      v-if="showOpen"
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
    },
    showOpen: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.isShow = this.defaultValue;
  },
  methods: {
    changeArrow() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang='less' scoped>
</style>
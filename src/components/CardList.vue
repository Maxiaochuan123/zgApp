<!--
 * @Description: 卡片列表
 * @Author: shenah
 * @Date: 2020-04-09 14:17:46
 * @LastEditors: shenah
 * @LastEditTime: 2020-04-09 15:01:13
 -->

<template>
  <div class="card-list">
    <!-- title -->
    <div class="title">
      <div class="title-wrap">
        <slot name="title"></slot>
      </div>
      <mu-divider></mu-divider>
    </div>
    <!-- 内容 -->
    <div class="card-content">
      <slot></slot>
    </div>
    <!-- 结尾 -->
    <div class="footer">
      <mu-divider></mu-divider>
      <div class="footer-wrap">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  components: {},
  data() {
    return {};
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.card-list {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid @primary-border;
  padding: 0 16px;
  .title {
    width: 100%;
    .title-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      font-size: @primary-size;
      font-weight: @primary-weight;
      color: @primary-text;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
    }
  }
  .card-content {
    min-height: 80px;
  }
  .footer {
    width: 100%;
    .footer-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      color: @primary-text;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
    }
  }
}
</style>
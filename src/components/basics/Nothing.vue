<!--
 * noData => 暂无数据
 * dataError => 数据获取失败
 -->
<template>
  <div class="nothing">
    <div class="no">
      <img :src="loadImage(`${imgType}.png`)" class="bc-img" />
      <div class="text">{{describe}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nothing",
  props: {
    imgType: {
      type: String,
      default: "noData"
    },
    describe: {
      type: String,
      default: "暂无数据"
    }
  }
};
</script>
<style lang='less' scoped>
.nothing {
  width: 100%;
  height: 100%;
  .no {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .bc-img {
      width: 254px;
      height: 254px;
      margin-top: -150px;
    }
    .text {
      font-size: @primary-size;
      color: @primary-text;
      text-align: center;
    }
  }
}
</style>
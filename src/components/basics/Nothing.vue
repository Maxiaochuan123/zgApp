<!--
 * @Description: 没有任何东西
 * type: 描诉
 * no-content => 暂无线索,客户,公海,待办,日报,任务
 * no-network => 暂无网络
 * no-orders =>  暂无订单
 * no-visits =>  暂无拜访
 * @Author: shenah
 -->
<template>
  <div class="nothing">
    <div class="no">
      <img
        :src="loadingImg(`${type}.png`)"
        class="bc-img"
      />
      <div class="text">{{words}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nothing",
  components: {},
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: "no-content"
    },
    words: {
      type: String,
      default: "暂无数据"
    }
  },
  mounted() {},
  methods: {}
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
    }
    .text {
      font-size: @primary-size;
      color: @primary-text;
      text-align: center;
    }
  }
}
</style>
<!--
 * @Description: 多选展示列表
 * @Author: shenah
 * @Date: 2019-10-21 17:18:33
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-22 09:49:41
 -->

<template>
  <div class="multiple-show-list">
    <div
      :key="index"
      class="show-select-list-item"
      v-for="(item,index) in list"
    >
      <mu-avatar
        class="item-header"
        size="48"
      >
        <img :src="changeImg(item)" />
        <img
          :src="loadingImg('delete.png')"
          @click.stop="del(item)"
          class="close"
        />
      </mu-avatar>
      <div>{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleShowList",
  components: {},
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  methods: {
    changeImg(row) {
      let src = row.img;
      if (!row.img) {
        src = this.loadingImg("default-header.png");
      }
      return src;
    },
    del(row) {
      this.$emit("multipleShowListChange", {row,type:this.type});
    }
  }
};
</script>
<style lang='less' scoped>
.multiple-show-list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .show-select-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 10px 10px 0;
    font-size: @regular-size;
    color: @primary-text;
    .item-header {
      position: relative;
      margin-bottom: 4px;
      .close {
        position: absolute;
        top: -4px;
        right: -2px;
        z-index: 100;
        width: 20px;
        height: 20px;
      }
    }
    /deep/ .mu-avatar{
      background-color: transparent;
    }
  }
}
</style>
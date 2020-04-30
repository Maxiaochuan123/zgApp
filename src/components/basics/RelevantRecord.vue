<!-- 相关记录 -->
<template>
  <div class="progress-column">
    <div v-if="record.length > 0">
      <div :key="index" class="item" v-for="(item, index) in record">
        <div class="item-left">
          <div class="line"></div>
          <div class="circular"></div>
        </div>
        <div class="item-right">
          <div class="time">{{ item.createTime }}</div>
          <div class="node">
            <mu-avatar class="node-left" size="36">
              <img :src="item.userImg" />
            </mu-avatar>
            <div class="node-right">
              <div class="name">{{ item.realname }}</div>
              <div class="talk">{{ item.content }}</div>
              <div class="sub-info">
                <label>操作类型:</label>
                <span>{{ item.operationType }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Nothing words="暂无相关记录"></Nothing>
    </div>
  </div>
</template>

<script>
import Nothing from "@components/basics/Nothing.vue";
export default {
  name: "FollowRecord",
  components: { Nothing },
  data() {
    return {};
  },
  props: {
    record: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.progress-column {
  padding: 30px 15px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
  .item {
    position: relative;
    display: flex;
    flex-basis: 50%;
    flex-shrink: 1;
    .item-left {
      flex-grow: 0;
      width: 20;
      .line {
        position: absolute;
        border-color: inherit;
        background-color: @primary-border;
        width: 1px;
        top: 0;
        bottom: 0;
        left: 10px;
      }
      .circular {
        position: relative;
        width: 20px;
        height: 20px;
        // background: url("../../static/images/time-stamp.png") no-repeat;
        background-size: 100% 100%;
        z-index: 100;
      }
    }
    .item-right {
      overflow: hidden;
      padding: 0 10px 30px;
      .time {
        font-size: @regular-size;
        color: @regular-text;
      }
      .node {
        margin-top: 24px;
        display: flex;
        overflow: hidden;
        .node-left {
          width: auto;
        }
        .node-right {
          width: 100%;
          flex: 1;
          margin-left: 10px;
          overflow: hidden;
          .show-upload {
            margin: 20px 0 0 0;
          }
          .name {
            font-size: @primary-size;
            color: @primary-text;
            font-weight: @primary-weight;
          }
          .talk {
            margin-top: 4px;
            font-size: @regular-size;
            color: @primary-text;
          }
          .images {
            margin: 20px 0 8px 0;
          }
          .sub-info {
            margin-top: 4px;
            font-size: @regular-size;
            color: @regular-text;
          }
        }
      }
    }
  }
}
</style>

<!-- 跟进记录 -->
<template>
  <div class="progress-column">
    <div v-if="record.length > 0">
      <div
        :key="index"
        class="item"
        v-for="(item,index) in record"
      >
        <div class="item-left">
          <div class="line"></div>
          <div class="circular"></div>
        </div>
        <div class="item-right">
          <div class="time">{{item.createTime}}</div>
          <div class="node">
            <mu-avatar
              class="node-left"
              size="36"
            >
              <img :src="item.userImg" />
            </mu-avatar>
            <div class="node-right">
              <div class="name">{{item.realname}}</div>
              <div class="talk">{{item.content}}</div>
              <UploadList
                :customEnclosureList="item.file"
                :customImgList="item.img"
                :isEdit="false"
                :ishasAfferent="false"
                :isShowAll="false"
                class="show-upload"
              ></UploadList>
              <div class="sub-info">
                <label>跟进类型:</label>
                <span>{{item.category}}</span>
              </div>
              <div class="sub-info">
                <label>下次跟进时间:</label>
                <span>{{item.nextTime || '暂无跟进时间'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Nothing words="暂无跟进记录"></Nothing>
    </div>
  </div>
</template>

<script>
import UploadList from "@components/upLoad/uploadList.vue";
import Nothing from "@components/basics/Nothing.vue";
import PreviewImageBase from "@components/upLoad/components/PreviewImageBase.vue";
export default {
  name: "FollowRecord",
  components: { Nothing, PreviewImageBase, UploadList },
  data() {
    return {};
  },
  watch: {
    record(val) {
      val.forEach(item => {
        item.img.forEach(one => {
          one.src = one.filePath;
          one.progress = { progressState: 1 };
        });
        item.file.forEach(one => {
          one.progress = { progressState: 1 };
        });
      });
    }
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
<style lang='less' scoped>
  .progress-column {
    padding: 30px 15px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-flow: column;
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
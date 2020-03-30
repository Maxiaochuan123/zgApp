<!--
 * @Description: 跟进记录通用
 * @Author: shenah
 -->
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
import Nothing from "@components/Nothing.vue";
import PreviewImageBase from "@components/upLoad/components/PreviewImageBase.vue";
export default {
  name: "Record",
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
</style>
<template>
  <div class="upLoad">
    <div class="enclosure" v-if="isShowAll">
      <div :class="[isEdit ? 'title' : 'title2']">{{isEdit ? '附件' : '附件：'}}</div>
      <div class="content">
        <UpLoadImages
          :customImgList="customImgList"
          :isEdit="isEdit"
          @getImgSuccessList="getImgSuccessList"
          @parentImgLoad="parentImgLoad"
          ref="imageRef"
          v-if="isUploadImg"
        ></UpLoadImages>
        <UpLoadEnclosure
          :customEnclosureList="customEnclosureList"
          :isEdit="isEdit"
          @getEnclosureSuccessList="getEnclosureSuccessList"
          @parentEnclosureLoad="parentEnclosureLoad"
          ref="enclosureRef"
          v-if="isUploadFile"
        ></UpLoadEnclosure>
      </div>
    </div>

    <PreviewImage
      :imagesList="imgPreviewList"
      :previewIndex="previewIndex"
      :previewSrc="previewSrc"
      :previewView="previewView"
      @closePreview="closePreview"
    ></PreviewImage>
    <div class="preview">
      <div class="imgPreview">
        <div
          :class="[isAlimatin?'animation-in':'']"
          :key="index"
          class="imgList"
          v-for="(item,index) in imgPreviewList"
        >
          <img
            :src="item.src"
            @click="openPreview(item, index)"
            class="imgItem"
          />
          <img
            :src="loadingImg('delete.png')"
            @click="deleteImageItem(item)"
            class="delete"
            v-if="isEdit"
            v-show="item.progress.progressState == 1"
          />
          <div
            class="reUpload"
            v-show="item.progress.progressState == 2"
          >
            <i
              @click="$refs.imageRef.oneUpLoad(item)"
              class="iconfont icon-shangchuan"
            ></i>
          </div>
          <div
            class="loading"
            v-show="item.progress.isProgress"
          >
            <span>{{item.progress.progressNum}}%</span>
          </div>
        </div>
      </div>

      <mu-divider v-show="imgPreviewList.length > 0 && enclosureList.length > 0"></mu-divider>

      <div class="enclosurePreview">
        <div
          :class="[isAlimatin?'animation-in':'']"
          :key="index"
          class="enclosureList"
          v-for="(listItem ,index) in enclosureList"
        >
          <img src="../../../static/images/enclosure.png" />
          <div
            class="reUpload"
            v-show="listItem.progress.progressState == 2"
          >
            <i
              @click="$refs.imageRef.oneUpLoad(listItem)"
              class="iconfont icon-shangchuan"
            ></i>
          </div>
          <div
            class="loading"
            v-show="listItem.progress.isProgress"
          >
            <span>{{listItem.progress.progressNum}}%</span>
          </div>
          <div class="describe">
            <div class="title">{{ishasAfferent ? listItem.file.name : listItem.name}}</div>
            <div class="size">{{listItem.size}}</div>
          </div>
          <mu-menu
            :open.sync="listItem.openMenu"
            placement="left-start"
          >
            <i class="iconfont icon-gengduovertical"></i>
            <mu-list slot="content">
              <!-- v-show="isEdit ? /^image/.test(listItem.file.type) : /(.*)\.(jpg|bmp|gif|jpeg|tif|png|raw)$/.test(listItem.src)" -->
              <!-- <mu-list-item
                @click="operation(listItem, '查看')"
                button
              >
                <mu-list-item-title>查看</mu-list-item-title>
              </mu-list-item>-->
              <mu-list-item
                @click="operation(listItem, '下载')"
                button
              >
                <mu-list-item-title>下载</mu-list-item-title>
              </mu-list-item>
              <mu-list-item
                @click="operation(listItem, '删除')"
                button
                v-if="isEdit"
              >
                <mu-list-item-title>删除</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </div>
        <div
          class="enclosureImgPreview"
          v-show="previewView2"
        >
          <span
            @click="closePreview2"
            class="switch-close"
          >
            <i class="iconfont icon-cuo"></i>
          </span>
          <img :src="previewSrc2" />
        </div>
      </div>
    </div>
    <mu-divider shallow-inset v-show="!isEdit"></mu-divider>
  </div>
</template>

<script>
import UpLoadImages from "./components/uploadListImages";
import UpLoadEnclosure from "./components/uploadListEnclosure";
import PreviewImage from "./components/PreviewImage";
import tool from "./components/js/tool";
import tools from "@static/js/tool";
import Axios from "axios"
export default {
  name: "upLoad",
  components: { UpLoadImages, UpLoadEnclosure, PreviewImage },
  props: {
    batchId: {
      type: [String, Number],
      default: ""
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    isShowAll: {
      type: Boolean,
      default: true
    },
    ishasAfferent: {
      type: Boolean,
      default: true
    },
    isUploadFile: {
      type: Boolean,
      default: true
    },
    isUploadImg: {
      type: Boolean,
      default: true
    },
    customImgList: {
      type: Array,
      default: () => []
    },
    customEnclosureList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      guid: "", // 用于文件上传的标志
      isAlimatin: true, //是否开启动画
      imgPreviewList: [],
      previewView: false, //预览视窗
      previewSrc: "", //预览图 src
      previewIndex: 0, //预览图 下标

      enclosureList: [],
      menuList: [
        {
          title: "查看",
          isLink: false
        },
        {
          title: "下载",
          isLink: false
        },
        {
          title: "删除",
          isLink: false
        }
      ],

      previewView2: false,
      previewSrc2: ""
    };
  },
  watch: {
    customImgList(val) {
      this.imgPreviewList = val;
    },
    customEnclosureList(val) {
      this.enclosureList = val;
    }
  },
  mounted() {
    this.guid = tools.guid();
    this.imgPreviewList = this.customImgList;
    this.enclosureList = this.customEnclosureList;
  },
  methods: {
    getImgSuccessList(data) {
      this.$emit("getImgSuccessList", data);
    },
    getEnclosureSuccessList(data) {
      this.$emit("getEnclosureSuccessList", data);
    },
    parentImgLoad(data) {
      if (!this.ishasAfferent) {
        this.imgPreviewList = [...this.customImgList, ...data];
      } else {
        this.imgPreviewList = data;
      }
    },
    deleteImageItem(item) {
      if (!this.ishasAfferent) {
        let imgTempList = this.customImgList.filter(
          imgItem => imgItem.fileId !== item.fileId
        );
        this.$emit("changecustomImgList", imgTempList);
      }
      this.$refs.imageRef.deleteImageItem(item);
    },
    // 显示查看图片 view
    openPreview(item, index) {
      this.previewView = true;
      this.previewSrc = item.src;
      this.previewIndex = index;
    },
    // 关闭 图片预览 view
    closePreview(val) {
      this.previewView = val;
    },

    parentEnclosureLoad(data) {
      if (!this.ishasAfferent) {
        this.enclosureList = [...this.customEnclosureList, ...data];
      } else {
        this.enclosureList = data;
      }
    },
    operation(listItem, typeTest) {
      listItem.openMenu = false;
    
      switch (typeTest) {
        case "查看":
          if (/^image/.test(listItem.file.type)) {
            this.previewView2 = true;
            this.previewSrc2 = listItem.dataUrl;
          } else {
          }
          break;
        case "下载":
          this.downloadFile(listItem);
          break;
        case "删除":
          if (!this.ishasAfferent) {
            let editEnclosureTempList = this.customEnclosureList.filter(
              item => item.fileId !== listItem.fileId
            );
            this.$emit("changecustomEnclosureList", editEnclosureTempList);
          }
          this.$refs.enclosureRef.deleteImageItem(listItem);
          break;
      }
    },
    // 下载文件
    downloadFile(item){
      // let link = document.createElement("a");
      // link.href = item.filePath; //地址
      // link.download = item.name; //文件名
      // link.click();
      window.open(item.filePath)
    },
    
    closePreview2() {
      this.previewView2 = false;
    },
    openPreview2(item) {
      this.previewView2 = true;
      this.previewSrc2 = item;
    }
  }
};
</script>

<style scoped lang="less">
.upLoad {
  background-color: #fff;
  // padding: 0 16px;
  padding: 0 10px;
  margin-top: 12px;

  .mu-divider.shallow-inset{
    margin-left: 0;
  }

  @keyframes animation-in {
    from {
      top: -48px;
      opacity: 0.2;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }

  .animation-in {
    animation: animation-in 0.3s ease-out;
  }

  .enclosure {
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: @primary-text;
      font-size: @primary-size;
      font-weight: @regular-weight;
    }
    // 查看详情时 title
    .title2{
      color: @regular-text;
      font-size: @regular-size;
    }
    .content {
      width: 58px;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .preview {
    .imgPreview {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;

      .imgList {
        width: 48px;
        height: 48px;
        margin: 0 8px 18px 0;
        position: relative;
        .imgItem {
          width: 48px;
          height: 48px;
          border-radius: 2px;
          border: 1px solid @primary-border;
        }
        .delete {
          position: absolute;
          z-index: 20;
          width: 20px;
          height: 20px;
          top: -10px;
          right: -8px;
        }
        .loading,
        .reUpload {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: #fff;
          }
        }
        .reUpload {
          z-index: 11;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            color: #fff;
            font-size: 24px;
          }
        }
      }
    }

    .enclosurePreview {
      display: flex;
      flex-wrap: wrap;
      .enclosureImgPreview {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;

          position: absolute;
        }
        .switch-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 28px;
          height: 28px;
          z-index: 999;
          font-size: 24px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(202, 202, 202, 0.8);

          i {
            font-size: 24px;
            color: #fff;
          }
        }
      }

      .enclosureList {
        width: 100%;
        margin: 10px 0 10px;
        display: flex;
        position: relative;

        &:first-child {
          margin-top: 20px;
        }

        img {
          width: 40px;
          height: 40px;
        }
        .describe {
          width: 100%;
          overflow: hidden;
          flex: 1;
          margin-left: 10px;
          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: @primary-text;
          }
          .size {
            color: @regular-text;
          }
        }
        .mu-menu {
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .loading,
        .reUpload {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: #fff;
          }
        }
        .reUpload {
          z-index: 11;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            color: #fff;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
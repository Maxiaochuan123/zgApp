<template>
  <div class="previewUpload">
    
    <div class="preview">

        <!-- 图片预览 -->
        <div class="imgList">
          <img class="imgItem" v-for="(item, index) in previewList" :key="index" :src="`${uploadPrefix}${item.attachmentUrl}`" v-show="imgType(item.attachmentType)" @click="openImagesPreview(item, index)" />
        </div>

        <!-- 附件预览 -->
        <div class="enclosureList" v-for="(item, index) in previewList" :key="index" v-show="enclosureType(item.attachmentType)" @click="previewEnclosureOpen(item)">
          <img :src="getEnclosurType(item.attachmentType)" />
          <!-- 描述 -->
          <div class="describe">
            <div class="title textEllipsis"> {{ item.attachmentName }}</div>
          </div>
        </div>

      <!-- 点击图片预览 -->
      <PreviewImage :imagesView="imagesView" :imagesList="previewList" :previewIndex="previewIndex" :previewSrc="previewSrc" @closeImagesPreview="closeImagesPreview" ></PreviewImage>
      <!-- 点击图片预览 -->
      <PreviewEnclosure :enclosureView="enclosureView" :previewItem="previewItem" @closeEnclosurePreview="closeEnclosurePreview"></PreviewEnclosure>
    </div>
  </div>
</template>

<script>
import PreviewImage from "./components/preview/PreviewImage";
import PreviewEnclosure from "./components/preview/PreviewEnclosure";

export default {
  components: { PreviewImage, PreviewEnclosure },
  props: {
    previewList: { //列表
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 图片预览组件参数
      imagesView: false,
      previewSrc: "",
      previewIndex: 0,

      // 附件预览组件参数
      enclosureView: false,
      previewItem: {},
    }
  },
  computed: {
    imgType(){
      return (type) =>{
        return type === "png" || type === "jpg" || type === "jpeg" ? true : false;
      }
    },
    enclosureType(){
      return (type) =>{
        return type === "txt" || type === "docx" || type === "xlsx" || type === "pdf" ? true : false;
      }
    },
    getEnclosurType(){
      return (type) => {
        switch (type) {
          case "txt":
            return this.loadImage('txt.png')
          case "docx":
            return this.loadImage('word.png')
          case "xlsx":
            return this.loadImage('excel.png')
          case "pdf":
            return this.loadImage('pdf.png')
        }
      }
    }
  },
  methods: {
    openImagesPreview(item, index) {
      this.imagesView = true;
      this.previewSrc = item.attachmentUrl;
      this.previewIndex = index;
    },
    closeImagesPreview(val) {
      this.imagesView = val;
    },

    previewEnclosureOpen(item){
      this.enclosureView = true;
      this.previewItem = item;
    },
    closeEnclosurePreview(){
      this.enclosureView = false;
    }
  }
}
</script>

<style lang="less" scoped>
  .previewUpload{
    margin: 20px 0 16px;
    .preview {
      .imgList {
        display: flex;
        .imgItem {
          width: 48px;
          height: 48px;
          border-radius: 2px;
          border: 1px solid @primary-border;
          &:not(:first-child){
            margin-left: 4px;
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
          width: 24px;
          height: 24px;
        }
        .describe {
          width: 100%;
          overflow: hidden;
          flex: 1;
          margin-left: 4px;
          .title {
            width: 80%;
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
      }
    }
  }
</style>

<template>
  <div class="upLoad">
    <div class="enclosure">
      <div :class="[isEdit ? 'title' : 'title2']"> {{ isEdit ? "附件" : "附件：" }}</div>
      <div class="content">
        
        <!-- 上传图片 -->
        <Images
          :editImgList="editImgList"
          @imgLoad="imgLoad"
          ref="imageRef"
          v-if="isImg"
        ></Images>

        <!-- 上传附件 -->
        <Enclosure
          :editEnclosureList="editEnclosureList"
          @enclosureLoad="enclosureLoad"
          ref="enclosureRef"
          v-if="isEnclosure"
        ></Enclosure>

      </div>
    </div>

    <!-- 图片点击预览 -->
    <PreviewImage
      :imagesList="imgPreviewList"
      :previewIndex="previewIndex"
      :previewSrc="previewSrc"
      :imagesView="imagesView"
      @closeImagesPreview="closeImagesPreview"
    ></PreviewImage>

    <!--上传预览 -->
    <div class="preview">
      <!-- 图片预览 -->
      <div class="imgPreview">
        <div :class="[isAlimatin ? 'animation-in' : '']" :key="index" class="imgList" v-for="(item, index) in imgPreviewList" >
          <!-- 图片展示 -->
          <img :src="`${uploadPrefix}${item.successInfo.attachmentUrl}`" @click="openImagesPreview(item, index)" class="imgItem" />
          <!-- 删除 -->
          <img src="@static/images/delete.png" @click="deleteImage(item)" class="delete" v-if="isEdit" v-show="item.progress.progressState == 1" />
          <!-- 重传 -->
          <div class="reUpload" v-show="item.progress.progressState == 2">
            <i @click="$refs.imageRef.uploadHahdle(item)" class="iconfont icon-shangchuan" ></i>
          </div>
          <!-- 进度 -->
          <div class="loading" v-show="item.progress.isProgress">
            <span>{{ item.progress.progressNum }}%</span>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <mu-divider v-show="imgPreviewList.length > 0 && enclosureList.length > 0" ></mu-divider>

      <!-- 附件预览 -->
      <div class="enclosurePreview">
        <div :class="[isAlimatin ? 'animation-in' : '']" :key="index" class="enclosureList" v-for="(listItem, index) in enclosureList" >
          <img :src="getEnclosurType(listItem.successInfo.attachmentType)" />
          <!-- 重传 -->
          <div class="reUpload" v-show="listItem.progress.progressState == 2">
            <i @click="$refs.imageRef.uploadHahdle(listItem)" class="iconfont icon-shangchuan" ></i>
          </div>
          <!-- 进度 -->
          <div class="loading" v-show="listItem.progress.isProgress">
            <span>{{ listItem.progress.progressNum }}%</span>
          </div>
          <!-- 描述 -->
          <div class="describe">
            <div class="title"> {{ isEdit ? listItem.file.name : listItem.name }}</div>
            <div class="size">{{ listItem.size }}</div>
          </div>
          <!-- 更多操作 -->
          <mu-menu :open.sync="listItem.openMenu" placement="left-start">
            <i class="iconfont icon-gengduovertical"></i>
            <mu-list slot="content">
              <mu-list-item @click="operation(listItem, '删除')" button v-if="isEdit" >
                <mu-list-item-title>删除</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </div>
      </div>
      
    </div>
    <mu-divider shallow-inset v-show="!isEdit"></mu-divider>
  </div>
</template>

<script>
import Images from "./components/edit/Images";
import Enclosure from "./components/edit/Enclosure";
import PreviewImage from "./components/preview/PreviewImage";
import Axios from "axios";
export default {
  name: "upLoad",
  components: { Images, Enclosure, PreviewImage },
  props: {
    isEdit: { //编辑 or 查看
      type: Boolean,
      default: true
    },
    isEnclosure: { // 是否上传附件
      type: Boolean,
      default: true
    },
    isImg: { // 是否上传
      type: Boolean,
      default: true
    },
    preview: { //预览模式 非编辑 非查看
      type: Boolean,
      default: false
    },
    editImgList: { //编辑时传入的 图片 列表
      type: Array,
      default: () => []
    },
    editEnclosureList: { //编辑时传入的 附件 列表
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isAlimatin: true, //是否开启动画
      imgPreviewList: [],
      imagesView: false, //预览视窗
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
      ]
    };
  },
  computed: {
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
  watch: {
    // 监听 编辑时 传入的文件
    editImgList(val) {
      this.imgPreviewList = val;
    },
    editEnclosureList(val) {
      this.enclosureList = val;
    }
  },
  mounted() {
    // 设置 编辑时 传入的文件
    this.imgPreviewList = this.editImgList;
    this.enclosureList = this.editEnclosureList;
  },
  methods: {
    imgLoad(data) {
      // console.log('图片:',data)
      if (!this.isEdit) {
        this.imgPreviewList = [...this.editImgList, ...data];
      } else {
        this.imgPreviewList = data;
      }
      
      this.$emit('getImgID',this.imgPreviewList.map(item => {
        return item.successInfo.id
      }))
    },
    enclosureLoad(data) {
      // console.log("附件:",data)
      if (!this.isEdit) {
        this.enclosureList = [...this.editEnclosureList, ...data];
      } else {
        this.enclosureList = data;
      }
      this.$emit('getEnclosureID',this.enclosureList.map(item => {
        return item.successInfo.id
      }))
    },
    
    deleteImage(item) {
      this.$refs.imageRef.deleteImage(item);
    },
    // 显示查看图片 view
    openImagesPreview(item, index) {
      this.imagesView = true;
      this.previewSrc = item.src;
      this.previewIndex = index;
    },
    // 关闭 图片预览 view
    closeImagesPreview(val) {
      this.imagesView = val;
    },

    // 操作
    operation(listItem, typeTest) {
      listItem.openMenu = false;
      switch (typeTest) {
        case "删除":
          this.$refs.enclosureRef.deleteEnclosure(listItem);
          break;
      }
    },
    // 下载文件
    downloadFile(item) {
      // let link = document.createElement("a");
      // link.href = item.filePath; //地址
      // link.download = item.name; //文件名
      // link.click();
      window.open(item.filePath);
    },
  }
};
</script>

<style scoped lang="less">
.upLoad {
  background-color: #fff;
  padding: 0 15px;
  margin-top: 12px;

  .mu-divider.shallow-inset {
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
    min-height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: @primary-text;
      font-size: @primary-size;
      font-weight: @regular-weight;
    }
    // 查看详情时 title
    .title2 {
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

<template>
  <div class="upLoad">
    <div class="imgPreview">
      <div class="imgList" :class="[isAlimatin?'animation-in':'']" v-for="(item,index) in imgPreviewList" :key="index">
        <img class="imgItem" :src="item.src" @click="openPreview(item, index)">
        <img class="delete" :src="loadingImg('delete.png')" v-show="item.progress.progressState == 1" @click="deleteImageItem(item)">
        <div class="reUpload" v-show="item.progress.progressState == 2">
          <i class="iconfont icon-shangchuan" @click="$refs.imageRef.oneUpLoad(item)"></i>
        </div>
        <div class="loading" v-show="item.progress.isProgress">
          <span>{{item.progress.progressNum}}%</span>
        </div>
      </div>
      <UpLoadImage ref="imageRef" @parentImgLoad="parentImgLoad"></UpLoadImage>
      <PreviewImage :previewView="previewView" :imagesList="imgPreviewList" :previewSrc="previewSrc" :previewIndex="previewIndex" @closePreview="closePreview"></PreviewImage>
    </div>
  </div>
</template>

<script>
import UpLoadImage from './components/upLoadImages'
import PreviewImage from './components/PreviewImage'
export default {
  name:"upLoad",
  components:{ UpLoadImage,PreviewImage },
  data(){
    return{
      isAlimatin:true, //是否开启动画
      imgPreviewList:[],
      previewView:false, //预览视窗
      previewSrc:'', //预览图 src
      previewIndex:0 //预览图 下标
    }
  },
  methods:{
    parentImgLoad(data){
      this.imgPreviewList = data;
    },
    deleteImageItem(item){
      this.$refs.imageRef.deleteImageItem(item);
    },
    // 显示查看图片 view
    openPreview(item, index){
      this.previewView = true;
      this.previewSrc = item.src;
      this.previewIndex = index;
    },
    // 关闭 图片预览 view
    closePreview(val){
      this.previewView = val;
    },
  }
}
</script>

<style scoped lang="less">
  .upLoad{
    background-color: #fff;
    padding: 0 16px;

    @keyframes animation-in {
      from{
        top:-48px;
        opacity: .2;
      }
      to{
        top:0px;
        opacity: 1;
      }
    }

    .animation-in{
      animation: animation-in .3s ease-out;
    }

    .imgPreview{
      display: flex;
      flex-wrap: wrap;
      justify-content: start;

      .imgList{
        width: 70px;
        height: 70px;
        margin: 18px 8px 18px 0;
        position: relative;
        .imgItem{
          width: 70px;
          height: 70px;
          border-radius: 2px;
          border: 1px solid @primary-border;
        }
        .delete{
          position: absolute;
          z-index: 20;
          width: 20px;
          height: 20px;
          top: -10px;
          right: -8px;
        }
      }
      .loading,.reUpload{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.4);
      }
      .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          color: #fff;
        }
      }
      .reUpload{
        z-index: 11;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          color: #FFF;
          font-size: 24px;
        }
      }
    }
  }
</style>
<!--
 * @Description: In User Settings Edit 11
 * @Author: your name
 * @Date: 2019-08-08 22:47:32
 * @LastEditTime: 2019-08-21 15:13:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="imgUpload">
    <div class="push-box" @click="()=> $refs.fileInput.click()">
      <i class="iconfont icon-tianjia"></i>
      <span>添加</span>
      <input ref="fileInput" type="file" accept="image/*" multiple @change="onChange"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tool from './js/tool'
import PreviewImage from './PreviewImage'
export default {
  name: "uploadImage",
  components: {
    PreviewImage
  },
  data() {
    return {
      imagesList:[], //图片 数据集
      minSize: 1024 * 1024 * 3, //图片容量最小值
      maxSize: 1024 * 1024 * 10, //图片容量最大值
      limitedSize:false, //是否限制图片尺寸
      // maxWidth:1000, //图片最大宽度
      // maxHeight:1000, //图片最大高度

      zipBeforeSize:0, //压缩前容量
      zipAfterSize:0, //压缩后容量
      zipRatio: .50, //压缩比 0 ~ .92 默认 .92
      
      isDirectUpload:true //是否直接上传
    };
  },
  methods: {
    // 单个点击重传
    oneUpLoad(item){
      const fd = new FormData();
      fd.append('file', item.file);
      this.uploadHahdle(item,fd);
    },
    // 全部上传
    allUpload(){
      // if(!this.isDirectUpload){
        this.imagesList.forEach((item,index)=>{
          if(item.progress.progressState == 0){
            const fd = new FormData();
            fd.append('file', item.file);
            this.uploadHahdle(item, fd);
          }
          // else if(item.progress.progressState == 2){
          //   const fdError = new FormData();
          //   fdError.append('file', item.file);
          //   this.uploadHahdle(item, fdError);
          // }
        })
      // }
    },

    // 上传函数
    uploadHahdle(item,fd){
      item.progress.isProgress = true;
      item.progress.progressState = 0;
      item.progress.progressNum = 0;
      
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          item.progress.progressNum = complete;
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } 
      axios.post('https://jsonplaceholder.typicode.com/posts/', fd,config).then( res => {
        if(res.status === 201){
          item.progress.progressNum = 100; item.progress.progressState = 1;
        };
        item.progress.isProgress=false;
      }).catch( err => {
        item.progress.progressState = 2;
        item.progress.isProgress=false;
      })
    },
    // 删除图片
    deleteImageItem(item){
      this.imagesList = this.imagesList.filter(imgItem => imgItem.file.name !== item.file.name);
      this.$emit('parentImgLoad',this.imagesList)
      this.$refs.fileInput.value = '';
    },
    onChange(){
      
      const files = this.$refs.fileInput.files;
      const filesArr =  [...files].filter( fileItem =>{
        if(/^image/.test(fileItem.type)) return fileItem;
      })

      filesArr.forEach(fileItem => {
        let fileRender = new FileReader();
        fileRender.readAsDataURL(fileItem);  // file 转成 dataURL字符串
        let width,height; //图片宽度 & 高度

        fileRender.onload = fileEvent =>{
          const img = new Image();
          img.src = fileEvent.target.result;
          
          img.onload = imgEvent =>{
            // 是否限制图片尺寸
            if(this.limitedSize){
              [width,height] = tool.isLimitedSize(imgEvent, this);
            }else{
              [width,height] = [img.width,img.height];
            }

            this.canvasDrawPictures(img,width,height,fileItem);
          }
        }
      })
      
    },


    /**
     * @description: canvas 绘制图片
     * @param {img} 要绘制的图片
     * @param {width} 图片的宽度
     * @param {height} 图片的高度
     * @return: blob / base64
     */
    canvasDrawPictures(img,width,height,fileItem){
      let canvas = document.createElement('canvas');
      canvas.width = width, canvas.height = height;
      let ctx = canvas.getContext('2d');
      let zipRatioActive;
      
      
      // 是否限制图片大小
      
      if(fileItem.size >= this.maxSize){
        // let mS = tool.bytesToSize(this.maxSize)
        this.$toast.warning('图片最大不能超过: 10MB')
        return false;
      }else{
        if(fileItem.size <= this.minSize){
          zipRatioActive = .92;
        }else{
          zipRatioActive = this.zipRatio;
        }
      }

      //修复ios上传图片的时候 被旋转的问题
      tool.rotateImg(img, canvas, ctx, width, height);

      // canvas 转 base64
      let base64 = canvas.toDataURL('image/jpeg', zipRatioActive);
      let file = tool.dataUrltoFile(base64, fileItem.name.split('.')[0] + ".jpeg");
      this.imagesList.push({
        'src':URL.createObjectURL(file),
        'file':file,
        'base64':base64,
        'blob':tool.dataURLtoBlob(base64),
        'progress':{
          isProgress:false, //进度环
          progressState:0, //上传状态
          progressNum:0, //进度
        }
      }); //图片预览

      tool.removeRepeat(this);
      if(this.isDirectUpload) this.allUpload();
      this.$emit('parentImgLoad',this.imagesList)
    },
  }
};
</script>
<style lang="less">
  .imgUpload {
    background-color: #fff;
    
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

    .push-box{
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 70px;
      height: 70px;
      margin: 18px 0 18px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span{
        color: @regular-text;
      }

      i{
        font-size: 24px;
        color: @regular-text;
      }

      input[type="file"]{
        opacity: 0;
        display: none;
      }

      &:hover{
        border-color: #409eff !important;
      }
    }
  }

</style>
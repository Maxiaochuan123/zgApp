<template>
  <div class="imgUpload">
    <div class="images" @click="()=> $refs.fileInput.click()">
      <img src="@static/images/upLoadImgs.png">
      <input ref="fileInput" type="file" accept="image/*" multiple @change="onChange"/>
    </div>
  </div>
</template>

<script>
import tool from '../js/tool';

export default {
  name: "uploadImage",
  data() {
    return {
      imagesList:[], //图片 数据集
      minSize: 1024 * 1024 * 3, //图片容量最小值
      maxSize: 1024 * 1024 * 10, //图片容量最大值
      limitedSize:false, //是否限制图片尺寸
      maxWidth:1000, //图片最大宽度
      maxHeight:1000, //图片最大高度

      zipBeforeSize:0, //压缩前容量
      zipAfterSize:0, //压缩后容量
      zipRatio: .5, //压缩比 0 ~ .92 默认 .92
    };
  },
  methods: {

    // 上传函数
    uploadHahdle (item){
      item.progress.isProgress = true;
      item.progress.progressState = 0;
      item.progress.progressNum = 0;

      if(item.progress.progressState === 0){
        const fd = new FormData();
        fd.append('files', item.file);

        this.api.upLoad(fd, item).then(res => {
          if(res.message === "success"){
            item.progress.progressNum = 100; item.progress.progressState = 1; item.progress.isNew = false; item.progress.isProgress=false;

            // 把选择时处理的数据  + 上传成功后的数据 一起抛出
            this.imagesList.push({...item, successInfo:{...res.data[0]} }); this.$emit('imgLoad',this.imagesList);
          }else{
            item.progress.progressState = 2; item.progress.isProgress=false;
          }
        })
      }
    },

    // 删除图片
    deleteImage(item){
      console.log("图片删除 API")
      // Api.deleteFilesOrImgs({
      //   id:item.fileId
      // }).then(res => {
        this.imagesList = this.imagesList.filter(imgItem => {
          return imgItem.file.name !== item.file.name
        });
        this.$emit('imgLoad',this.imagesList);
        this.$refs.fileInput.value = '';
      // })
    },

    // 选择文件
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
            this.canvasDrawPictures(img,width,height,fileItem).then(res => {
              this.uploadHahdle(res)
            });
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
      return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        canvas.width = width, canvas.height = height;
        let ctx = canvas.getContext('2d');
        let zipRatioActive;
        
        
        // 是否限制图片大小
        // console.log('beforeSize:',fileItem.size)
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
        let imgdata = tool.rotateImg(img, canvas, ctx, width, height);

        // canvas 转 base64
        let base64 = canvas.toDataURL('image/jpeg', zipRatioActive);
        let file = tool.dataUrltoFile(base64, fileItem.name.split('.')[0] + ".jpeg");
        // console.log('afterFile:',file.size)
        // console.log('file:',file)

        // 获取文件处理后的对象
        let item = {
          'src':URL.createObjectURL(file),
          'file':file,
          'base64':base64,
          'blob':tool.dataURLtoBlob(base64),
          'progress':{
            isNew:true, //新图片
            isProgress:false, //进度环
            progressState:0, //上传状态
            progressTag:0, //标签
            progressNum:0, //进度
          }
        }
        resolve(item)
      })
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

    .images{
      width: 24px;
      height: 24px;
      img{
        width: 100%;
        height: 100%;
      }
      input[type="file"]{
        opacity: 0;
        display: none;
      }
    }
  }

</style>
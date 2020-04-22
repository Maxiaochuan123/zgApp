<!--
 * @Description: In User Settings Edit 11
 * @Author: your name
 * @Date: 2019-08-08 22:47:32
 * @LastEditTime : 2019-12-26 11:31:19
 * @LastEditors  : shenah
 -->
<template>
  <div class="enclosureUpload">
    <div class="enclosure" @click="()=> $refs.fileInput.click()">
      <img :src="loadingImg('upLoadFiles.png')">
      <input ref="fileInput" type="file" accept="*" multiple @change="onChange"/>
    </div>
  </div>
</template>

<script>
// import Api from '@api'
import tool from './js/tool'
export default {
  name: "uploadImage",
  data() {
    return {
      enclosureList:[], //files 数据集
      isDirectUpload:true //是否直接上传
    };
  },
  methods: {
    // 单个点击重传
    oneUpLoad(item){
      if(/^image/.test(item.file.type)){
        fd.append('type', 'img');
      }else{
        fd.append('type', 'file');
      }
      const fd = new FormData();
      fd.append('file', item.file);
      fd.append('type', 'file');
      fd.append('batchId', this.$parent.batchId?this.$parent.batchId:this.$parent.guid);
      this.uploadHahdle(item,fd);
    },
    // 全部上传
    allUpload(){
      // if(!this.isDirectUpload){
        this.enclosureList.forEach((item,index)=>{
          if(item.progress.progressState == 0){
            const fd = new FormData();
            fd.append('file', item.file);
            fd.append('type', 'file');
            fd.append('batchId', this.$parent.batchId?this.$parent.batchId:this.$parent.guid);
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
      
      // Api.uploadFilesOrImgs(fd,item).then(res => {
      //   item.progress.progressNum = 100; item.progress.progressState = 1; item.progress.isNew = false;
      //   item.progress.isProgress=false;
      //   Object.keys(res).forEach(one=> item[one] = res[one])
      // }).catch( err => {
      //   item.progress.progressState = 2;
      //   item.progress.isProgress=false;
      // })
    },
    // 删除文件
    deleteImageItem(item){
      // Api.deleteFilesOrImgs({
      //   id:item.fileId
      // }).then(res => {
      //   this.enclosureList = this.enclosureList.filter(imgItem => imgItem.fileId !== item.fileId);
      //   this.$emit('parentEnclosureLoad',this.enclosureList)
      //   this.$refs.fileInput.value = '';
      // })
     
    },
    onChange(){
      const files = this.$refs.fileInput.files;
      let typeWhiteList = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if(!typeWhiteList.includes(files[0].type)){
        this.$toast.warning('只允许上传文档')
        return false;
      }

      const filesArr = [...files].filter( fileItem =>{
        return fileItem;
      })
      filesArr.forEach(item => {
        this.enclosureList.push({
          'dataUrl':URL.createObjectURL(item),
          'file':item,
          'size':tool.bytesToSize(item.size),
          'openMenu': false,
          'progress':{
            progressState:0, //上传状态
            progressTag:0, //标签
            progressNum:0, //进度
          }
        });
      })
      this.$emit('parentEnclosureLoad',this.enclosureList);
      this.$emit('getEnclosureSuccessList',{guid:this.$parent.batchId?this.$parent.batchId:this.$parent.guid,list:this.enclosureList});
      this.allUpload();
    }
  }
};
</script>
<style lang="less">
  .enclosureUpload {
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

    .enclosure{
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
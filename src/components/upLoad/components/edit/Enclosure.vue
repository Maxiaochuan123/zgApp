<template>
  <div class="enclosureUpload">
    <div class="enclosure" @click="()=> $refs.fileInput.click()">
      <img src="@static/images/upLoadFiles.png">
      <input ref="fileInput" type="file" accept="*" multiple @change="onChange"/>
    </div>
  </div>
</template>

<script>
import tool from '../js/tool'
export default {
  name: "uploadImage",
  data() {
    return {
      enclosureList:[],
    };
  },
  methods: {

    // 上传函数
    uploadHahdle(item){
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
            this.enclosureList.push({...item, successInfo:{...res.data[0]} }); this.$emit('enclosureLoad',this.enclosureList);
          }else{
            item.progress.progressState = 2; item.progress.isProgress=false;
          }
        })
      }
    },
    // 删除文件
    deleteEnclosure(item){
      // Api.deleteFilesOrImgs({
      //   id:item.fileId
      // }).then(res => {
        this.enclosureList = this.enclosureList.filter(enclosureItem => {
          return enclosureItem.file.name !== item.file.name
        });
        this.$emit('enclosureLoad',this.enclosureList)
        this.$refs.fileInput.value = '';
      // })
     
    },
    onChange(){
      const files = this.$refs.fileInput.files;
      let typeWhiteList = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/pdf']
      if(!typeWhiteList.includes(files[0].type)){
        this.$toast.info('只允许上传 txt  world  excel  pdf');
        this.$refs.fileInput.value = '';
        return false;
      }

      const filesArr = [...files].filter( fileItem =>{
        return fileItem;
      })

      filesArr.forEach(item => {
        let file = {
          'dataUrl':URL.createObjectURL(item),
          'file':item,
          'size':tool.bytesToSize(item.size),
          'openMenu': false,
          'progress':{
            progressState:0, //上传状态
            progressTag:0, //标签
            progressNum:0, //进度
          }
        }
        this.uploadHahdle(file);
      })
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
<template>
    <div class="enclosure-preview-box" v-show="enclosureView">
      <span class="switch-close" @click="closePreview"><i class="iconfont icon-cuo"></i></span>

      <div class="content">
        <div class="svgBox">
          <svg v-show="previewItem.attachmentType === 'docx'" class="docx" viewBox="0 0 1024 1024"><path d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z" fill="#6CCBFF" p-id="1088"></path><path d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z" fill="#C4EAFF" p-id="1089"></path><path d="M280 385.6h64.8l64.8 244h0.8l71.2-244H544l72 244 65.6-244H744L648 700h-64.8L512 458.4h-0.8l-72 240.8h-64.8L280 385.6z" fill="#FFFFFF" p-id="1090"></path></svg>
          <svg v-show="previewItem.attachmentType === 'xlsx'" class="xlsx" viewBox="0 0 1024 1024"><path d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z" fill="#5ACC9B" p-id="1221"></path><path d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z" fill="#BDEBD7" p-id="1222"></path><path d="M475.2 537.6l-108.8-152h75.2l71.2 108.8 74.4-108.8h72.8l-111.2 152 116.8 161.6h-76L511.2 584l-78.4 116h-74.4l116.8-162.4z" fill="#FFFFFF" p-id="1223"></path></svg>
          <svg v-show="previewItem.attachmentType === 'txt'" class="txt" viewBox="0 0 1024 1024"><path d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z" fill="#E5E5E5" p-id="1354"></path><path d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z" fill="#CCCCCC" p-id="1355"></path><path d="M264 376h208c13.6 0 24-10.4 24-24s-10.4-24-24-24H264c-13.6 0-24 10.4-24 24s10.4 24 24 24zM264 536h496c13.6 0 24-10.4 24-24s-10.4-24-24-24H264c-13.6 0-24 10.4-24 24s10.4 24 24 24zM760 648H264c-13.6 0-24 10.4-24 24s10.4 24 24 24h496c13.6 0 24-10.4 24-24s-10.4-24-24-24z" fill="#FFFFFF" p-id="1356"></path></svg>
          <svg v-show="previewItem.attachmentType === 'pdf'" class="pdf" viewBox="0 0 1024 1024"><path d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z" fill="#FF5562" p-id="5276"></path><path d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z" fill="#FFBBC0" p-id="5277"></path><path d="M696 843.2c-50.4 0-95.2-86.4-119.2-142.4-40-16.8-84-32-126.4-42.4-37.6 24.8-100.8 61.6-149.6 61.6-30.4 0-52-15.2-60-41.6-6.4-21.6-0.8-36.8 5.6-44.8 12.8-17.6 39.2-26.4 79.2-26.4 32 0 72.8 5.6 118.4 16.8 29.6-20.8 59.2-44.8 85.6-70.4-12-56-24.8-146.4 8-188 16-20 40.8-26.4 70.4-17.6 32.8 9.6 44.8 29.6 48.8 44.8 13.6 54.4-48.8 128-91.2 171.2 9.6 37.6 21.6 76.8 36.8 112.8C663.2 704 735.2 744 743.2 788c3.2 15.2-1.6 29.6-13.6 41.6-10.4 8.8-21.6 13.6-33.6 13.6z m-74.4-121.6c30.4 61.6 59.2 90.4 74.4 90.4 2.4 0 5.6-0.8 10.4-4.8 5.6-5.6 5.6-9.6 4.8-12.8-3.2-16-28.8-42.4-89.6-72.8z m-296-82.4c-39.2 0-50.4 9.6-53.6 13.6-0.8 1.6-4 5.6-0.8 16.8 2.4 9.6 8.8 19.2 29.6 19.2 25.6 0 62.4-14.4 105.6-40-31.2-6.4-58.4-9.6-80.8-9.6z m158.4-4.8c25.6 7.2 52 16 76.8 25.6-8.8-23.2-16-47.2-22.4-70.4-17.6 15.2-36 30.4-54.4 44.8zM583.2 376c-8.8 0-15.2 3.2-20.8 9.6-16.8 20.8-18.4 73.6-5.6 140.8 48.8-52 75.2-100 68.8-125.6-0.8-4-4-15.2-26.4-21.6-6.4-2.4-11.2-3.2-16-3.2z" fill="#FFFFFF" p-id="5278"></path></svg>
          <svg v-show="previewItem.attachmentType !== 'docx' && previewItem.attachmentType !== 'xlsx' && previewItem.attachmentType !== 'txt' && previewItem.attachmentType !== 'pdf' "  class="error">
            <path d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z" fill="#E5E5E5" p-id="1487"></path>
            <path d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z" fill="#CCCCCC" p-id="1488"></path>
          </svg>
        </div>
        <div class="size">{{ previewItem.attachmentSize | bytesToSize}}</div>
        <div class="text">{{ previewItem.attachmentName }}</div>
      </div>
      <div class="operation" v-show="previewItem.attachmentType !== 'txt'">
        <div class="download" @click="download"> {{ systemt === 'iOS' && previewItem.attachmentType === 'pdf' ? '预 览' : '下 载'}}</div>
      </div>
    </div>
</template>

<script>
import tool from "../js/tool";

export default {
  props: {
    enclosureView:{ //是否显示预览视窗
      type:Boolean,
      default:false
    },
    previewItem:{ //预览项
      type:Object,
      default:()=>{}
    }
  },
  filters: {
    bytesToSize(size){
      return tool.bytesToSize(size);
    }
  },
  computed:{
    systemt(){
      return this.tool.getSystem();
    }
  },
  methods: {
    closePreview(){
      this.$emit('closeEnclosurePreview', false);
    },
    download(){
      let src = `${this.uploadPrefix}${this.previewItem.attachmentUrl}`;
      if(this.systemt === 'Android'){
        if(!document.querySelector('#previewIframe')){
          let iframe = document.createElement('iframe');
          iframe.id = 'previewIframe'
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }else{
          let iframe = document.querySelector('#previewIframe');
          iframe.src = src
        }
      }else if(this.systemt === 'iOS'){
        window.open(src)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .enclosure-preview-box{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgb(255, 255, 255);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .switch-close{
      position: absolute;
      width: 44px;
      height: 44px;
      font-size: 24px;
    }

    .switch-close{
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      z-index: 999;
      border-radius: 50%;
      background-color: rgba(0,0,0,.3);

      i{
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 0px;
        left: 4px;
      }
    }

    .content{
      width: 200px;
      margin-top: 140px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;

      svg{
        height: 150px;
      }

      .size{
        color: #9F9F9F;
      }
      .text{
        margin-top: 12px;
        font-size: 18px;
      }
    }

    .operation{
      width: 100%;
      height: 44px;
      padding: 0 10px;
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      .download{
        height: 100%;
        line-height: 44px;
        text-align: center;
        border-radius: 4px;
        width: 80%;
        color: #409eff;
        border: 1px solid #b3d8ff;
        background-color: #ecf5ff;
        &:active{
          color: #3a8ee6;
          border: 1px solid #3a8ee6;
        }
      }
    }
  }
</style>

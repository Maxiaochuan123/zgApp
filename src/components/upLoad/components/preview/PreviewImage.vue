<template>
  <div class="image-preview-box" v-show="imagesView">
    <span class="switch-close" @click="closePreview"><i class="iconfont icon-cuo"></i></span>
    <div ref="pageDiv" class="imgBox" @touchmove="moveHandler($event)" @touchend="moveHanEnddler($event)">
      <img ref="actionMgr" :src="`${uploadPrefix}${currentPreviewSrc}`" :style="transform.template()" v-finger:pinch="pinchHandler" @touchstart="onmousedown($event)">
      <div class="imgThumbnail">
        <div v-for="(item,index) in imagesList" :key="index">
          <div :id="`tag-${index}`" :class="[currentPreviewIndex === index ? 'activeBorder' : '']" v-show="imgType(item.attachmentType)">
            <img :src="`${uploadPrefix}${item.attachmentUrl}`" @click="setActiveImg(index)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    imagesView:{ //是否显示预览视窗
      type:Boolean,
      default:false
    },
    imagesList:{ //图片列表
      type:Array,
      default: ()=> []
    },
    previewSrc:{ //预览图 src
      type:String,
      default:''
    },
    previewIndex:{ //预览图 下标
      type:Number,
      default:0
    },
    testImgState:{ //是否检测图片上传状态
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      currentPreviewSrc: this.previewSrc,
      currentPreviewIndex: this.previewIndex,
      transform:{ //查看图片过渡效果
        state:true,
        scale:1, //缩放比例
        zoomMultiple:false, //2倍数缩放
        speed:.3,//过渡速度
        template:() =>  this.transform.state ? `
                          transform: scale(${this.transform.scale});
                          transition: transform ${this.transform.speed}s ease;
                        ` : '',
        init:() => {this.transform.state=true; this.transform.scale=1; this.transform.zoomMultiple=false;}
      },
      mousedownState: true, //鼠标默认抬起
      iX: 0,//鼠标坐标 与 拖拽按钮 间距 x
      iY: 0//鼠标坐标 与 拖拽按钮 间距 y
    }
  },
  watch:{
    imagesView(newVal,oldVal){
      if(newVal){
        this.$nextTick(()=>{
          this.resetPosition();
          document.querySelector(`#tag-${this.previewIndex}`).scrollIntoView(true);
        })
      }
    },
    previewSrc(newVal,oldVal){
      this.currentPreviewSrc = newVal;
    },
    previewIndex(newVal,oldVal){
      this.currentPreviewIndex = newVal;
    }
  },
  methods:{
    pinchHandler(e){
      this.getZoom(e)
    },
    setActiveImg(index){
      this.currentPreviewSrc = this.imagesList[index].attachmentUrl || this.imagesList[index];
      this.currentPreviewIndex = index;
      this.resetPosition();
    },
    resetPosition(){
      this.$nextTick(()=>{
        let styleTop = (this.$refs.pageDiv.clientHeight / 2) - (this.$refs.actionMgr.clientHeight / 2);
        this.$refs.actionMgr.style.left = 0;
        this.$refs.actionMgr.style.top = styleTop + 'px';
        this.transform.scale = 1;
      })
    },
    onmousedown(event) {
      /* 此处判断  pc 或 移动端 得到 event 事件 */
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      // 鼠标点击 面向页面 的 x坐标 y坐标
      let { clientX, clientY } = touch;
      // 鼠标x坐标 - 拖拽按钮x坐标  得到鼠标 距离 拖拽按钮 的间距
      this.iX = clientX - this.$refs.actionMgr.offsetLeft;
      // 鼠标y坐标 - 拖拽按钮y坐标  得到鼠标 距离 拖拽按钮 的间距
      this.iY = clientY - this.$refs.actionMgr.offsetTop;
      // 设置当前 状态为 鼠标按下
      this.mousedownState = true;
    },
    moveHandler(e){
      //鼠标按下 切移动中
      if (this.mousedownState) {
        /* 此处判断  pc 或 移动端 得到 event 事件 */
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        // 鼠标移动时 面向页面 的 x坐标 y坐标
        let { clientX, clientY } = touch;
        //当前页面全局容器 dom 元素  获取容器 宽高
        let {
          clientHeight: pageDivY,
          clientWidth: pageDivX
        } = this.$refs.pageDiv;
        /* 鼠标坐标 - 鼠标与拖拽按钮的 间距坐标  得到 拖拽按钮的 左上角 x轴y轴坐标 */
        let [x, y] = [clientX - this.iX, clientY - this.iY];

        //拖拽按钮 dom 元素  获取 宽高 style 对象
        let {
          clientHeight: actionMgrY,
          clientWidth: actionMgrX,
          style: actionMgrStyle
        } = this.$refs.actionMgr;
        /* 此处判断 拖拽按钮 如果超出 屏幕宽高 或者 小于  
           设置 屏幕最大 x=全局容器x y=全局容器y 否则 设置 为 x=0 y=0 
        */
        // if (x > pageDivX - actionMgrX) x = pageDivX - actionMgrX;
        // else if (x < 0) x = 0;
        // if (y > pageDivY - actionMgrY) y = pageDivY - actionMgrY;
        // else if (y < 0) y = 0;
        // 计算后坐标  设置 按钮位置
        actionMgrStyle.left = `${x}px`;
        actionMgrStyle.top = `${y}px`;
        actionMgrStyle.bottom = "auto";
        actionMgrStyle.right = "auto";
        // 当按下键滑动时， 阻止屏幕滑动事件
        event.preventDefault();
      }
    },
    moveHanEnddler(e){
      this.mousedownState = false;
    },
    // 图片 放大/缩小
    getZoom(e){
      let tempNum = this.transform.scale;
      if(parseInt(e.zoom) > 0){
        tempNum += .1;
        if(tempNum >= 1.8){
          tempNum = 1.8;
        }
        this.transform.scale = parseFloat(tempNum.toFixed(1));
      }else{
        tempNum -= .1;
        if(tempNum <= .4){
          tempNum = .4;
        }
        this.transform.scale = parseFloat(tempNum.toFixed(1));
      }
    },
    // 上一张图
    arrowLeft(){
      let arrowLeftIndex = this.currentPreviewIndex <= 0 ? 0 : --this.currentPreviewIndex;
      this.currentPreviewSrc = this.imagesList[arrowLeftIndex].attachmentUrl;
    },
    // 下一张图
    arrowRight(){
      let arrowRightIndex = this.currentPreviewIndex >= this.imagesList.length-1 ? this.imagesList.length-1 : ++this.currentPreviewIndex;
      this.currentPreviewSrc = this.imagesList[arrowRightIndex].attachmentUrl;
    },
    // 关闭查看器
    closePreview(){
      this.resetPosition();
      this.$emit('closeImagesPreview', false);
      this.transform.init();
    }
  },
  computed:{
    isArrowLeft(){
      return this.currentPreviewIndex > 0;
    },
    isArrowRight(){
      return this.currentPreviewIndex !== this.imagesList.length - 1;
    },
    imgType(){
      return (type) =>{
        return type === "png" || type === "jpg" || type === "jpeg" ? true : false;
      }
    }
  }
}
</script>

<style lang="less" scope>
  .image-preview-box{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .imgBox{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 100%;
        position: absolute;
      }

      .imgThumbnail{

        width: 100%;
        height: 60px;
        background-color: rgba(0,0,0,.3);
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: scroll;

        div div{
          width: 52px;
          height: 52px;
          margin-right: 6px;
          flex-shrink: 0;
          border: 2px solid transparent;
          display: flex;
          justify-content: center;
          align-items: center;

          img{
            width: 46px;
            height: 46px;
          }
        }
        .activeBorder{
          border: 2px solid cornflowerblue;
        }
        
      }
    }
    

    span{
      z-index: 999;
    }

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
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(202, 202, 202, 0.8);

      i{
        font-size: 24px;
        color: #fff;
      }
    }
  }
</style>
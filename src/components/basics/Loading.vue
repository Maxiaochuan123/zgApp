<template>
  <div class="loadingBox">
    
    <div class="loading">
      <div class="block">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <span>loading ...</span>
      <!-- <span>加载中 ...</span> -->
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="less" scoped>
  .loadingBox{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0px 2px 6px 0px #ededed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
      color: #fff;
      font-size: 16px;
      margin-top: 8px;
    }
    .block{
      div {
        background-color: #fff;
        height: 40px;
        width: 6px;
        display: inline-block;
        animation: stretchdelay 1.2s infinite ease-in-out;
      }
      .rect2 {
        animation-delay: -1.1s;
      }
      
      .rect3 {
        animation-delay: -1.0s;
      }
      
      .rect4 {
        animation-delay: -0.9s;
      }
      
      .rect5 {
        animation-delay: -0.8s;
      }
      
      @-webkit-keyframes stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
        20% { -webkit-transform: scaleY(1.0) }
      }
      
      @keyframes stretchdelay {
        0%, 40%, 100% {
          transform: scaleY(0.4);
          -webkit-transform: scaleY(0.4);
        }  20% {
          transform: scaleY(1.0);
          -webkit-transform: scaleY(1.0);
        }
      }
    }
  }
</style>

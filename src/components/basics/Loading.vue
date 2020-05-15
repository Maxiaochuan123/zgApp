<template>
  <div class="loadingBox">
    <div class="fut"></div>
    <div class="loading">
      <!-- <div class="block">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <span>loading ...</span> -->

      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
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
  .fut{
    width: 120px;
    height: 120px;
    position: fixed;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.4);
    filter: blur(2px);
  }
  .loading{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    opacity:0.7;
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

    // 动画 1
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

    // 动画 2
    .loader {
      position: absolute;
      width: 64px;
      height: 64px;
    }

    .inner {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;  
    }

    .inner.one {
      left: 0%;
      top: 0%;
      animation: rotate-one 1s linear infinite;
      border-bottom: 3px solid #EFEFFA;
    }

    .inner.two {
      right: 0%;
      top: 0%;
      animation: rotate-two 1s linear infinite;
      border-right: 3px solid #EFEFFA;
    }

    .inner.three {
      right: 0%;
      bottom: 0%;
      animation: rotate-three 1s linear infinite;
      border-top: 3px solid #EFEFFA;
    }

    @keyframes rotate-one {
      0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @keyframes rotate-two {
      0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @keyframes rotate-three {
      0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }
  }
</style>

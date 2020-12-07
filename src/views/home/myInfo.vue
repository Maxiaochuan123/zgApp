<template>
  <div class="myInfo">
    <div class="back"></div>
    <div class="content">
      <div class="header">
        <p>我的</p>
        <div class="userInfo" @click="goPage('userDetails')">
          <div class="describe">
            <p>{{ userInfo.userName }}</p>
            <p>{{ userInfo.comment }}</p>
          </div>
          <div class="headerImg">
            <img :src=" userInfo.headIcon ? userInfo.headIcon : loadImage('defaultHeadPortrait.png') " />
          </div>
        </div>
      </div>
      <div class="functionalArea">
        <div class="fncBlock">
          <div>
            <img src="@static/images/aboutUs.png">
            <span>关于我们</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
        <div class="underline"></div>
        <div class="fncBlock">
          <div>
            <img src="@static/images/helpExplain.png">
            <span>帮助说明</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
        <div class="underline"></div>
        <div class="fncBlock">
          <div>
            <img src="@static/images/setting.png">
            <span>我的设置</span>
          </div>
          <i class="iconfont icon-rightArrow"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scope lang="less">
.myInfo {
  .back{
    height: 146px;
    background-color: @primary;
    z-index: 10;
  }
  .content{
    width: 100vw;
    height: 500px;
    padding: 0 15px;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    .header{
      >p{
        height: 44px;
        line-height: 44px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        margin: 24px 0;
      }
      .userInfo{
        width: 100%;
        height: 114px;
        border-radius:6px;
        background-color: #fff;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .describe{
        p:nth-child(1){
          color: @primary-text;
          font-size: 20px;
        }
        p:nth-child(2){
          margin-top: 4px;
          color: @regular-text;
          font-size: @primary-size;
        }
      }
      .headerImg{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
    }
    .functionalArea{
      margin-top: 12px;
      padding: 0 16px;
      background-color: #fff;
      position: relative;

      .fncBlock{
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
          display: flex;
          align-items: center;
          img{
            width: 24px;
            height: 24px;
          }
          span{
            margin-left: 10px;
            color: @primary-text;
            font-size: @primary-size;
          }
        }
      }
      .underline{
        width: 79%;
        height: 0.5px;
        background-color: @primary-border;
        position: absolute;
        right: 22px;
      }
    }
  }
}
</style>
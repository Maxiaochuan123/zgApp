<template>
  <div class="skeleton">

    <section v-if="skeletonType === '1'">
      <div class="lightui1" v-for="(item ,index) in 4" :key="index">
        <div class="lightui1-shimmer">
          <div class="content">

            <div class="header">
              <div class="block"> <div class="ct"></div> </div>
              <div class="occupy brbottom"></div>
            </div>

            <div class="main">
              <div class="occupy"></div>
              <div><div class="ct"></div></div>
              <div class="occupy"></div>
              <div><div class="ct"></div></div>
              <div class="occupy"></div>
              <div><div class="ct"></div></div>
              <div class="occupy brbottom"></div>
              <div class="occupy"></div>
            </div>

            <div class="foot">
              <div class="block"> <div class="ct"></div> </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section v-if="skeletonType === '2'">
      <div class="lightui2" v-for="(item ,index) in 8" :key="index">
        <div class="lightui1-shimmer">
          <div class="content">

            <div class="main">
              <div><div class="ct"></div></div>
              <div class="occupy"></div>
              <div><div class="ct"></div></div>
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  props:{
    skeletonType:{
      type: String,
      default: '1'
    }
  }
}
</script>

<style lang="less" scoped>
  .skeleton{
    .lightui1, .lightui2{
      margin-top: 12px;
      padding: 12px 20px;
      background: #fff;
    }

    .lightui2{
      padding: 12px 15px;
    }

    .lightui1-shimmer {
      background: #d8d8d8;
      background-image: linear-gradient(to right, #d8d8d8 0%, #bdbdbd 20%, #d8d8d8 40%, #d8d8d8 100%);
      background-repeat: no-repeat;
      
      position: relative;
      animation: placeHolderShimmer 1s linear infinite;

      display: flex;
      .occupy{
        background-color: #fff !important;
      }
      .content{
        width: 100%;
        background-color: transparent;
        
        .brbottom{
          border-bottom: 1px solid #EDEDED;
        }

        .header, .foot{
          width: 100%;
          .block{
            display: flex;
            justify-content: center;
            .ct{
              width: 50%;
              height: 20px;
              margin-left: 70px;
              background-color: #fff;
            }
          }
          >.occupy{
            width: 100%;
            height: 12px;
          }
        }

        .foot{
          .block{
            .ct{
              width: 44%;
              margin-left: 20px;
            }
          }
        }

        .main{
          >.occupy{
            width: 100%;
            height: 12px;
          }
          >div{
            width: 100%;
            height: 20px;
            display: flex;
            justify-content: center;
            .ct{
              width: 22%;
              height: 100%;
              background-color: #fff;
            }
          }
        }
      }
    }





    @keyframes placeHolderShimmer {
      0% {
        background-position: -468px 0
      }
      100% {
        background-position: 468px 0
      }
    }
  }
</style>

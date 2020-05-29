<template>
  <div class="addSupplementInfo">
    <AppBar pageTitle="新增补充信息" shadow customTextBtn customText="保存" :customCallback="custom"></AppBar>
    <div class="contentBox">
      <div class="content-appBar">
        <div class="itemBox">
          <div class="item" v-for="(item,index) in supplementInfoList" :key="index">
            <span>{{`补充信息 ${index == 0 ? '' : index+1}`}}</span>
            <mu-text-field v-model="item.value" placeholder="请输入补充信息" multi-line :rows="1" :rows-max="6"></mu-text-field>
            <mu-icon size="24" :value="`:iconfont ${item.icon}`" @click="item.icon == 'icon-tianjia' ? addSupplementInfo(index) : reduceSupplementInfo(index)"></mu-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar"
export default {
  components: {
    AppBar
  },
  data() {
    return {
      supplementInfoList:[{
        value:"",
        icon:"icon-tianjia"
      }]
    }
  },
  methods: {
    custom(){
      
    },

    // 添加
    addSupplementInfo(index){
      this.supplementInfoList.push({
        value:"",
        icon:"icon-tianjia"
      })
      this.supplementInfoList[index].icon = "icon-jianshao";
    },

    // 减少
    reduceSupplementInfo(index){
      this.supplementInfoList = this.supplementInfoList.filter((item,i)=>{
        return i !== index;
      })
    }
    
  },
  created () {
    // console.log(this.$route.params)
  }
}
</script>

<style lang="less" scoped>
  .addSupplementInfo{
      
    .itemBox{
      color: @primary-text;
      font-size: @primary-size;
      padding: 0 15px;
      background-color: #fff;

      .item{
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        &:not(:last-child){
          border-bottom: 1px solid @primary-border;
        }
        span{
          width: 96px;
        }
        i{
          color: @primary;
          font-size: 20px;
          margin-left: 8px;
        }
        .mu-input{
          margin: 0;
          padding: 0;
          min-height: 22px;
          /deep/ .mu-input-line,
          /deep/ .mu-input-focus-line {
            display: none;
          }
        }
      }
        
    }
  }
</style>

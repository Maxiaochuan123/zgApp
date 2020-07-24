<template>
  <div class="todoList">
    <div class="header">待办事项</div>
    <div class="functionalArea">
        <div class="fncBlock" v-for="(item, index) in todoList" :key="index" @click="hanlder(item)" v-show="item.hidden">
          <div>
            <img :src="item.imgSrc">
            <span>{{item.title}}</span>
          </div>
          <span class="angleSign">{{angleSign.collection}}</span>
          <i class="iconfont icon-rightArrow"></i>
        </div>
      </div>
  </div>
</template>

<script>
import { controlInit } from "@static/js/control";
export default {
  data() {
    return {
      todoList:[
      //   {
      //   imgSrc: this.loadImage("remind.png"),
      //   title: "到期提醒",
      //   linkName: "",
      // },
      // {
      //   imgSrc: this.loadImage("archived.png"),
      //   title:"待归档",
      //   linkName: "",
      // },
      {
        imgSrc: this.loadImage("toBeCollected.png"),
        title:"待催收",
        linkName: "collection",
      }
      ],
      angleSign:{
        collection: 0
      }
    }
  },
  created(){
    let control = controlInit();
    this.todoList = [{
      imgSrc: this.loadImage("toBeCollected.png"),
      title:"待催收",
      linkName: "collection",
      hidden: control.collection.search
    }]

    this.getAngleSign();
  },
  methods: {
    getAngleSign(){
      // 到期提醒
      // 待归档
      // 待催收
      this.api.collection({...this.paging,collectionStatus:"UNCOLLECTED"}).then(res => {
        if(res.message === "success") this.angleSign.collection = res.data.count;
      })
    },
    hanlder(item){
      this.goPage("collection")
    }
  }
}
</script>

<style lang="less" scoped>
  .todoList{
    .header{
      height: 44px;
      line-height: 44px;
      color: @primary-text;
      font-size: 18px;
      text-align: center;
      background-color: #fff;
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
            width: 40px;
            height: 40px;
          }
          span{
            font-size: 16px;
            font-weight:500;
            margin-left: 10px;
            color: @primary-text;
            font-size: @primary-size;
          }
        }
        .angleSign{
          position: absolute;
          top: 18px;
          right: 40px;
          color: #fff;
          font-size: 12px;
          padding: 0 4px;
          border-radius: 4px;
          background-color: @primary;
        }
      }
    }
  }
</style>

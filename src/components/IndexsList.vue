<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 21:24:42
 * @LastEditTime : 2019-12-25 13:38:20
 * @LastEditors  : shenah
 -->
<template>
  <div class="indexs-list" :style="`margin-top:${listSpacing}px;`" @scroll.passive="handleScroll($event)">
    <div class="singer" id="singer">
      <div class="singer-top-tag" :style="`top:${tagTop}`">{{userTopTag}}</div>
      <ul class="singer-ul" :style="`padding-bottom:${listSpacing}px;`" ref="singerUl">

        <li v-for="(item, index) in listTemp" :key="index" class="singer-ul-li">
          <div class="singer-tag" :id="item.ascllTag">{{item.tag}}</div>
          <ul>
            <li  v-for="(fitem, findex) in item.data" :key="findex">
                <slot name="row" :row="fitem" :index="findex" :total="item.data.length"></slot>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="sort">
      <ul>
        <li v-for="(item, index) in sortList" :key="index" @click="jumpTag(item)" :class="{current:currentSort == item ? true : false}" >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexs-listWorld",
  props:{
    tagTop:{
      type:Number,
      default:60
    },
    listSpacing:{
      type:Number,
      default:60
    },
    tagTopoffsetTop:{
      type:Number,
      default:120
    },
    list:{
      type:Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      listTemp: [], //  用户列表
      sortList: [], //  侧栏排序列表
      currentSort: "A", //  当前排序的标签
      userTopTag: "A", //  联系人栏头部的标签名字
    };
  },
  mounted() {
    this.testData(this.list);
  },
  watch:{
    list(val){
      this.testData(val)
    }
  },
  methods: {
    handleScroll(e) {
      let offsetTop = 0;
      let scrollTop = e.target.scrollTop;

      this.listTemp.forEach((item, index) => {
        //  获取每个排序标签的位置
        offsetTop = document.querySelectorAll(".singer-ul-li")[index].offsetTop - this.tagTopoffsetTop;
        //  当前滚动条的位置 和 当前的标签偏移顶部的距离进行对比
        //  每一个联系人的li标签的高度必须要保持一致，我这里的高度是70，可以计算自己项目的内容的具体高度进行修改
        if (
          scrollTop > offsetTop &&
          scrollTop < offsetTop + 70 * item.data.length
        ) {
          this.userTopTag = item.tag;
          this.currentSort = item.tag;
        }
      });
    },

    //  请求数据
    testData(list) {
      let res = list;
      this.sortList = Object.keys(res);
      this.currentSort = this.sortList[0]
      this.userTopTag = this.sortList[0]
      this.listTemp = this.sortList.map(item => ({
        tag:item,
        ascllTag:`tag${item.charCodeAt()}`,
        data:res[item]
      }))
    },
    //  跳转标签
    jumpTag(i) {
      this.userTopTag = i;
      this.currentSort = i;
      document.querySelector(`#tag${i.charCodeAt()}`).scrollIntoView(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexs-list {
  // background-color: #fff;
  height: 100%;
  overflow-y: scroll;
}

.singer {
  width: 100%;
  height: 100%;
  // background-color: #fff;
}

.singer-top-tag {
  position: fixed;
  z-index: 99;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: @regular-text;
  background-color: #fff;
  border-bottom: 1px solid @auxiliary;
}

.singer-tag {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: @regular-text;
  background-color: @auxiliary;
}
.singer-ul-li ul li{
  background-color: #fff;
}
.singer-ul-li ul li:last-child{
  div div{
    border: none !important;
  }
}
.sort {
  position: fixed;
  z-index: 30;
  right: 6px;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  font-family: Helvetica;
}

ul {
  margin: 0;
  padding: 0;
}

.sort ul {
  background-color: #fff;
}

.sort ul li {
  list-style-type: none;
  padding: 3px;
  line-height: 1;
  font-size: 14px;
  font-weight:600;
  color: @regular-text;
}

.current {
  color: #ffcd32 !important;
}
</style>
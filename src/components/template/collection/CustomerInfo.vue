<template>
  <div class="infoCard">
    <AppBar pageTitle="客户信息" shadow occupyBtn customIcon="icon-tianjia" :customCallback="custom"></AppBar>
    <div class="contentBox">
      <div class="content-appBar basic-info">

        <div class="header"> <span>客户基本信息</span> </div>
        <div class="middle">
          <div class="itemBox">
            <div class="item"><span>客户编号</span> <span>KH190531250167</span></div><div class="item"><span>客户名称</span> <span>杜斯</span></div>
          </div>
          <div class="itemBox">
            <div class="item"><span>身份证号</span> <span>510923196905220214</span></div><div class="item"><span>性别</span> <span>男</span></div>
          </div>
          <div class="itemBox">
            <div class="item"><span>文化程度</span> <span>大专</span></div><div class="item"><span>婚姻状况</span> <span>已婚</span></div>
          </div>
          <div class="itemBox">
            <div class="item"><span>手机号码</span> <span>13695872546</span></div><div class="item"><span>住宅电话</span> <span>093515193</span></div>
          </div>
          <div class="itemBox singleRow">
            <div class="item"><span>单位电话</span> <span>09351519353</span></div>
          </div>
          <div class="itemBox singleRow">
            <div class="item"><span>家庭地址</span> <span>四川省成都市温江区杨柳河112号</span></div>
          </div>
        </div>

        <div class="header"> <span>贷款相关</span> </div>
        <div class="middle">
          <div class="itemBox singleRow">
            <div class="item"><span>项目编号</span> <span>XM234231312</span></div>
          </div>
          <div class="itemBox singleRow">
            <div class="item"><span>项目编号</span> <span>XM345342349</span></div>
          </div>
        </div>

        <div class="header"> <span>贷款相关</span> </div>
        <div class="middle">
          <div class="columnsBox">
            <div class="title"><span>关系</span> <span>姓名</span> <span>手机号码</span></div>
            <div class="columnsItem"><span>父亲</span> <span>老马</span> <span>13111866951</span></div>
            <div class="columnsItem"><span>父亲</span> <span>老马</span> <span>13111866951</span></div>
          </div>
        </div>

        <div class="header"> <span>补充信息</span> </div>
        <div class="middle">
          <div class="itemBox singleRow">
            <div class="item"><span>补充信息1</span> <span>更改手机号码，13223212134</span></div>
          </div>
          <div class="itemBox singleRow">
            <div class="item"><span>补充信息1</span> <span>更改手机号码，13223212134</span></div>
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
  methods: {
    custom(){
      this.goPage('addSupplementInfo')
    }
  }
}
</script>

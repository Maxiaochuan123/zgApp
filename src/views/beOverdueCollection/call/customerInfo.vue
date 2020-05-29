<template>
  <div class="info">
    <!-- <AppBar pageTitle="客户信息" shadow customTextBtn customText="补充信息" :customCallback="customCallback"></AppBar> -->
    <AppBar pageTitle="客户信息" shadow occupyBtn></AppBar>
    <div class="contentBox">
      <div class="content-appBar basic-info">

        <div class="header"> <span>客户基本信息</span> </div>
        <div class="middle">
          <div class="itemBox">
            <div class="item"><span>客户编号</span> <span>{{info.customerNo | paramsError}}</span></div><div class="item"><span>客户名称</span> <span>{{info.customerName | paramsError}}</span></div>
          </div>
          <div class="itemBox">
            <div class="item"><span>身份证号</span> <span>{{info.certificateNo | paramsError}}</span></div><div class="item"><span>性别</span> <span>{{info.gender | paramsError}}</span></div>
          </div>
          <div class="itemBox">
            <div class="item"><span>文化程度</span> <span>{{extendInfo.degree | paramsError}}</span></div><div class="item"><span>婚姻状况</span> <span>{{extendInfo.marital | paramsError}}</span></div>
          </div>
          <div class="itemBox">
            <div class="item"><span>手机号码</span> <span>{{extendInfo.contactPhone | paramsError}}</span></div>
          </div>
          <div class="itemBox singleRow">
            <div class="item"><span>家庭地址</span> <span>{{extendInfo.residenceAddress | paramsError}}</span></div>
          </div>
        </div>

        <div class="header"> <span>贷款相关</span> </div>
        <div class="middle">
          <div class="itemBox singleRow" v-for="(item, index) in projectNoList" :key="index">
            <div class="item"><span>项目编号</span> <span>{{item.orderNo}}</span></div>
          </div>
        </div>

        <div class="header"> <span>贷款相关</span> </div>
        <div class="middle">
          <div class="columnsBox">
            <div class="title"><span>关系</span> <span>姓名</span> <span>手机号码</span></div>
            <div class="columnsItem" v-for="(item,index) in customerPouse" :key="index+'a'"><span>配偶</span> <span>{{item.mateName}}</span> <span>{{item.contactPhone}}</span></div>
            <div class="columnsItem" v-for="(item,index) in ensurePeople" :key="index+'b'"><span>担保人</span> <span>{{item.guarantorName}}</span> <span>{{item.contactPhone}}</span></div>
            <div class="columnsItem" v-for="(item,index) in emergencyContact" :key="index+'c'"><span>紧急联系人</span> <span>{{item.contactName}}</span> <span>{{item.contactPhone}}</span></div>
          </div>
        </div>

        <div class="header"> <span>补充信息</span> </div>
        <div class="middle">
          <div class="itemBox singleRow">
            <!-- <div class="item"><span>补充信息1</span> <span>更改手机号码，13223212134</span></div> -->
            <div>无</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar"
export default {
  components: { AppBar },
  data () {
    return {
      info:{}, //基本信息
      extendInfo:{}, //扩展信息
      projectNoList:{}, //客户相关项目
      customerPouse:{}, //配偶
      ensurePeople:{}, //担保人
      emergencyContact:{}, //紧急联系人
    }
  },
  created () {
    this.getInfo();
  },
  methods: {
    customCallback(){
      this.goPage('addSupplementInfo')
    },
    // 获取相关信息
    async getInfo(){
      let customerId = await this.getOrderInfo();

      this.getCustomerInfo(customerId);
      this.getProjectNoList(customerId);
      this.getCustomerPouse(customerId);
      this.getEmergencyContact(customerId);
      this.getEnsurePeople();
    },
    // 获取客户信息
    getCustomerInfo(customerId){
      this.api.seeCustomerInfo({customerId:customerId}).then(res => {
        if(res.message === "success"){
          this.info = res.data;
          this.extendInfo = res.data.customerInfoDto;
        }else{
          this.$toast.error("客户信息获取失败");
        }
      })
    },
    // 获取客户 id
    getOrderInfo(){
      return this.api.seeOrderInfo({orderId:this.routeData.orderId}).then(res => {
        if(res.message === "success"){
          return res.data.customerId;
        }else{
          this.$toast.error("客户ID获取失败");
        }
      });
    },
    // 获取客户 相关项目编号
    getProjectNoList(customerId){
      return this.api.seeProjectNoList({customerId:customerId}).then(res => {
        if(res.message === "success"){
         this.projectNoList = res.data;
        }else{
          this.$toast.error("客户相关项目编号获取失败");
        }
      });
    },
    // 获取配偶
    getCustomerPouse(customerId){
      return this.api.seesCustomerPouse({customerId:customerId}).then(res => {
        if(res.message === "success"){
         this.customerPouse = res.data;
        }else{
          this.$toast.error("客户配偶获取失败");
        }
      });
    },
    // 获取担保人
    getEnsurePeople(){
      return this.api.seesEnsurePeople({orderId:this.routeData.orderId}).then(res => {
        if(res.message === "success"){
         this.ensurePeople = res.data;
        }else{
          this.$toast.error("担保人获取失败");
        }
      });
    },
    // 获取紧急联系人
    getEmergencyContact(customerId){
      return this.api.seesEmergencyContact({customerId:customerId}).then(res => {
        if(res.message === "success"){
         this.emergencyContact = res.data;
        }else{
          this.$toast.error("紧急联系人获取失败");
        }
      });
    },
  }
}
</script>

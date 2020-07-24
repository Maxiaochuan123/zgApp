<template>
  <div class="write-followup">
    <AppBar pageTitle="写跟进" customTextBtn customText="保存" :customCallback="customCallback"></AppBar>
    <div class="content">
      <CustomerForm ref="customerForm" :fieldList="fieldList"></CustomerForm>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar";
import CustomerForm from "@components/basics/CustomerForm";

export default {
  name: "writeFollowup",
  components: { AppBar, CustomerForm },
  data() {
    return {
      fieldList:[], // 字段列表
    };
  },
  created() {
    this.fieldList = [{
      type:"picker",
      field:{ key:"actionType", value:"" },
      label:"跟进类型",
      rules:{ required: true }
    },{
      type:"date",
      field:{ key:"nextDate", value:"" },
      label:"下次更进时间",
      rules:{ required: true }
    },{
      type:"textarea",
      field:{ key:"actionContent", value:"" },
      label:"跟进内容",
      rules:{ required: true }
    },{
      type:"file",
      field:{ key:"attachmentIds", value:{} },
      label:"附件",
      rules:{ required: false }
    }]
  },
  methods: {
    customCallback() {
      let { orderId, orderNo, periodsIndex, strategyState } = { ...this.routeData };
      this.apiMethods.saveCallback(this, "写跟进", this.api.addFollowUpRecord, { orderList:[{ orderId:orderId, orderNo:orderNo, periodsIndex:periodsIndex, strategyState:strategyState }] });
    }
  }
};
</script>
<style lang="less" scoped>
.write-followup {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    overflow: hidden;
    .form {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>

<!-- 底部弹出页面 -->
<template>
  <div class="changeStrategy">
    <AppBar pageTitle="更改策略" customTextBtn customText="保存" :customCallback="customCallback"></AppBar>
    <div class="contentBox">
      <div class="content-appBar">
        <div class="block">
          <CustomerForm ref="customerForm" :fieldList="fieldList"></CustomerForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import CustomerForm from '@components/basics/CustomerForm'
export default {
  components: { AppBar, CustomerForm },
  data () {
    return {
      fieldList:[], // 字段列表
    }
  },
  created () {
    this.fieldList = [{
      type:"picker",
      field:{ key:"pickerVal", value:this.routeData.strategyStateName },
      label:"变更策略",
      rules:{ required: false }
    }]
  },
  methods: {
    customCallback(){
      let { id, strategyState, orderId  } = { ...this.routeData };
      this.apiMethods.saveCallback(this, "更改策略", this.api.changeStrategy, { orderInfoId:id, oldType:strategyState, orderId:orderId });
    }
  }
}
</script>

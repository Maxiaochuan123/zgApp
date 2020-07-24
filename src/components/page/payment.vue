<template>
  <div class="payment">
    <AppBar pageTitle="回款" customTextBtn customText="保存" :customCallback="customCallback"></AppBar>
    <div class="contentBox">
      <div class="content-appBar">
        <div class="block">
          <div class="surplusRepayment" v-show="surplusRepayment > 0">剩余应还: <span>{{surplusRepayment}}</span> (元)</div>
          <CustomerForm ref="customerForm" :fieldList="fieldList" @watchForm="watchForm"></CustomerForm>
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
      formData:{},
      fieldList:[], // 字段列表
    }
  },
  created () {
    this.fieldList = [{
      type:"input",
      field:{ key:"repaymentAmount", value:this.routeData.amountPayable },
      label:"回款金额(元)",
      rules:{ 
        required: true, 
        regExp:[{reg:/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: "金额只能是数字, 且最多2位小数"}]
      },
    },{
      type:"dateTime",
      field:{ key:"repaymentDate", value:"" },
      label:"回款时间",
      rules:{ required: true }
    },{
      type:"file",
      field:{ key:"repaymentEvidence", value:{} },
      label:"还款凭证",
      rules:{ required: true }
    },{
      type:"textarea",
      field:{ key:"comment", value:"" },
      label:"回款内容",
      rules:{ required: false }
    }]
  },
  computed: {
    surplusRepayment(){
      return (this.routeData.amountPayable - parseFloat(this.formData.repaymentAmount) || 0).toFixed(2);
    }
  },
  methods: {
    customCallback(){
      let { orderId, orderNo, periodsIndex } = { ...this.routeData };
      this.apiMethods.saveCallback(this, "回款", this.api.payment, { orderId:orderId, orderNo:orderNo, periodsIndex:periodsIndex });
    },
    watchForm(data){
      this.formData = data;
    }
  }
}
</script>

<style lang="less" scoped>
  .payment{
    .surplusRepayment{
      background-color: #fff;
      text-align: right;
      padding: 4px 8px 4px 0;
      margin-bottom: 4px;
      span{
        color: @primary;
      }
    }
  }
</style>

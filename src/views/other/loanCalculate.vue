<!--
 * @Description: 贷款计算
 * @Author: shenah
 * @Date: 2020-03-30 09:51:14
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-30 11:17:36
 -->


<!-- 车型先不做 -->
<template>
  <div class="loan-calculate">
    <AppBar pageTitle="贷款计算器"></AppBar>
    <div class="content">
      <GeneralForm
        :fieldList="fieldList"
        class="form"
        ref="generalForm"
      ></GeneralForm>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar";
import GeneralForm from "@components/GeneralForm.vue";
export default {
  name: "loanCalculate",
  components: { AppBar, GeneralForm },
  data() {
    return {
      fieldList: [
        {
          fieldName: "bankName",
          formType: "checkbox",
          isNull: 1,
          name: "贷款平台",
          options: "",
          type: 9,
          value: "",
          apiName: "queryLoanPlatform",
          splitField: "bank",
          idField: "value",
          textField: "label"
        },
        {
          fieldName: "bank",
          name: "贷款平台拼接",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: []
        },
        {
          fieldName: "bankId",
          name: "贷款平台id",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "productName",
          formType: "checkbox",
          isNull: 1,
          name: "贷款产品",
          options: "",
          type: 9,
          value: "",
          apiName: "queryProduct",
          splitField: "product",
          idField: "value",
          textField: "label"
        },
        {
          fieldName: "product",
          name: "贷款产品拼接",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: []
        },
        {
          fieldName: "productId",
          name: "贷款产品id",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "productId",
          name: "贷款产品id",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        }
      ]
    };
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.loan-calculate {
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
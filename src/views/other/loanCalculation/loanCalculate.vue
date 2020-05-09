<!-- 车型先不做 -->
<template>
  <div class="loan-calculate">
    <AppBar pageTitle="贷款计算器"></AppBar>
    <div class="content">
      <!-- <GeneralForm
        :fieldList="fieldList"
        class="form"
        ref="generalForm"
      ></GeneralForm> -->
    </div>
    <div class="foot-btn">
      <div class="clear btn-common">清空</div>
      <div class="sub btn-common">开始计算</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@components/basics/AppBar";
// import GeneralForm from "@components/basics/GeneralForm.vue";
export default {
  name: "loanCalculate",
  computed: {
    ...mapState(["dictionaries"])
  },
  components: { AppBar, GeneralForm },
  data() {
    return {
      fieldList: []
    };
  },
  props: {},
  mounted() {
    // 初始化数据
    this.initData();
  },
  methods: {
    initData() {
      this.fieldList = [
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
        },
        {
          fieldName: "carKind",
          formType: "select",
          isNull: 1,
          name: "车辆类别",
          options: this.dictionaries.vehicleType
            .map(item => `${item.value}^_^${item.label}`)
            .join(","),
          type: 3,
          value: "",
          relation: "carKindId,carKindName"
        },
        {
          fieldName: "carKindName",
          name: "车辆类别",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "carKindId",
          name: "车辆类别名字",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          isNull: 0,
          isUnique: 0,
          type: 6,
          fieldName: "loanAmount",
          name: "贷款金额(万)",
          options: null,
          value: null,
          fieldType: 5
        },
        {
          fieldName: "loanType",
          formType: "select",
          isNull: 1,
          name: "贷款类型",
          options: this.dictionaries.loanType
            .map(item => `${item.value}^_^${item.label}`)
            .join(","),
          type: 3,
          value: "",
          relation: "loanTypeId,loanTypeName"
        },
        {
          fieldName: "loanTypeName",
          name: "贷款类型",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "loanTypeId",
          name: "贷款类型名字",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "repayType",
          formType: "select",
          isNull: 1,
          name: "还款方式",
          options: this.dictionaries.repayType
            .map(item => `${item.value}^_^${item.label}`)
            .join(","),
          type: 3,
          value: "",
          relation: "repayTypeId,repayTypeName"
        },
        {
          fieldName: "repayTypeName",
          name: "还款方式",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "repayTypeId",
          name: "还款方式名字",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "repayCycle",
          formType: "select",
          isNull: 1,
          name: "贷款周期",
          options: this.dictionaries.repayCycle
            .map(item => `${item.value}^_^${item.label}`)
            .join(","),
          type: 3,
          value: "",
          relation: "repayCycleId,repayCycleName"
        },
        {
          fieldName: "repayCycleName",
          name: "贷款周期",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "repayCycleId",
          name: "贷款周期名字",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        }
      ];
    }
  }
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
  .foot-btn {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    padding: 20px 16px;
    .btn-common {
      font-size: 16px;
      padding: 10px 0;
      border-radius: 6px;
      text-align: center;
      font-weight: 500;
    }
    .clear {
      flex: 1;
      color: @secondary-text;
      background-color: @primary-border;
      border-radius: 6px;
    }
    .sub {
      flex: 2;
      margin-left: 10px;
      color: #fff;
      background-color: @primary;
    }
  }
}
</style>
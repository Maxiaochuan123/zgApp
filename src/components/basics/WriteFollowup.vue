<!--
 * @Description: 客户写跟进
 * @Author: shenah
 -->
<template>
  <div class="write-followup">
    <AppBar
      :customFnc="customFnc"
      customIconBtn
      customTitle="保存"
      pageTitle="写跟进"
    ></AppBar>
    <div class="content">
      <!-- <GeneralForm
        :fieldList="fieldList"
        class="form"
        ref="generalForm"
      ></GeneralForm> -->
    </div>
  </div>
</template>

<script>
import AppBar from "@components/basics/AppBar";
import { FOLLOW_UP_TYPE } from "@static/js/dictionaries";
// import GeneralForm from "@components/basics/GeneralForm";
// import Api from "@api";
export default {
  name: "writeFollowup",
  components: { AppBar, GeneralForm },
  computed: {
    id() {
      return this.$route.params.id;
    },
    type() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      fieldList: [
        {
          fieldName: "category",
          formType: "select",
          isNull: 1,
          name: "跟进类型",
          options: FOLLOW_UP_TYPE.map(item => item.text).join(","),
          type: 3,
          value: ""
        },
        {
          fieldName: "nextTime",
          formType: "datetime",
          isNull: 1,
          name: "下次跟进时间",
          options: null,
          type: 13,
          value: ""
        },
        {
          fieldName: "batchId",
          formType: "file",
          isNull: 0,
          name: "",
          options: null,
          type: 8,
          value: ""
        },
        {
          fieldName: "content",
          formType: "textarea",
          isNull: 1,
          name: "跟进内容",
          options: null,
          type: 2,
          value: ""
        }
      ]
    };
  },
  props: {},
  mounted() {},
  methods: {
    customFnc() {
      // 保存
      // let addFollowUpRecordApi;
      // if (this.type === "联系人") {
      //   addFollowUpRecordApi = this.api.addContactsFollowUp;
      // } else if (this.type === "线索") {
      //   addFollowUpRecordApi = this.api.addClueFollowUp;
      // } else {
      //   addFollowUpRecordApi = Api.addCustomerFollowUpRecord;
      // }
      // const generalFormVue = this.$refs.generalForm;
      // generalFormVue.$refs.form.validate().then(result => {
      //   if (result) {
      //     let params = { ...generalFormVue.form, typesId: this.id };
      //     if (this.type !== "联系人" || this.type !== "线索") {
      //       params.isEvent = 0;
      //     }
      //     addFollowUpRecordApi(params).then(res => {
      //       this.$toast.success({
      //         message: "新增成功"
      //       });
      //       this.goBack();
      //     });
      //   }
      // });
    }
  }
};
</script>
<style lang='less' scoped>
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
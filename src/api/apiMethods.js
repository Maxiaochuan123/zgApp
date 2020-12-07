import apiCallback from './api'

import store from '../vuex/store'
import storage from '@static/js/storage'

let companyList = storage.localGet("company"); //公司
let lendingPlatformList = storage.localGet("lendingPlatform"); // 放款平台
let personLiableList = storage.localGet("personLiable"); // 责任人

export default{

  /******************************  列表 ******************************/
  // 获取基础数据
  getApi(_this) {
    let api, msg, data
    switch (store.state.pageSource) {
      case "repayment":
        api = apiCallback.repayment;
        msg = "还款列表";
        break;
      case "overdue":
        api = apiCallback.overdue;
        msg = "逾期列表";
        break;
      case "compensatory":
        api = apiCallback.compensatory;
        msg = "代偿列表";
        break;
      case "phone":
        api = apiCallback.phone;
        msg = "电话催收列表";
        break;
      case "business":
        api = apiCallback.business;
        msg = "业务催收列表";
        break;
      case "visit":
        api = apiCallback.visit;
        msg = "外勤催收列表";
        break;
      case "all":
        api = apiCallback.all;
        msg = "全员催收列表";
        break;

      // 待办事项
      case "collection":
        api = apiCallback.collection;
        msg = "待催收列表";
        data = { collectionStatus: "UNCOLLECTED" };
        break;
        
    }
    return { api, msg, data }
  },

  // 返回筛选栏下拉选择器对应数据
  getId(list, fieldName, type) {
    for (let item of list) {
      if ((item.name || item.userName) === fieldName){
        switch (type) {
          case "放款平台":
            return item.id;
          case "公司":
            return item.departmentId;
          case "责任人":
            return item.id;
          case "策略":
            return item.code;
          case "跟进类型":
            return item.code;
        }
      }
    }
  },

  // 判断字段数据是否存在
  isFieldData(field){
    return field ? field : "";
  },

  // 获取筛选栏数据
  getScreenParams(_this){

    let { dateSwitch, lendingPlatform, company, personLiable, repaymentState, collectionStatus, projectState } = { ..._this.screenData };
    let screenDataList = {};

    if (Object.keys(_this.screenData).length > 0) {
      screenDataList = {
        updateBeginTime: this.isFieldData(dateSwitch[0]) || "", //开始时间
        updateEndTime: this.isFieldData(dateSwitch[1]) || "", //开始时间
        platformId: this.getId(lendingPlatformList, lendingPlatform, "放款平台"), //放款平台 id
        organizationId: this.getId(companyList, company, "公司") //公司 id
      }
      let pageSource = store.state.pageSource;

      if (pageSource === "repayment"){
        screenDataList.projectState = this.isFieldData(projectState); //项目状态
      } else if (pageSource === "overdue" || pageSource === "phone" || pageSource === "business" || pageSource === "visit" || pageSource === "all"){
        screenDataList.repaymentState = this.isFieldData(repaymentState); //还款状态
        screenDataList.userId = this.getId(personLiableList, personLiable, "责任人"); //责任人 id
      } else if (pageSource === "collection"){
        screenDataList.collectionStatus = this.isFieldData(collectionStatus); //催收状态
      }

    }

    return screenDataList;
  },

  getListCallback(_this, type = "default"){

    let { api, msg, data } = this.getApi(_this);

    let params = {};

    if(type === "default"){
      params = { ..._this.paging, ...data };
    }else if(type === "screen"){
      params = { ..._this.paging, ...this.getScreenParams(_this), nameOrPhoneOrOrderNo: store.state.searchInputValue };
    }else if(type === "search"){
      params = { ..._this.paging, nameOrPhoneOrOrderNo:store.state.searchInputValue };
    }

    api(params).then(res => {
      if (res.message !== 'success') _this.$toast.warning(`${msg}获取失败!`);

      if (res.data){
        _this.skeleton = false;

        _this.loadUpdate.loadedAll = res.data.results.length === 0 ? true : false;
        if (_this.loadUpdate.loadingState === 'default' || _this.loadUpdate.loadingState === 'refresh' || type == "search") {
          _this.listData = res.data.results; _this.loadUpdate.refreshing = false;
        } else {
          _this.listData.push(...res.data.results); _this.loadUpdate.loading = false;
        }
      }
    })
  },

  /******************************  保存 ******************************/
  getEnclosureIds(fieldName, form){
    if (Object.keys(form[fieldName]).length > 0) {
      form[fieldName].imgsID = form[fieldName].imgsID ? form[fieldName].imgsID : [];
      form[fieldName].enclosureID = form[fieldName].enclosureID ? form[fieldName].enclosureID : [];
      form[fieldName] = [...form[fieldName].imgsID, ...form[fieldName].enclosureID].join(",");
    } else {
      form[fieldName] = "";
    }
  },

  getSaveParams(_this, saveType, customerForm, data){
    let params = {};
    let form = { ...customerForm.form};
    if(data) params = {...data};
    switch (saveType) {
      case "更改策略":
        params.newType = this.getId(_this.strategy, form.pickerVal, "策略");
        break;
      case "写跟进":
        this.getEnclosureIds("attachmentIds", form);
        params = { ...params, ...form};
        params.actionType = this.getId(_this.followUp, form.actionType, "跟进类型");
        break;
      case "回款":
        this.getEnclosureIds("repaymentEvidence", form);
        form.repaymentAmount = parseFloat(form.repaymentAmount);
        form.repaymentDate += ":00";
        params = { ...params, ...form };
        break;
    }
    return params;
  },

  saveCallback(_this, saveType, api, data){

    const customerForm = _this.$refs.customerForm;

    customerForm.$refs.form.validate().then(result => {
      if (result) {
        // 获取参数
        let params = this.getSaveParams(_this, saveType, customerForm, data);
        
        api(params).then(res => {
          if (res.message !== 'success') {
            _this.$toast.error(res.message);
          }else{
            _this.$toast.success(`${saveType}成功!`); setTimeout(() => _this.$router.go(-1), 500);
          }
        })
        
        return true;
      }

      _this.$toast.info("请检查信息是否补充完整，或无误");
      return false;
    });
  }
}
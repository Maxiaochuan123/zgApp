import apiCallback from './api'
import store from '../vuex/store'
export default{

  /******************************  列表 ******************************/
  // 获取基础数据
  getApi(_this) {
    let api, msg
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
    }
    return { api, msg }
  },

  // 获取下拉选择器 数据
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
    let { dateSwitch, lendingPlatform, company, personLiable, repaymentState, projectState } = { ..._this.screenData };
    let screenDataList = {};

    if (Object.keys(_this.screenData).length > 0) {
      screenDataList = {
        updateBeginTime: this.isFieldData(dateSwitch[0]) || "", //开始时间
        updateEndTime: this.isFieldData(dateSwitch[1]) || "", //开始时间
        platformId: this.getId(_this.lendingPlatform, lendingPlatform, "放款平台"), //放款平台 id
        organizationId: this.getId(_this.company, company, "公司") //公司 id
      }

      switch (store.state.pageSource) {
        case "repayment":
          screenDataList.projectState = this.isFieldData(projectState); //项目状态
          break;
        case "overdue":
          screenDataList.repaymentState = this.isFieldData(repaymentState); //还款状态
          screenDataList.userId = this.getId(_this.personLiable, personLiable, "责任人"); //责任人 id
          break;
      }
    }
    return screenDataList;
  },

  getListCallback(_this, type = "default"){
    let { api, msg } = this.getApi(_this);
    let params = {};

    if(type == "default"){
      params = { ..._this.paging };
    }else if(type == "screen"){
      params = { ..._this.paging, ...this.getScreenParams(_this) };
    }else if(type == "search"){
      params = { ..._this.paging, nameOrPhoneOrOrderNo:store.state.searchInputValue };
    }

    // console.log('params:', params)

    api(params).then(res => {
      // if (res.message !== 'success') _this.$toast.warning(`${msg}获取失败!`);

      if (res.data){
        _this.loadUpdate.loadedAll = res.data.results.length === 0 ? true : false;

        if (_this.loadUpdate.loadingState === 'default' || _this.loadUpdate.loadingState === 'refresh' || type == "search") {
          _this.listData = res.data.results; _this.loadUpdate.refreshing = false;
        } else {
          _this.listData.push(...res.data.results); _this.loadUpdate.loading = false;
        }
      }else{
        _this.dataError = true;
      }
      // console.log(_this.listData)
    })
  },

  // this.$confirm("是否分享此线索 ?", "提示").then(res => {
  //   if (res.result) {

  //   }
  // });

  /******************************  保存 ******************************/
  getSaveParams(_this, saveType, customerForm, data){
    let params = {};
    let form = { ...customerForm.form};
    // console.log('form:', form)
    if(data) params = {...data};
    switch (saveType) {
      case "更改策略":
        params.newType = this.getId(_this.strategy, form.pickerVal, "策略");
        break;
      case "写跟进":
        params = { ...params, ...form};
        params.actionType = this.getId(_this.followUp, form.actionType, "跟进类型");
        if (Object.keys(form.attachmentIds).length > 0){
          params.attachmentIds.imgsID = form.attachmentIds.imgsID ? form.attachmentIds.imgsID : [];
          params.attachmentIds.enclosureID = form.attachmentIds.enclosureID ? form.attachmentIds.enclosureID : [];
          params.attachmentIds = [...form.attachmentIds.imgsID, ...form.attachmentIds.enclosureID].join(",");
        }else{
          params.attachmentIds = "";
        }
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

        console.log('params:', params)
        
        api(params).then(res => {
          if (res.message !== 'success') {
            _this.$toast.warning(`${saveType}失败!`);
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
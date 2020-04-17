import apiCallback from './api'

export default{
  getSource(pageSource){
    let api, params, msg
    switch(pageSource) {
      case "repaymentList":
          api = apiCallback.onlyLogin;
          params = {id:'123'};
          msg = "还款列表";
        break;
    }
    return { api, params, msg }
  },

  getListCallback(_this,pageSource,tag=false){
    let { api, params, msg } = this.getSource(pageSource);
    params = !tag ? params : { ...params, ..._this.screenData}
    console.log(params)
    // api(params).then(res => {
    //   if (res.msg !== 'success') _this.$toast.warning(`${msg}获取失败!`);
    //   if (_this.loadUpdate.loadingState === 'default' || _this.loadUpdate.loadingState === 'refresh') {
    //     _this.listData = res.data.list; _this.loadUpdate.refreshing = false;
    //   } else {
    //     _this.listData.push(...res.data.list); _this.loadUpdate.loading = false;
    //   }
    //   _this.loadUpdate.loadedAll = res.data.list.length === 0 ? true : false;
    // })
  },

  // confirmCallback(_this){
    
  // }
}
import apiCallback from './api'
import store from '../vuex/store'
export default{
  getSource(_this,pageSource){
    let api, params, msg
    switch(pageSource) {
      case "repaymentList":
          api = apiCallback.onlyLogin;
          params = {id:'123',..._this.paging};
          msg = "还款列表";
        break;
    }
    return { api, params, msg }
  },

  getListCallback(_this,pageSource,type="default"){
    let { api, params, msg } = this.getSource(_this,pageSource);
    if(type == "default"){
      params = params;
    }else if(type == "screen"){
      params = { ...params, ..._this.screenData};
    }else if(type == "search"){
      params = { ...params, search:store.state.searchInputValue};
    }
    // console.log(params)

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
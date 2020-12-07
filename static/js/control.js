import storage from "@static/js/storage";

// 设置路由权限
export let controlInit = () => {
  return storage.localGet("control") ? setControl(storage.localGet("control").work) : {};
}

let setControl = (work = {}) => {
  return{
    repayment: {
      search: _.get(work['work:payback'], ['work:payback:index'], false), //还款-列表
      searchBtn: _.get(work['work:payback'], ['work:payback:plan'], false), //还款计划
    },
    overdue: {
      search: _.get(work['work:overdue']['work:overdue:overdueList'], ['work:overdue:overdueList:search'], false), //逾期-列表
      searchBtn: _.get(work['work:overdue']['work:overdue:overdueList'], ['work:overdue:overdueList:repaymentPlan'], false), //还款计划
      followUp: _.get(work['work:overdue']['work:overdue:overdueList'], ['work:overdue:overdueList:followup'], false), //跟进
      distribution: _.get(work['work:overdue']['work:overdue:overdueList'], ['work:overdue:overdueList:divide'], false), //分配
      changePolicy: _.get(work['work:overdue']['work:overdue:overdueList'], ['work:overdue:overdueList:modifyStatus'], false), //更改策略
      detailed: _.get(work['work:overdue']['work:overdue:overdueList'], ['work:overdue:overdueList:repaymentDetail'], false), //还款明细
    },
    compensatory: {
      search: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:search'], false), //代偿-列表
      searchBtn: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:detail'], false), //代偿明细
      followUp: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:followup'], false), //跟进
      distribution: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:divide'], false), //分配
      returnMoney: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:returnmoney'], false), //回款
      changePolicy: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:modifyStatus'], false), //更改策略
      detailed: _.get(work['work:overdue']['work:overdue:representbackList'], ['work:overdue:representbackList:repaymentDetail'], false), //回款明细
    },
    phone: {
      search: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:search'], false), //电话催收-列表
      searchBtn: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:repaymentPlan'], false), //还款计划
      followUp: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:followup'], false), //跟进
      transfer: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:divide'], false), //转派
      returnMoney: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:returnMoney'], false), //回款
      changePolicy: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:modify'], false), //更改策略
      detailed: _.get(work['work:overdueCollection']['work:overdueCollection:phone'], ['work:overdueCollection:phone:repaymentDetail'], false), //还款明细
    },
    business: {
      search: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:search'], false), //业务催收-列表
      searchBtn: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:repaymentPlan'], false), //还款计划
      followUp: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:followup'], false), //跟进
      transfer: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:divide'], false), //转派
      returnMoney: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:returnMoney'], false), //回款
      changePolicy: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:modify'], false), //更改策略
      detailed: _.get(work['work:overdueCollection']['work:overdueCollection:business'], ['work:overdueCollection:business:repaymentDetail'], false) //还款明细
    },
    visit: {
      search: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:search'], false), //外勤催收-列表
      searchBtn: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:repaymentPlan'], false), //还款计划
      followUp: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:followup'], false), //跟进
      transfer: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:divide'], false), //转派
      returnMoney: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:returnMoney'], false), //回款
      changePolicy: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:modify'], false), //更改策略
      detailed: _.get(work['work:overdueCollection']['work:overdueCollection:visit'], ['work:overdueCollection:visit:repaymentDetail'], false) //还款明细
    },
    all: {
      search: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:search'], false), //全员催收-列表
      searchBtn: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:repaymentPlan'], false), //还款计划
      followUp: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:followup'], false), //跟进
      transfer: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:divide'], false), //转派
      returnMoney: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:returnMoney'], false), //回款
      changePolicy: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:modify'], false), //更改策略
      detailed: _.get(work['work:overdueCollection']['work:overdueCollection:allPeople'], ['work:overdueCollection:allPeople:repaymentDetail'], false), //还款明细
    },
    collection: {
      search: _.get(work['work:message']['work:message:collection'], ['work:message:collection:search'], false), //全员催收-列表
      followUp: _.get(work['work:message']['work:message:collection'], ['work:message:collection:followup'], false), //跟进
      followupRecord: _.get(work['work:message']['work:message:collection'], ['work:message:collection:followupRecord'], false), //跟进记录
      detailed: _.get(work['work:message']['work:message:collection'], ['work:message:collection:repaymentDetail'], false), //还款明细
    }
  }
}
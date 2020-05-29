import storage from "@static/js/storage";

// 设置路由权限
export let controlInit = async () => {
  return setControl(await storage.localGet("control").work);
}

let setControl = work => {
  return{
    repayment: {
      search: work['work:payback']['work:payback:index'], //还款-列表
      searchBtn: work['work:payback']['work:payback:plan'], //还款计划
    },
    overdue: {
      search: work['work:overdue']['work:overdue:overdueList']['work:overdue:overdueList:search'], //逾期-列表
      searchBtn: work['work:overdue']['work:overdue:overdueList']['work:overdue:overdueList:repaymentPlan'], //还款计划
      followUp: work['work:overdue']['work:overdue:overdueList']['work:overdue:overdueList:followup'], //跟进
      distribution: work['work:overdue']['work:overdue:overdueList']['work:overdue:overdueList:divide'], //分配
      changePolicy: work['work:overdue']['work:overdue:overdueList']['work:overdue:overdueList:modifyStatus'], //更改策略
      detailed: work['work:overdue']['work:overdue:overdueList']['work:overdue:overdueList:repaymentDetail'] //还款明细
    },
    compensatory: {
      search: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:search'], //代偿-列表
      searchBtn: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:detail'], //代偿明细
      followUp: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:followup'], //跟进
      distribution: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:divide'], //分配
      returnMoney: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:returnmoney'], //回款
      changePolicy: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:modifyStatus'], //更改策略
      detailed: work['work:overdue']['work:overdue:representbackList']['work:overdue:representbackList:repaymentDetail'], //回款明细
    },
    phone: {
      search: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:search'], //电话催收-列表
      searchBtn: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:repaymentPlan'], //还款计划
      followUp: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:followup'], //跟进
      transfer: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:divide'], //转派
      returnMoney: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:returnMoney'], //回款
      changePolicy: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:modify'], //更改策略
      detailed: work['work:overdueCollection']['work:overdueCollection:phone']['work:overdueCollection:phone:repaymentDetail'], //还款明细
    },
    business: {
      search: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:search'], //业务催收-列表
      searchBtn: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:repaymentPlan'], //还款计划
      followUp: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:followup'], //跟进
      transfer: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:divide'], //转派
      returnMoney: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:returnMoney'], //回款
      changePolicy: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:modify'], //更改策略
      detailed: work['work:overdueCollection']['work:overdueCollection:business']['work:overdueCollection:business:repaymentDetail'], //还款明细
    },
    visit: {
      search: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:search'], //外勤催收-列表
      searchBtn: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:repaymentPlan'], //还款计划
      followUp: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:followup'], //跟进
      transfer: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:divide'], //转派
      returnMoney: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:returnMoney'], //回款
      changePolicy: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:modify'], //更改策略
      detailed: work['work:overdueCollection']['work:overdueCollection:visit']['work:overdueCollection:visit:repaymentDetail'], //还款明细
    },
    all: {
      search: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:search'], //全员催收-列表
      searchBtn: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:repaymentPlan'], //还款计划
      followUp: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:followup'], //跟进
      transfer: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:divide'], //转派
      returnMoney: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:returnMoney'], //回款
      changePolicy: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:modify'], //更改策略
      detailed: work['work:overdueCollection']['work:overdueCollection:allPeople']['work:overdueCollection:allPeople:repaymentDetail'], //还款明细
    }
  }
}
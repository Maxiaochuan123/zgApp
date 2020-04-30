import store from '../../src/vuex/store'
// console.log(store.state.Jurisdiction)
export default {
  // 还款
  repayment:[{
    title: "结清代偿申请",
    isLink: "",
    flag: true,
    disabled: true
  }, {
    title: "部分还款",
    isLink: "",
    flag: true,
    disabled: true
  }, {
    title: "无还本续贷",
    isLink: "",
    flag: true,
    disabled: true
  }, {
    title: "贷款展期",
    isLink: "",
    flag: true,
    disabled: true
  }, {
    title: "提前结清",
    isLink: "",
    flag: true,
    disabled: true
  }, {
    title: "提前回购",
    flag: true,
    disabled: true
  }],

  //逾期
  overdue:[{
    title: "分配",
    flag: true,
    disabled: true
  }, {
    title: "更改策略",
    linkName: "changeStrategy",
    linkParams: {},
    flag: true,
    disabled: false
  }]
}
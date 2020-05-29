// 设置按钮 & 权限
export const setMenu = pageControl => {
  return {
    repayment: [{
      title: "结清代偿申请",
      isLink: "",
      disabled: true
    }, {
      title: "部分还款",
      isLink: "",
      disabled: true
    }, {
      title: "无还本续贷",
      isLink: "",
      disabled: true
    }, {
      title: "贷款展期",
      isLink: "",
      disabled: true
    }, {
      title: "提前结清",
      isLink: "",
      disabled: true
    }, {
      title: "提前回购",
      disabled: true
    }],

    //逾期
    overdue: [{
      title: "分配",
      linkName: "selectUser",
      linkParams: {},
      hidden: pageControl.distribution,
      disabled: false
    }, {
      title: "更改策略",
      linkName: "changeStrategy",
      linkParams: {},
      hidden: pageControl.changePolicy,
      disabled: false
    }],

    // 代偿
    compensatory: [{
      title: "分配",
      linkName: "selectUser",
      linkParams: {},
      hidden: pageControl.distribution,
      disabled: false
    }, {
      title: "更改策略",
      linkName: "changeStrategy",
      linkParams: {},
      hidden: pageControl.changePolicy,
      disabled: false
    }, {
      title: "回款",
      linkName: "collection",
      linkParams: {},
      hidden: pageControl.returnMoney,
      disabled: false
    }],

    //催收
    collection: [{
      title: "转派",
      linkName: "selectUser",
      linkParams: {},
      hidden: pageControl.transfer,
      disabled: false
    }, {
      title: "更改策略",
      linkName: "changeStrategy",
      linkParams: {},
      hidden: pageControl.changePolicy,
      disabled: false
    }, {
      title: "回款",
      linkName: "collection",
      linkParams: {},
      hidden: pageControl.returnMoney,
      disabled: false
    }]
  }
}
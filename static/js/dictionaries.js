import storage from "@static/js/storage"

// 跟进类型
export const FOLLOW_UP_TYPE = [
  {
    text: "打电话",
    value: "打电话"
  },
  {
    text: "微信",
    value: "微信"
  },
  {
    text: "QQ",
    value: "QQ"
  },
  {
    text: "发邮件",
    value: "发邮件"
  },
  {
    text: "发短信",
    value: "发短信"
  },
  {
    text: "见面拜访",
    value: "见面拜访"
  },
  {
    text: "活动",
    value: "活动"
  }
];

// 任务状态
export const YES_NO = [
  {
    text: "是",
    value: 1
  },
  {
    text: "否",
    value: 2
  }
];

// 优先级
export const ARCHIVES = [
  {
    text: "借款合同",
    value: 1
  },
  {
    text: "担保协议",
    value: 2
  },
  {
    text: "公证书",
    value: 3
  },
  {
    text: "购车发票",
    value: 2
  },
  {
    text: "购置税发票",
    value: 3
  },
  {
    text: "商业险报单",
    value: 2
  },
  {
    text: "交强险报单",
    value: 3
  },
  {
    text: "登记证书",
    value: 2
  },
  {
    text: "行驶证",
    value: 3
  },
  {
    text: "贷款人身份证",
    value: 2
  },
  {
    text: "按时还款和处置抵押物承诺书",
    value: 3
  },
  {
    text: "按时还款和处置抵押物委托书",
    value: 2
  },
  {
    text: "贷款人户口本",
    value: 3
  },
  {
    text: "组织机构代码",
    value: 2
  },
  {
    text: "营业执照",
    value: 3
  },
  {
    text: "配偶身份证",
    value: 2
  },
  {
    text: "配偶户口本",
    value: 3
  },
  {
    text: "结婚证",
    value: 3
  }
];

// 策略
let _strategy = storage.localGet("strategy");
let __strategy = [];
_strategy.forEach(item => {
  __strategy.push({ text: item.name, value:item.type})
})
export const STRATEGY = __strategy;

// 跟进类型
let _followUp = storage.localGet("followUp");
let __followUp = [];
_followUp.forEach(item => {
  __followUp.push({ text: item.name, value: item.type })
})
export const FOLLOWUP = __followUp;
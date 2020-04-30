import { get, post, put } from "./interceptor";
export default {
  // 登陆
  login: params => post({ params, url: "/login" }),
  loginOut: params => post({ params, url: "/logout" }),


  /******************************  vuex ******************************/
  // 公司
  company: params => get({ params, url: "/department/department/repayment/company/list" }),
  // 放款平台
  lendingPlatform: params => get({ params, url: "/manager/sys/dictionary/platform" }),
  // 还款状态
  repaymentState: params => get({ params, url: "/manager/sys/dictionary/money/back" }),
  // 项目状态
  projectState: params => get({ params, url: "/manager/sys/dictionary/projectStatus" }),
  // 责任人
  personLiable: params => get({ params, url: "/systemUser/findSubordinate" }),
  // 策略
  strategy: params => get({ params, url: "/manager/sys/dictionary/collection" }),
  // 跟进类型
  followUp: params => get({ params, url: "/manager/sys/dictionary/follow/up" }),


  /******************************  列表 ******************************/
  // 还款列表
  repayment: params => get({ params, url: "/manager/order/info/repayment/page/info" }),
  // 逾期列表
  overdue: params => get({ params, url: "/manager/order/info/page/info" }),
  // 代偿列表
  compensatory: params => get({ params, url: "/manager/order/info/withhold/page/info" }),
  

  /******************************  查询 ******************************/
  //主借人信息
  seeMainLoanPersonInfo: params => get({ params, url: `/manager/order/info/${params.orderId}/main/borrower` }),
  // 订单 ID 查询 还款期数及对应信息
  seeRepaymentStageNumInfo: params => get({ params, url: `/manager/loan/order/repayment/plan/${params.orderId}/orderId` }),
  // 订单 ID 查询 跟进记录
  seeFollowUpRecord: params => get({ params, url: `/manager/followup/log/${params.orderId}/orderId` }),


  /******************************  操作 ******************************/
  // 变更策略
  changeStrategy: params => put({ params, url: `/manager/order/info/${params.orderId}/strategy/state` }),
  // 添加跟进记录
  addFollowUpRecord: params => post({ params, url: `/manager/followup/log`, headers: { "Content-Type": "application/json;charset=UTF-8" } }),
  // 文件上传
  upLoad: (params, fileProgress) => post({ params, fileProgress, url: "/manager/business/operate/attachment", headers: { "Content-Type": "multipart/form-data" } }),
};

import post, { get } from "./ajax";
export default {
  // ************************* 测试接口随便写 *************************
  //单点登陆
  onlyLogin: params => post({ params, url: "/authorization" }),
  // 查询字典
  queryDictionaries: params => get({ params, url: "/dictionaries" }),
  // 查询贷款平台
  queryLoanPlatform: params => get({ params, url: "/loanPlatform" }),
  // 查询放款平台
  queryLendPlatform: params => get({ params, url: "/lendPlatform" }),
  // 查询贷款产品
  queryProduct: params => get({ params, url: "/product" }),
  // 查询还款管理
  queryRepayList: params => get({ params, url: "/repayList" }),
  // 查询还款计划
  queryRepayPlan: params => get({ params, url: "/repayPlan" }),
  // 查询还款明细
  queryRepayInfo: params => get({ params, url: "/repayInfo" })
};

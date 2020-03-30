import post, { get } from "./ajax";
export default {
  // ************************* 测试接口随便写 *************************
  //单点登陆
  onlyLogin: params => post({ params, url: "/authorization" }),
  // 查询字典
  queryDictionaries: params => get({ params, url: "/dictionaries" }),
  // 查询贷款平台
  queryLoanPlatform: params => get({ params, url: "/loanPlatform" }),
  // 查询贷款产品
  queryProduct: params => get({ params, url: "/product" })
};

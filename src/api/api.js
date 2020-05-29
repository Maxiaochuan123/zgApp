import { get, post, put } from "./interceptor";
export default {
  // 登陆
  login: params => post({ params, url: "/login" }),
  loginOut: params => post({ params, url: "/logout" }),


  /******************************  vuex ******************************/
  // 权限管理
  accessControl: params => get({ params, url: "/queryAuth" }),
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
  // 电话催收列表
  phone: params => get({ params, url: "/manager/order/info/page/collection/phone" }),
  // 业务催收列表
  business: params => get({ params, url: "/manager/order/info/page/collection/business" }),
  // 外勤催收列表
  visit: params => get({ params, url: "/manager/order/info/page/collection/visit" }),
  // 全员催收列表
  all: params => get({ params, url: "/manager/order/info/page/collection/all" }),
  

  /******************************  查询 ******************************/
  //主借人信息
  seeMainLoanPersonInfo: params => get({ params, url: `/manager/order/info/main/borrower/orderId` }),
  // 订单 ID 查询 还款期数及对应信息
  seeRepaymentStageNumInfo: params => get({ params, url: `/manager/loan/order/repayment/plan/orderId` }),
  // 订单 ID 查询 跟进记录
  seeFollowUpRecord: params => get({ params, url: `/manager/followup/log/orderId` }),
  // 订单 ID 查询 还款明细
  seeRepaymentDetailed: params => get({ params, url: `/manager/order/repayment/detailed` }),
  // 订单 ID 查询 订单信息
  seeOrderInfo: params => get({ params, url: `/manager/loan/order/repayment/orderId` }),
  // 客户 ID 查询 客户信息
  seeCustomerInfo: params => get({ params, url: `/manager/loan/customer/queryById` }),
  // 客户 ID 查询 客户相关项目编号
  seeProjectNoList: params => get({ params, url: `/manager/loan/order/projectNoList` }),
  // 客户 ID 查询 客户配偶
  seesCustomerPouse: params => get({ params, url: `/manager/loan/relation/mate/customer` }),
  // 项目 ID 查询 担保人
  seesEnsurePeople: params => get({ params, url: `/manager/loan/relation/guarantee/personal/order` }),
  // 客户 ID 查询 紧急联系人
  seesEmergencyContact: params => get({ params, url: `/manager/loan/relation/contacts/customer` }),

  // 部门
  seeDepartment: params => post({ params, url: "/department/findDepartmentTree" }),
  // 部门 id 模糊搜索 联系人信息
  seeDepUserInfo: params => get({ params, url: "/systemUser/departmentUserPage" }),

  // 通讯录 模糊搜索 联系人信息
  seeUserInfo: params => get({ params, url: "/systemUser/userPage" }),

  // 获取部门下所有用户 (转派)
  seeAllUser: params => get({ params, url: "/systemUser/queryCurrentUserDeptUser" }),
  

  /******************************  操作 ******************************/
  // 变更策略
  changeStrategy: params => put({ params, url: "/manager/order/info/primary/strategy/state" }),
  // 转派
  transfer: params => post({ params, url: "/manager/business/user/order/assign", headers: { "Content-Type": "application/json;charset=UTF-8" } }),
  // 回款
  collection: params => post({ params, url: "/manager/business/repayment/log", headers: { "Content-Type": "application/json;charset=UTF-8" } }),
  // 添加跟进记录
  addFollowUpRecord: params => post({ params, url: `/manager/followup/log`, headers: { "Content-Type": "application/json;charset=UTF-8" } }),
  // 文件上传
  upLoad: (params, fileProgress) => post({ params, fileProgress, url: "/manager/business/operate/attachment", headers: { "Content-Type": "multipart/form-data" } }),
};

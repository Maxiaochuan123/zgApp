<template>
  <div class="detailedCard">
    <AppBar :pageTitle="pageTitle" shadow occupyBtn></AppBar>
    <div class="contentBox">
      <div class="content-appBar basic-info">

        <div class="header"> <span>{{main.name}} ({{order.periodsIndex}}期)</span> </div>
        <div class="middle">
          <div class="itemBox">
            <div class="item"><span>身份证号</span> <span>{{ main.cardId | paramsError}}</span></div><div class="item"><span>手机号</span> <span>{{ main.phone | paramsError}}</span></div>
          </div>
          <div v-if="carTitle == '还款明细'">
            <div class="itemBox">
              <div class="item"><span>本期还款金额</span> <span>{{ order.periodsTotalAmount | paramsError("元")}}</span></div><div class="item"><span>应还款日期</span> <span>{{ order.periodsRepaymentDay | paramsError}}</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>放款平台</span> <span>{{ main.platformName | paramsError}}</span></div><div class="item"><span>还款方式</span> <span>{{ order.periodsRepaymentModel | paramsError}}</span></div>
            </div>
          </div>
          <div v-else-if="carTitle == '回款明细'">
            <div class="itemBox">
              <div class="item"><span>贷款金额</span> <span>{{ main.orderSourceAmount | paramsError("元")}}</span></div><div class="item"><span>应还总金额</span> <span>{{ order.periodsTotalAmount | paramsError("元")}}</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>拟代偿金额</span> <span>{{ order.withholdTotalAmount | paramsError("元")}}</span></div><div class="item"><span>代偿类型</span> <span>{{ order.orderTypeName | paramsError}}</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>代偿分类</span> <span>{{ order.orderClassification | paramsError}}</span></div><div class="item"><span>已还总金额</span> <span>{{ main.readyRepaymentAmount | paramsError("元")}}</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>剩余应还金额</span> <span>{{ main.surplusRepaymentAmount | paramsError("元")}}</span></div><div class="item"><span>所属公司</span> <span>{{ main.organizationName | paramsError}}</span></div>
            </div>
          </div>
        </div>

        <div v-if="carTitle == '还款明细'">
          <div v-if="detailedType == '还款'">
            <div class="header"> <span>实还款信息</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>还款金额</span> <span>{{ main.repaymentTotalAmount | paramsError("元")}}</span></div><div class="item"><span>实还款日期</span> <span>{{ order.periodsRepaymentDate | paramsError}}</span></div>
              </div>
              <div class="itemBox">
                <div class="item"><span>还款状态</span> <span>{{ order.periodsRepaymentStatusComment | paramsError}}</span></div><div class="item"><span>还款行为</span> <span>{{ order.periodsRepaymentAction | paramsError}}</span></div>
              </div>
            </div>
          </div>
          <div v-else-if="detailedType == '回款'">
            <section v-for="(item, index) in repayment" :key="index">
              <div class="header"> <span>实还款信息({{index+1}})</span> </div>
              <div class="middle">
                <div class="itemBox">
                  <div class="item"><span>已回款金额</span> <span>{{ item.repaymentAmount | paramsError("元")}}</span></div><div class="item"><span>回款日期</span> <span>{{ item.repaymentDate | paramsError}}</span></div>
                </div>
                <div class="itemBox">
                  <div class="item"><span>未回款金额</span> <span>{{ item.outstandingAmount | paramsError("元")}}</span></div><div class="item"><span>还款方式</span> <span>{{ item.repaymentType | paramsError}}</span></div>
                </div>
                <div class="itemBox">
                  <div class="item voucher"><span>回款凭证</span>
                    <div class="previewList" v-if="item.repaymentEvidenceList">
                      <PreviewUpload PreviewUpload :previewList="item.repaymentEvidenceList"></PreviewUpload>
                    </div>
                    <span v-else>无</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div style="margin-top:12px;">
            <div class="header"> <span>资方应还信息</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>本金</span> <span>{{ order.periodsFundingBaseAmount | paramsError("元")}}</span></div><div class="item"><span>利息</span> <span>{{ order.periodsFundingInterestAmount | paramsError("元")}}</span></div>
              </div>
              <div class="itemBox">
                <div class="item"><span>罚息</span> <span>{{ order.periodsFundingPenaltyAmount | paramsError("元")}}</span></div>
              </div>
            </div>
            <div class="header"> <span>平台应收信息</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>违约金</span> <span>{{ order.periodsPlatformFineAmount | paramsError("元")}}</span></div><div class="item"><span>罚息</span> <span>{{ order.periodsPlatformPenaltyAmount | paramsError("元")}}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="carTitle =='回款明细'">
          <div class="header"> <span>代偿放款</span> </div>
          <div class="middle">
            <div class="itemBox">
              <div class="item"><span>放贷金额</span> <span>{{ main.orderRealAmount | paramsError("元")}}</span></div><div class="item"><span>部门</span> <span>一 一</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>需代偿平台</span> <span>{{ main.platformName | paramsError}}</span></div>
            </div>
          </div>
          <div class="header"> <span>代偿回款</span> </div>
          <div class="middle" v-for="(item, index) in repayment" :key="index">
            <div class="itemBox">
              <div class="item"><span>回款金额</span> <span>{{ item.repaymentAmount | paramsError("元")}}</span></div><div class="item"><span>回款时间</span> <span>{{ item.repaymentDate | paramsError}}</span></div>
            </div>
            <div class="itemBox singleRow">
              <div class="item"><span>回款内容</span> <span>{{ item.comment | paramsError}}</span></div>
            </div>
            <div class="itemBox">
              <div class="item voucher"><span>回款凭证</span>
                <div class="previewList" v-if="item.repaymentEvidenceList">
                  <PreviewUpload PreviewUpload :previewList="item.repaymentEvidenceList"></PreviewUpload>
                </div>
                <span v-else>无</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import PreviewUpload from "@components/upLoad/PreviewUpload";
import { mapState } from "vuex"
export default {
  components: {
    AppBar, PreviewUpload
  },
  data() {
    return {
      route: this.$route.params,
      main:{}, //主借人信息
      order:{}, //当期还款信息
      repayment:{} //回款/还款明细
    }
  },
  computed: {
    ...mapState(["pageSource"]),

    pageTitle(){
      if(this.pageSource === "compensatory"){
        return "回款明细";
      }else{
        return "还款明细";
      }
    },

    carTitle(){
      if(this.pageSource === "compensatory"){
        return "回款明细";
      }else{
        return "还款明细";
      }
    },

    detailedType(){
      if(this.pageSource === "compensatory" || this.pageSource === "phone" || this.pageSource === "business" || this.pageSource === "visit" || this.pageSource === "all"){
        return "回款";
      }else{
        return "还款";
      }
    }
    
  },
  created () {
    // 获取明细
    this.api.seeRepaymentDetailed({orderId:this.route.orderId,orderNo:this.route.orderNo,periodsIndex:this.route.periodsIndex}).then(res => {
      if(res.message === "success"){
        let { mainBorrowerInfoDto, orderRepaymentPeriodsDto, repaymentLogDtoList} = res.data
        this.main = mainBorrowerInfoDto; this.order = orderRepaymentPeriodsDto; this.repayment = repaymentLogDtoList;
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .detailedCard{
    .content-appBar{
      height: calc(100vh - 56px);
    }
    .previewUpload{
      margin-top: 6px;
    }
  }
</style>

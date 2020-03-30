<!--
 * @Description: 还款计划
 * @Author: shenah
 * @Date: 2020-03-30 15:55:23
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-30 18:01:23
 -->

<template>
  <div class="repay-plan">
    <AppBar
      :menuList="menuList"
      :rightIcon="rightIcon"
      :rightIconFlag="rightIconFlag"
      @menuChange="menuChange"
      isMenu
      pageTitle="还款计划"
    ></AppBar>
    <div class="content">
      <div class="content-wrap">
        <!-- 基本信息 -->
        <div class="basic">
          <div class="title">
            <div>杜斯</div>
            <div class="no-repay">未还款</div>
          </div>
          <div class="title-line">
            <mu-divider></mu-divider>
          </div>
          <!-- 默认展示内容 -->
          <div class="default-show">
            <div class="item">
              <div class="item-flex">
                <label>身份证号</label>
                <div class="item-flex-text">510923198802250021</div>
              </div>
              <div class="item-flex">
                <label>手机号码</label>
                <div class="item-flex-text">18980521145</div>
              </div>
            </div>
          </div>
          <!-- 点击按钮展示 -->
          <div class="click-show">
            <div class="item">
              <div class="item-flex">
                <label>贷款金额</label>
                <div class="item-flex-text">8.5万元</div>
              </div>
              <div class="item-flex">
                <label>应还总金额</label>
                <div class="item-flex-text">9095472元</div>
              </div>
            </div>
            <div class="item">
              <div class="item-flex">
                <label>已还总金额</label>
                <div class="item-flex-text">1095472元</div>
              </div>
              <div class="item-flex">
                <label>剩余应还金额</label>
                <div class="item-flex-text">80,000.00元</div>
              </div>
            </div>
            <div class="item">
              <div class="item-flex">
                <label>总利息</label>
                <div class="item-flex-text">1954.72元</div>
              </div>
              <div class="item-flex">
                <label>贷款周期</label>
                <div class="item-flex-text">36期</div>
              </div>
            </div>
            <div class="item">
              <div class="item-flex">
                <label>每月还款日</label>
                <div class="item-flex-text">5号</div>
              </div>
              <div class="item-flex">
                <label>贷款日期</label>
                <div class="item-flex-text">2020.1.1-2022.2.3</div>
              </div>
            </div>
            <div class="item">
              <div class="item-flex">
                <label>放款日期</label>
                <div class="item-flex-text">2020.02.06</div>
              </div>
              <div class="item-flex">
                <label>还款卡号</label>
                <div class="item-flex-text">6222330073982084</div>
              </div>
            </div>
            <div class="item">
              <div class="item-flex">
                <label>放款平台</label>
                <div class="item-flex-text">工商-海南分行</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@api";
import AppBar from "@components/AppBar";
export default {
  name: "repayPlan",
  components: { AppBar },
  data() {
    return {
      rightIcon: "icon-gengduo1",
      rightIconFlag: true,
      menuList: [
        {
          title: "结清代偿申请",
          isLink: false,
          type: "clearApply",
          flag: true
        },
        {
          title: "部分还款",
          isLink: false,
          type: "someRepay",
          flag: true
        },
        {
          title: "无还本续贷",
          isLink: false,
          type: "noRenewalLoan",
          flag: true
        },
        {
          title: "贷款展期",
          isLink: false,
          type: "loanExtension",
          flag: true
        },
        {
          title: "提前结清",
          isLink: false,
          type: "earlyClear",
          flag: true
        },
        {
          title: "提前回购",
          isLink: false,
          type: "earlyReview",
          flag: true
        }
      ]
    };
  },
  props: {},
  mounted() {},
  methods: {
    menuChange() {},
    queryInfo() {
      Api.queryRepayPlan(this.id).then(res => {});
    }
  }
};
</script>
<style lang='less' scoped>
.repay-plan {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    padding-top: 60px;
    height: 100%;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .basic {
        background-color: #fff;
        width: 100%;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 10px;
          color: @primary-text;
          .no-repay {
            color: @primary;
          }
        }
        .title-line {
          padding: 0 0 12px 10px;
        }
        .default-show,
        .click-show {
          padding: 0 10px;
          width: 100%;
          .item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px 12px 0;
            .item-flex {
              min-width: 50%;
              max-width: 50%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12px;
              &:nth-child(even) {
                margin-left: 10px;
              }
              label {
                min-width: 60px;
                max-width: 60px;
                color: @regular-text;
              }
              .item-flex-text {
                flex-grow: 1;
                color: @primary-text;
                margin-left: 6px;
                word-break: break-word;
              }
            }
          }
        }
      }
    }
  }
}
</style>
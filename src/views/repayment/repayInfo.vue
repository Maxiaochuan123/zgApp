<!--
 * @Description: 还款明细
 * @Author: shenah
 * @Date: 2020-03-31 14:46:33
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-31 15:46:47
 -->

<template>
  <div class="repay-info">
    <AppBar pageTitle="还款明细"></AppBar>
    <div class="content">
      <div class="content-wrap">
        <Basic
          :row="details"
          class="info"
          type="info"
        ></Basic>
        <OpenShrink
          :showOpen="false"
          style="margin-top:12px"
        >
          <template slot="title">
            <div>应还信息</div>
          </template>
          <template slot="default-show">
            <div class="two-rank">
              <div class="two-rank-flex">
                <label>放款平台</label>
                <div class="two-rank-flex-text">工商-海南分行</div>
                <!-- <div class="two-rank-flex-text">{{'工商-海南分行' |codeInToName(dataSet.lendPlatform)}}</div> -->
              </div>
              <div class="two-rank-flex">
                <label>还款方式</label>
                <div class="two-rank-flex-text">等额本息</div>
              </div>
            </div>
            <div class="two-rank">
              <div class="two-rank-flex">
                <label>本期还款金额</label>
                <div class="two-rank-flex-text">{{2000 |formatThousandBit}}元</div>
              </div>
              <div class="two-rank-flex">
                <label>应还本金</label>
                <div class="two-rank-flex-text">{{3543254325.12 |formatThousandBit}}元</div>
              </div>
            </div>
            <div class="two-rank">
              <div class="two-rank-flex">
                <label>利息</label>
                <div class="two-rank-flex-text">{{1223|formatThousandBit}}元</div>
              </div>
              <div class="two-rank-flex">
                <label>罚息</label>
                <div class="two-rank-flex-text">{{5632 |formatThousandBit}}元</div>
              </div>
            </div>
          </template>
        </OpenShrink>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@api";
import AppBar from "@components/AppBar";
import OpenShrink from "@components/OpenShrink";
import Basic from "./components/Basic";
import { mapState } from "vuex";
export default {
  name: "repayInfo",
  components: { AppBar, OpenShrink, Basic },
  computed: {
    ...mapState(["dictionaries", "dataSet"])
  },
  data() {
    return {
      details: {}
    };
  },
  props: {},
  mounted() {
    this.query();
  },
  methods: {
    query() {
      Api.queryRepayInfo().then(res => {
        this.details = res.data;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.repay-info {
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
      .info {
        margin-top: 0px !important;
      }
    }
  }
}
</style>
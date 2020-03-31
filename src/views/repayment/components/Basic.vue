<!--
 * @Description: 还款的基本信息
 * @Author: shenah
 * @Date: 2020-03-31 14:55:44
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-31 15:35:49
 -->

 <template>
  <OpenShrink
    :defaultValue="defaultValue"
    :showOpen="type!=='info'"
    class="basic"
    style="margin-top:12px;"
  >
    <template slot="title">
      <div v-if="type ==='info'">{{row.name}}({{row.a}})</div>
      <div
        :class="{'over':row.l === 0}"
        v-if="type ==='info'"
      >已逾期{{row.overData}}天</div>
      <div v-if="type !=='info'">{{row.id}}期</div>
    </template>
    <template slot="default-show">
      <div
        class="details-title"
        v-if="type !=='info'"
      >
        <div class="details-title-item">
          <div class="primary-words">{{row.b |formatThousandBit}}元</div>
          <div class="sub-title">应还金额(元)</div>
        </div>
        <div class="details-title-item">
          <div
            :class="{'over':row.c !== 0}"
            class="primary-words"
          >{{row.c}}</div>
          <div
            :class="{'over':row.c !== 0}"
            class="sub-title"
          >逾期天数</div>
        </div>
        <div
          @click="toDetails(row)"
          class="details-title-item"
        >还款明细</div>
      </div>
      <div
        class="title-line"
        v-if="type !=='info'"
      >
        <mu-divider></mu-divider>
      </div>
    </template>
    <div slot="click-show">
      <div class="two-rank">
        <div class="two-rank-flex">
          <label>本期还款金额</label>
          <div class="two-rank-flex-text">{{row.d |formatThousandBit}}万元</div>
        </div>
        <div class="two-rank-flex">
          <label>应还日期</label>
          <div class="two-rank-flex-text">{{row.e}}</div>
        </div>
      </div>
      <div class="two-rank">
        <div class="two-rank-flex">
          <label>本金</label>
          <div class="two-rank-flex-text">{{row.f |formatThousandBit}}元</div>
        </div>
        <div class="two-rank-flex">
          <label>利息</label>
          <div class="two-rank-flex-text">{{row.g |formatThousandBit}}元</div>
        </div>
      </div>
      <div class="two-rank">
        <div class="two-rank-flex">
          <label>实际还款日期</label>
          <div class="two-rank-flex-text">{{row.h}}</div>
        </div>
        <div class="two-rank-flex">
          <label>剩余应还金额</label>
          <div class="two-rank-flex-text">{{row.i |formatThousandBit}}元</div>
        </div>
      </div>
      <div class="two-rank">
        <div class="two-rank-flex">
          <label>罚息</label>
          <div class="two-rank-flex-text">{{row.j |formatThousandBit}}元</div>
        </div>
        <div class="two-rank-flex">
          <label>违约金</label>
          <div class="two-rank-flex-text">{{row.j |formatThousandBit}}元</div>
        </div>
      </div>
      <div class="two-rank">
        <div class="two-rank-flex">
          <label>还款状态</label>
          <div class="two-rank-flex-text">{{row.k | codeInToName(dictionaries.repayStatus)}}</div>
        </div>
        <div class="two-rank-flex">
          <label>还款行为</label>
          <div
            :class="{'over':row.l === 0}"
            class="two-rank-flex-text"
          >{{row.l | codeInToName(dictionaries.repayBehavior)}}</div>
        </div>
      </div>
      <div class="two-rank">
        <div class="two-rank-flex">
          <label>还款方式</label>
          <div class="two-rank-flex-text">{{row.m}}</div>
        </div>
      </div>
    </div>
  </OpenShrink>
</template>
 
 <script>
import OpenShrink from "@components/OpenShrink";
import { mapState } from "vuex";
export default {
  name: "Basic",
  components: { OpenShrink },
  computed: {
    ...mapState(["dictionaries"]),
    defaultValue() {
      if (this.type === "info") {
        return true;
      }
      return this.show;
    }
  },
  data() {
    return {};
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  methods: {
    toDetails(row) {
      this.goPage("repayInfo", { id: row.id });
    }
  }
};
</script>
 <style lang='less' scoped>
.basic {
  .over {
    color: @primary !important;
  }
  .title-line {
    padding: 12px 0;
  }
  .details-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .details-title-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:first-child {
        align-items: flex-start;
      }
      &:last-child {
        padding: 5px 15px;
        border: 1px solid @regular-text;
        border-radius: 6px;
        align-items: flex-end;
      }
      .sub-title {
        font-size: 12px;
        color: @regular-text;
      }
    }
  }
}
</style>

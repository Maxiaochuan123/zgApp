<!--
 * @Description: 还款管理
 * @Author: shenah
 * @Date: 2020-03-30 14:17:46
 * @LastEditors: shenah
 * @LastEditTime: 2020-04-09 15:08:57
 -->
<template>
  <div class="repay-manage">
    <AppBar
      drawerIcon="icon-guolv"
      isDrawer
      pageTitle="还款管理"
    >
      <!-- 抽屉 -->
      <Screen
        :drawerList="drawerList"
        @getScreenParams="getScreenParams"
        slot="drawerContent"
      ></Screen>
    </AppBar>
    <SearchInputBar
      @searchInputBarChange="searchInputBarChange"
      placeholderText="搜索编号/客户姓名/手机号码"
    ></SearchInputBar>
    <div class="content">
      <div class="content-wrap">
        <mu-load-more
          :loading="loading"
          @load="load"
          class="list-wrap"
        >
          <div v-if="listObj.list.length">
            <div
              :key="index"
              class="repay-list"
              v-for="(row,index) in listObj.list"
            >
              <CardList>
                <template slot="title">
                  <div>{{row.customerId}} ></div>
                  <div
                    :class="{'no-repay':!row.repayStatus}"
                  >{{row.repayStatus | codeInToName(dictionaries.repayStatus)}}</div>
                </template>
                <template>
                  <div class="two-rank">
                    <div class="two-rank-flex">
                      <label>姓名</label>
                      <div class="two-rank-flex-text">{{row.customerName}}</div>
                    </div>
                    <div class="two-rank-flex">
                      <label>还款卡号</label>
                      <div class="two-rank-flex-text">6211365998523</div>
                    </div>
                  </div>
                  <div class="two-rank">
                    <div class="two-rank-flex">
                      <label>应还总金额</label>
                      <div class="two-rank-flex-text">90954.72</div>
                    </div>
                    <div class="two-rank-flex">
                      <label>到期还款日</label>
                      <div class="two-rank-flex-text">2019-02-03</div>
                    </div>
                  </div>
                  <div class="two-rank">
                    <div class="two-rank-flex">
                      <label>还款期数</label>
                      <div class="two-rank-flex-text">第13/36期</div>
                    </div>
                    <div class="two-rank-flex">
                      <label>本期应还</label>
                      <div class="two-rank-flex-text">2526.52</div>
                    </div>
                  </div>
                </template>
                <template slot="footer">
                  <div>{{row.updateTime}}</div>
                  <mu-button
                    @click="toDetails(row)"
                    color="primary"
                    small
                  >还款计划</mu-button>
                </template>
              </CardList>
            </div>
          </div>
          <Nothing
            :words="words"
            v-else
          ></Nothing>
        </mu-load-more>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Api from "@api";
import SearchInputBar from "@components/SearchInputBar.vue";
import AppBar from "@components/AppBar";
import Screen from "@components/Screen.vue";
import Nothing from "@components/Nothing.vue";
import CardList from "@components/CardList.vue";
export default {
  name: "repayManage",
  components: { AppBar, SearchInputBar, Screen, Nothing, CardList },
  computed: {
    ...mapState(["dictionaries", "dataSet"])
  },
  data() {
    return {
      words: "暂无还款列表",
      loading: false,
      requestParams: {
        pageIndex: 1,
        pageSize: 15
      },
      drawerList: {},
      listObj: {
        list: []
      }
    };
  },
  props: {},
  mounted() {
    this.initScreenList();
    this.queryList();
  },
  methods: {
    initScreenList() {
      this.drawerList = {
        loanPlatform: {
          fileTitle: "放款平台",
          valueField: "value",
          labelField: "label",
          type: "select",
          list: this.dataSet.lendPlatform,
          val: ""
        },
        createTime: {
          fileTitle: "更新开始时间",
          type: "date",
          placeholder: "请选择更新开始时间",
          val: ""
        },
        stopTime: {
          fileTitle: "更新结束时间",
          type: "date",
          placeholder: "请选择更新结束时间",
          val: ""
        },
        status: {
          defaultValue: [],
          fileTitle: "还款状态",
          mode: "single",
          valueField: "value",
          labelField: "label",
          list: this.dictionaries.repayStatus
        }
      };
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.search = value;
      this.requestParams.pageIndex = 1;
      this.queryList();
    },
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryList(true).then(() => {
        this.loading = false;
      });
    },
    getScreenParams(requestParams) {
      this.requestParams = {
        ...this.requestParams,
        ...requestParams
      };
      this.queryList();
    },
    queryList(flag) {
      return Api.queryRepayList(this.requestParams).then(res => {
        let data = res.data;
        let list = data.list;
        if (list.length === 0 && flag) {
          this.requestParams.pageIndex -= 1;
        }
        if (flag) {
          this.listObj.list.push(...list);
        } else {
          this.listObj = res.data;
        }
      });
    },
    toDetails(row) {
      this.goPage("repayPlan", { id: row.customerId });
    }
  }
};
</script>
<style lang='less' scoped>
.repay-manage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    padding-top: 110px;
    height: 100%;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .list-wrap {
        width: 100%;
        padding: 0 15px;
        .no-repay {
          color: @primary;
        }
      }
    }
  }
}
.repay-list {
  width: 100%;
  list-style-type: none;
  padding: 10px 0 0 0;
  .repay-list-wrap {
    width: 100%;
    height: 100%;
    padding: 0 24px 6px 0;
  }
}
</style>
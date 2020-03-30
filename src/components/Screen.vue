<template>
  <!-- 例子: <Screen slot="drawerContent" :drawerList="drawerList" @getScreenParams="getScreenParams"></Screen> -->

  <div class="drawerContent">
    <div class="drawerTitle">筛选</div>

    <div class="content">
      <div
        :key="index"
        class="screen"
        v-for="(item,index) in drawerList"
      >
        <div
          class="title"
          v-if="!(item.mode === 'single' || item.mode === 'multiple')"
        >{{item.fileTitle}}</div>

        <div
          class="screenInput"
          v-if="item.type === 'input'"
        >
          <i class="iconfont icon-sousuo1"></i>
          <mu-text-field
            :placeholder="item.placeholder"
            class="input"
            v-model="item.val"
          ></mu-text-field>
        </div>

        <!-- <div class="screenInput" v-else-if="item.type === 'searchInput'">
            <i class="iconfont icon-sousuo1"></i>
            <div class="shanchu" v-if="item.val"><i class="iconfont icon-shanchu" @click="item.val = ''"></i></div>
            <mu-select full-width filterable v-model="item.val" :placeholder="item.placeholder">
              <mu-option
                v-for="(one,index) in item.searchList"
                :key="index"
                :label="one[item.labelField]"
                :value="one[item.valueField]"
              ></mu-option>
            </mu-select>
        </div>-->
        <div
          class="screenInput"
          v-else-if="item.type === 'select'"
        >
          <mu-select
            filterable
            full-width
            v-model="item.val"
          >
            <mu-option
              :key="one[item.valueField]"
              :label="one[item.labelField]"
              :value="one[item.valueField]"
              v-for="one in item.list"
            ></mu-option>
          </mu-select>
        </div>
        <div
          class="screenInput"
          v-else-if="item.type === 'date'"
        >
          <span v-show="!item.val">{{item.placeholder}}</span>
          <i class="iconfont icon-rili"></i>
          <mu-date-input
            class="timeInput"
            container="bottomSheet"
            full-width
            icon="today"
            label-float
            type="date"
            v-model="item.val"
            value-format="YYYY-MM-DD"
          ></mu-date-input>
        </div>
        <ArrSingleOrMultiple
          :defaultValue="item.defaultValue"
          :labelField="item.labelField"
          :list="item.list"
          :mode="item.mode"
          :ref="`arrSingleOrMultiple${index}`"
          :title="item.fileTitle"
          :type="index"
          :valueField="item.valueField"
          @arrSingleOrMultipleChange="arrSingleOrMultipleChange"
          v-else-if="item.mode === 'single' || item.mode === 'multiple'"
        ></ArrSingleOrMultiple>
      </div>
    </div>

    <div class="operation">
      <mu-button
        @click="resetDrawerList"
        class="reset"
      >重置</mu-button>
      <mu-button
        @click="drawerSubmit"
        class="confirm"
      >确定</mu-button>
    </div>
  </div>
</template>

<script>
import ArrSingleOrMultiple from "./ArrSingleOrMultiple";
export default {
  props: {
    drawerList: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ArrSingleOrMultiple
  },
  data() {
    return {
      submitDrawerList: {}
    };
  },
  methods: {
    arrSingleOrMultipleChange({ type, value }) {
      this.drawerList[type] = { ...this.drawerList[type], val: value };
    },
    // 筛选 - 重置
    resetDrawerList() {
      for (let item in this.drawerList) {
        const onedata = this.drawerList[item];
        if (onedata.mode) {
          this.$refs[`arrSingleOrMultiple${item}`][0].handlerList(onedata.list);
        } else {
          onedata.val = "";
        }
      }
    },
    //筛选 - 确认
    drawerSubmit() {
      this.getParams();
      this.$emit("getScreenParams", this.submitDrawerList);
      // this.resetDrawerList();
      this.closeDrawerState();
    },
    getParams() {
      for (let item in this.drawerList) {
        this.submitDrawerList[item] = this.drawerList[item].val;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.drawerContent {
  height: 100%;
  // pointer-events: none;
  .drawerTitle {
    font-size: 20px;
    font-weight: @primary-weight;
    color: @primary-text;
    // background-color: aquamarine;
    // height: 20%;
  }
  .content {
    height: 200px;
    margin-top: 20px;
    background-color: #fff;
    overflow: auto;
    overflow-x: hidden;
    height: 86%;
  }
  .screen {
    &:not(:first-child) {
      margin-top: 20px;
    }
    .title {
      font-size: @primary-size;
      color: @primary-text;
      margin-bottom: 10px;
    }
    .screenInput {
      height: 36px;
      border-radius: 6px;
      border: 1px solid #9f9f9f;
      position: relative;
      > span {
        position: absolute;
        left: 10px;
        height: 36px;
        line-height: 36px;
        font-size: @regular-size;
        color: @regular-text;
      }
      > i {
        position: absolute;
        right: 10px;
        font-size: 24px;
        color: @regular-text;
        z-index: 99;
      }
      .icon-sousuo1 {
        font-size: 18px;
        top: 2px;
        display: inline-block;
      }
      .shanchu {
        position: absolute;
        top: 2px;
        right: 34px;
        z-index: 10;
        .icon-shanchu {
          color: @regular-text;
          font-size: 18px;
        }
      }
      .timeInput {
        margin: 0;
        padding: 0;
        min-height: 0;
        /deep/ .mu-input-icon {
          display: none;
        }
        /deep/ .mu-text-field-input {
          padding-left: 10px;
        }
        /deep/ .mu-text-field {
          width: 96%;
          margin: 2px 0 0 4px;
        }
      }
      .input {
        margin: 0;
        padding: 0;
        min-height: 0;
        /deep/ .mu-text-field-input {
          padding-left: 10px;
        }
        /deep/ .mu-text-field {
          width: 76%;
          margin: 2px 0 0 4px;
        }
      }
      .mu-select-input {
        font-size: @regular-size;
        color: @primary-text;
      }
      /deep/ .mu-select-action,
      /deep/ .mu-input-line,
      /deep/ .mu-input-focus-line {
        display: none;
      }
      /deep/ .mu-select-input.is-enable {
        padding-left: 12px;
      }
      /deep/ .mu-select-content input {
        position: absolute;
        top: -2px;
      }
    }
  }
  .operation {
    // height: 20%;
    // background-color: cornflowerblue;
    // position: absolute;
    // bottom: 46px;
    // width: 84%;
    display: flex;
    justify-content: space-between;
    .reset {
      color: @primary-text;
      background-color: #ededed;
    }
    .confirm {
      background-color: @primary;
      color: #fff;
    }
  }
}
</style>
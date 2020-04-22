<!--
 * @Description: 排列式的单选或者多选
 * @Author: shenah
 * @Date: 2019-10-16 13:19:22
 * @LastEditors: shenah
 * @LastEditTime: 2019-11-14 11:20:11
 -->

<template>
  <div class="arr-single-or-multiple">
    <div class="title">{{title}}</div>
    <div class="multipleSelection">
      <div
        :class="{
          'activeSelect':selectedClass(item)
        }"
        :key="index"
        @click="select(item)"
        v-for="(item,index) in showList"
      >{{item[labelField]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArrSingleOrMultiple",
  components: {},
  data() {
    return {
      showList: [],
      active: [] // 当前激活的
    };
  },
  watch: {
    list(val) {
      this.handlerList(val);
    }
  },
  mounted() {
    this.handlerList(this.list);
  },
  props: {
    title: {
      // 名称
      type: String,
      default: ""
    },
    defaultValue: {
      // 默认选中的值
      type: Array,
      default: () => []
    },
    mode: {
      // 单选还是多选single多选multiple
      type: String,
      default: "single"
    },
    list: {
      // 传入的数组
      type: Array,
      default: () => []
    },
    type: {
      // 对应的请求参数
      type: String
    },
    labelField: {
      // 对应的显示的值
      type: String,
      default: "text"
    },
    valueField: {
      // 对应的id值
      type: String,
      default: "value"
    }
  },
  methods: {
    handlerList(oldList) {
      let list = JSON.parse(JSON.stringify(oldList));
      let arr = JSON.parse(JSON.stringify(this.defaultValue));
      if (this.mode === "single") {
        if (arr.length > 0) {
          arr = [this.defaultValue[0]];
        }
      }
      this.showList = list;
      this.active = arr;
      this.$emit("arrSingleOrMultipleChange", {
        type: this.type,
        value: arr.join(",")
      });
    },
    select(row) {
      // 证明原来已经选中了
      let flag = this.active.indexOf(row[this.valueField]) > -1;
      if (this.mode === "single") {
        // 单选
        if (!flag) {
          let arr = [];
          arr.push(row[this.valueField]);
          this.active = arr;
        } else {
          this.active = [];
        }
      } else {
        // 多选
        if (!flag) {
          // 选中
          this.active.push(row[this.valueField]);
        } else {
          // 取消选中
          this.active = this.active.filter(
            item => item !== row[this.valueField]
          );
        }
      }
      this.$emit("arrSingleOrMultipleChange", {
        type: this.type,
        value: this.active.join(",")
      });
    },
    selectedClass(row) {
      return this.active.indexOf(row[this.valueField]) > -1;
    },
    reset() {
      // 重置参数
    }
  }
};
</script>
<style lang='less' scoped>
.arr-single-or-multiple {
  margin-top: 20px;
  .title {
    font-size: @primary-size;
    color: @primary-text;
    margin-bottom: 10px;
  }
  .multipleSelection {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    align-content: space-between;
    
    div {
      margin-left: 3%;
      height: 36px;
      text-align: center;
      font-size: @regular-size;
      color: @regular-text;
      background-color: #ededed;
      border-radius: 6px;
      padding: 8px 16px;
      margin-bottom: 6px;
    }
    .activeSelect {
      color: #fff;
      background-color: @primary;
    }
  }
}
</style>
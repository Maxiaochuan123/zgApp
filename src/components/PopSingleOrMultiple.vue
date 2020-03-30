<!--
 * @Description: 弹窗式的单选或者多选框
 * @Author: shenah
 * @Date: 2019-10-21 13:50:16
 * @LastEditors: shenah
 * @LastEditTime: 2020-03-30 11:11:41
 -->

<template>
  <div class="pop-single-or-multiple">
    <div
      @click="multipleSelect"
      class="show-content"
    >
      <mu-text-field
        :placeholder="`请选择${name}`"
        :prop="fieldName"
        :rows-max="3"
        disabled
        multi-line
        v-if="isShowText"
        v-model="showInputValue"
      ></mu-text-field>
      <div class="right-icon">
        <slot name="rightIcon">
          <mu-icon
            size="24"
            value=":iconfont icon-rightArrow"
          ></mu-icon>
        </slot>
      </div>
    </div>
    <mu-dialog
      :append-body="false"
      :open.sync="openFullscreen"
      dialog-class="select-pop-single-or-multiple-dialog"
      fullscreen
      transition="slide-bottom"
    >
      <div class="select-pop-single-or-multiple-body">
        <div class="select-pop-single-or-multiple-header">
          <div
            @click="closeFullscreenDialog"
            class="cancel"
          >取消</div>
          <div class="primary-words middle-text">{{name}}选择</div>
          <div
            @click="submit"
            class="ok"
          >确定</div>
        </div>
        <SearchInputBar
          @searchInputBarChange="searchInputBarChange"
          class="relate-business-bar"
          placeholderText="搜索"
          v-show="!Array.isArray(firstList)"
        ></SearchInputBar>
        <div class="content">
          <div
            class="content-users"
            v-if="showList.length"
          >
            <mu-load-more
              :loading="loading"
              @load="load"
              class="relate-business-list-wrap"
            >
              <div
                :key="index"
                @click="select(item)"
                class="index-users"
                v-for="(item,index) in showList"
              >
                <div class="index-users-left">
                  <img
                    :src="loadingImg('selected.png')"
                    class="select"
                    v-show="item.flag"
                  />
                  <img
                    :src="loadingImg('no-selected.png')"
                    class="select"
                    v-show="!item.flag"
                  />
                </div>
                <div class="index-users-right">
                  <!-- <mu-avatar
                    class="user-header"
                    size="40"
                  >
                    <img :src="changeImg(item)" />
                  </mu-avatar> -->
                  <div class="user-info">
                    <div class="name">{{item[textField]}}</div>
                    <div class="job">{{item.post}}</div>
                  </div>
                </div>
              </div>
            </mu-load-more>
          </div>
          <Nothing v-else></Nothing>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import SearchInputBar from "@components/SearchInputBar.vue";
import Nothing from "./Nothing";
import Api from "@api";
export default {
  name: "PopSingleOrMultiple",
  components: { SearchInputBar, Nothing },
  data() {
    return {
      requestParams: {
        // 有可能使用search有可能使用name
        name: "", // 模糊搜索
        search: "", // 模糊搜索
        pageIndex: 1,
        pageSize: 15
      },
      openFullscreen: false,
      showInputValue: "",
      showList: [], // 显示的列表
      selectedList: [], // 已经选择
      loading: false
    };
  },
  props: {
    vagueSearch: {
      type: String,
      default: "search"
    },
    firstList: {
      type: Array
    },
    extraParams: {
      // 额外的请求的参数
      type: Object,
      default: () => {}
    },
    isShowText: {
      // 单选single还是多选模式multiple
      type: Boolean,
      default: true
    },
    mode: {
      // 单选single还是多选模式multiple
      type: String,
      default: "single"
    },
    splitField: {
      // 需要拼接的字段
      type: String,
      default: ""
    },
    apiName: {
      // 列表查询的方法名称
      type: String,
      default: ""
    },
    defaultValue: {
      // 默认label的显示
      type: String,
      default: ""
    },
    fieldName: {
      // form表单所对应的数据库的字段名字
      type: String,
      default: ""
    },
    idField: {
      // 列表对应的id字段
      type: String,
      default: ""
    },
    textField: {
      // 列表对应的id字段
      type: String,
      default: ""
    },
    selected: {
      // 默认选中
      type: Array,
      default: () => []
    },
    name: {
      // 要选择的名称
      type: String,
      default: ""
    }
  },
  watch: {
    defaultValue(val) {
      this.inputValue = val;
      this.showInputValue = val;
    }
  },
  mounted() {
    this.inputValue = this.defaultValue;
    this.showInputValue = this.defaultValue;
  },
  methods: {
    changeImg(row) {
      let src = row.img;
      if (!row.img) {
        src = this.loadingImg("default-header.png");
      }
      return src;
    },
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.query(true).then(() => {
        this.loading = false;
      });
    },
    // 处理已经选择的
    handleSelected() {
      if (this.selected.length > 0) {
        if (this.mode === "single") {
          // 证明是单选
          let one = this.selected[0];
          this.selectedList = [one];
        } else {
          // 证明是多选
          this.selectedList = JSON.parse(JSON.stringify(this.selected));
        }
      }
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams[this.vagueSearch] = value;
      this.requestParams.pageIndex = 1;
      this.query();
    },
    query(flag) {
      if (Array.isArray(this.firstList)) {
        let list = this.firstList.map(item => ({
          ...item,
          flag: false
        }));
        for (let i = 0; i < this.selectedList.length; i++) {
          const one = this.selectedList[i];
          for (let j = 0; j < list.length; j++) {
            const two = list[j];
            if (one[this.idField] * 1 === two[this.idField] * 1) {
              two.flag = true;
              break;
            }
          }
        }
        this.showList = list;
        return Promise.resolve();
      } else {
        return Api[this.apiName](this.requestParams).then(res => {
          let list = res.data.list ? res.data.list : res.data;
          list = list.map(item => ({
            ...item,
            flag: false
          }));
          for (let i = 0; i < this.selectedList.length; i++) {
            const one = this.selectedList[i];
            for (let j = 0; j < list.length; j++) {
              const two = list[j];
              if (one[this.idField] * 1 === two[this.idField] * 1) {
                two.flag = true;
                break;
              }
            }
          }
          if (flag) {
            if (list.length === 0) {
              this.requestParams.pageIndex -= 1;
            } else {
              this.showList.push(...list);
            }
          } else {
            this.showList = list;
          }
        });
      }
    },
    select(row) {
      row.flag = !row.flag;
      if (this.mode === "single") {
        // 如果是单选
        if (row.flag) {
          // 选择上了
          this.showList.forEach(item => {
            if (row[this.idField] * 1 !== item[this.idField] * 1) {
              item.flag = false;
            }
          });
          let arr = [];
          arr.push(row);
          this.selectedList = arr;
        } else {
          // 取消选择
          this.selectedList = [];
        }
      } else {
        // 多选
        if (row.flag) {
          // 选择上了
          this.selectedList.push(row);
        } else {
          // 取消选择
          this.selectedList = this.selectedList.filter(
            item => item[this.idField] * 1 !== row[this.idField]
          );
        }
      }
    },
    multipleSelect() {
      // 点击多选框 extraParams
      this.requestParams = { ...this.requestParams, ...this.extraParams };
      this.openFullscreen = true;
      this.handleSelected();
      this.query();
      this.inputValue = this.defaultValue;
      this.showInputValue = this.defaultValue;
    },
    submit() {
      let ids = this.selectedList.map(item => item[this.idField]).join(",");
      let texts = this.selectedList.map(item => item[this.textField]).join(",");
      this.$emit("PopSingleOrMultipleChange", {
        ids,
        selectArr: this.selectedList,
        texts,
        idsField: this.splitField,
        textsField: this.fieldName
      });
      this.clearAll();
      this.openFullscreen = false;
    },
    closeFullscreenDialog() {
      // 取消
      this.clearAll();
      this.openFullscreen = false;
    },
    clearAll() {
      this.requestParams[this.vagueSearch] = "";
      this.requestParams.pageIndex = 1;
      this.selectedList = [];
    }
  }
};
</script>
<style lang='less'>
.select-pop-single-or-multiple-dialog {
  .mu-dialog-body {
    height: 100%;
    .select-pop-single-or-multiple-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      .select-pop-single-or-multiple-header {
        padding: 16px 10px;
        width: 100%;
        display: flex;
        align-items: center;
        .cancel {
          flex: 1;
        }
        .middle-text {
          flex: 1;
          text-align: center;
        }
        .ok {
          flex: 1;
          text-align: right;
          font-size: 16px;
          color: #ff0000;
        }
      }
      .relate-business-bar {
        position: static !important;
        width: 100%;
        padding: 12px 15px;
        background-color: #fff;
      }
      .content {
        width: 100%;
        flex: 1;
        padding: 20px 0;
        overflow: hidden;
        .content-users {
          height: 100%;
          overflow: auto;
          background-color: #fff !important;
          .index-users {
            display: flex;
            padding: 0 0 0 15px;
            align-items: center;
            .index-users-left {
              .select {
                width: 18px;
                height: 18px;
              }
            }
            .index-users-right {
              flex: 1;
              margin-left: 15px;
              display: flex;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid @primary-border;
              .user-info {
                margin-left: 12px;
                .name {
                  font-size: @primary-size;
                  color: @primary-text;
                  font-weight: @primary-weight;
                }
                .job {
                  font-size: @regular-size;
                  color: @regular-text;
                  font-weight: @regular-weight;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='less' scoped>
.pop-single-or-multiple {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .show-content {
    display: flex;
    justify-content: flex-end;
    /deep/ .mu-form-item-content {
      align-items: center;
    }
    .right-icon {
      height: 100%;
      margin: 0 !important;
      padding-right: 15px;
    }
  }
}
</style>
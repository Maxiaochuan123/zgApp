<!--
 * @Description: 通用表单显示
   => fieldId 字段id
   => formType 表单类型(如text)
   0 企业座机
   1 单行文本 text ; 
   2 多行文本 textarea; 
   3 单选 select;
   4 日期 date;
   5 数字 number;
   6 小数 floatnumber; 
   7 手机 mobile; 
   8 文件 file; 
   9 多选checkbox; 
   10 人员user; 
   11 附件 
   12 部门structure; 
   13 日期时间datetime; 
   14 邮箱email; 
   15客户customer; 
   16 商机business; 
   17 联系人contacts; 
   18 地图 map_address;
   19 产品类型category; 
   20 合同contract; 
   21 回款计划receivables_plan
* isNull 是否必填 1 是 0 否 int
* name 名称 string
* options 如果类型是选项，此处不能为空，多个选项以，隔开 string
* type 对应上面的formType中的数字
* value 值 string
* fieldType 是否是自定义字段 0. 自定义 1. 固定 int
* fieldName 字段名称 string
* setting 设置值 string
* relation 是自己加入的,单选下拉选择可能从接口获取
 *@Author: shenah
 -->
<template>
  <div class="general-form">
    <mu-form
      :model="form"
      class="mu-demo-form"
      label-position="left"
      ref="form"
    >
      <mu-paper
        :z-depth="0"
        class="block pad0"
      >
        <div
          :class="[(item.readonly === 1 &&inputArr.indexOf(item.type) > -1)?'no-can-input':'']"
          :key="index"
          class="p15"
          v-for="(item,index) in fieldList"
        >
          <mu-form-item
            :class="labelPosition(item).name"
            :label="item.name"
            :label-position="labelPosition(item).position"
            :label-width="labelPosition(item).labelWidth"
            :prop="item.fieldName"
            :rules="createRule(item)"
            v-if="item.htmlHidden!==1"
          >
            <!-- 输入框类型 -->
            <mu-text-field
              :disabled="item.readonly === 1"
              :maxLength="item.maxLength"
              :placeholder="placeholder(item,index)"
              :prop="item.fieldName"
              v-if="inputArr.indexOf(item.type) > -1"
              v-model.trim="form[item.fieldName]"
            ></mu-text-field>
            <!-- 单选类型 -->
            <div
              @click="showPicker(item)"
              class="surround"
              v-else-if="singleArr.indexOf(item.type) > -1"
            >
              <mu-text-field
                :placeholder="placeholder(item,index)"
                :prop="item.fieldName"
                disabled
                v-model="form[item.fieldName]"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
            <!-- 地图类型 -->
            <!-- <SelectAddress
              :defaultValue="form[item.fieldName]"
              :fieldName="item.fieldName"
              @addressChange="addressChange"
              v-else-if="mapArr.indexOf(item.type) > -1"
            ></SelectAddress> -->
            <!-- 多选 -->
            <PopSingleOrMultiple
              :apiName="item.apiName"
              :defaultValue="form[item.fieldName]"
              :fieldName="item.fieldName"
              :firstList="item.firstList"
              :idField="item.idField"
              :mode="item.mode"
              :name="item.name"
              :selected="form[item.splitField]"
              :splitField="item.splitField"
              :textField="item.textField"
              @PopSingleOrMultipleChange="PopSingleOrMultipleChange"
              v-else-if="multipleArr.indexOf(item.type) > -1"
            ></PopSingleOrMultiple>
            <!-- 上传文件  -->
            <UploadList
              @getEnclosureSuccessList="getEnclosureSuccessList(...arguments,item)"
              @getImgSuccessList="getImgSuccessList(...arguments,item)"
              class="upload-file"
              v-else-if="fileArr.indexOf(item.type) > -1"
            ></UploadList>
            <!-- 文本域类型 -->
            <mu-text-field
              :disabled="item.readonly === 1"
              :placeholder="placeholder(item,index)"
              :prop="item.fieldName"
              :rows="3"
              :rows-max="5"
              multi-line
              v-else-if="textareaArr.indexOf(item.type) > -1"
              v-model="form[item.fieldName]"
            ></mu-text-field>
            <!-- 日期类型 -->
            <mu-date-input
              :disabled="item.readonly === 1"
              :placeholder="placeholder(item,index)"
              :prop="item.fieldName"
              container="bottomSheet"
              v-else-if="dateArr.indexOf(item.type) > -1"
              v-model="form[item.fieldName]"
              value-format="YYYY-MM-DD"
            ></mu-date-input>
            <!-- 日期时间类型 -->
            <mu-date-input
              :disabled="item.readonly === 1"
              :placeholder="placeholder(item,index)"
              :prop="item.fieldName"
              clock-type="24hr"
              container="bottomSheet"
              type="dateTime"
              v-else-if="dateTimeArr.indexOf(item.type) > -1"
              v-model="form[item.fieldName]"
              value-format="YYYY-MM-DD HH:mm:ss"
            ></mu-date-input>
          </mu-form-item>
          <mu-divider v-if="item.htmlHidden!==1"></mu-divider>
        </div>
      </mu-paper>
    </mu-form>
    <!-- 弹出选择器 -->
    <Picker
      :anchor="pickerAnchor"
      :data="pickerList"
      :textTitle="pickerTitle"
      @confirm="handlePickerConfirm"
      name="name"
      picker-class="pickerClass"
      ref="picker"
    ></Picker>
  </div>
</template>

<script>
import Qs from "qs";
import Picker from "dm-vue-picker-h5";
// import SelectAddress from "@components/SelectAddress.vue";
import PopSingleOrMultiple from "@components/PopSingleOrMultiple.vue";
import UploadList from "@components/upLoad/uploadList.vue";
import { mapState } from 'vuex'
import Api from "@api";
import tool from "@static/js/tool";
import Toast from "muse-ui-toast";
export default {
  name: "GeneralForm",
  components: {
    Picker,
    UploadList,
    PopSingleOrMultiple
  },
  data() {
    return {
      // 输入框
      inputArr: [0, 1, 5, 6, 7, 14, 17],
      // 单选,
      singleArr: [3, 15],
      // 地图,
      mapArr: [18],
      // 文本域,
      textareaArr: [2],
      // 日期时间
      dateTimeArr: [13],
      // 日期
      dateArr: [4],
      // 文件类型
      fileArr: [8],
      // 多选
      multipleArr: [9],

      form: {},
      pickerTitle: "", // 下拉选的title
      pickerList: [], // 下拉选列表
      pickerAnchor: [0] // 下拉选默认值
    };
  },
  props: {
    fieldList: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.initForm(this.fieldList);
  },
  watch: {
    fieldList(val) {
      this.initForm(val);
    }
  },
  computed:{
    ...mapState(["crmToGroup","token_GJ"])
  },
  methods: {
    labelPosition(row) {
      const { type } = row;
      if (this.textareaArr.indexOf(type) > -1) {
        return {
          name: "line-feed",
          position: "top"
        };
      }
      if (this.fileArr.indexOf(type) > -1) {
        return {
          name: "line-feed",
          position: "top"
        };
      }
      return {
        labelWidth: "118px",
        name: "",
        position: "left"
      };
    },
    initForm(arr) {
      // 初始化form
      let form = {};
      arr.forEach(item => {
        let { fieldName, value, relation, type } = item;
        if (relation) {
          if (this.singleArr.indexOf(type) > -1) {
            const [idField, nameField] = relation.split(",");
            const name = arr.filter(one => one.fieldName === nameField);
            if (name.length > 0) {
              form[fieldName] = name[0].value;
            } else {
              form[fieldName] = value;
            }
          }
        } else {
          form[fieldName] = value;
        }
      });
      this.form = form;
    },
    /**
     * 通用创建rules的方法(本方法根据Muse-UI的验证规则生成)
     * @param row 代表当前字段的信息
     */
    createRule(row) {
      let self = this;
      // 生成相应的规则
      let { fieldName, name, isNull, regular, isUnique } = row;
      const { placeholderText } = this.typeJudge(row);
      let rule = [];
      if (isNull) {
        rule.push({
          validate: val => !!val,
          message: `必须${placeholderText}`
        });
      }
      if ((regular && regular.length > 0) || isUnique === 1) {
        rule.push({
          validate: function(...reset) {
            return self.currencyValidate(...reset, row, this, rule);
          },
          message: ""
        });
      }
      return rule;
    },
    /**
     * Muse-UI的验证方法里面的参数
     * @param {*} value 当前输入的值(validate内置参数)
     * @param {*} form 表示当前的form表单(validate内置参数)
     * @param {*} row  当前配置的字段的信息
     * @param {*} nowObj rule对象
     * @returns Boolean => 通过为true,不通过为false
     */
    currencyValidate(value, form, row, nowObj, rule) {
      const { isNull, regular, isUnique, fieldName, name } = row;
      if (!isNull) {
        if (value === "" || value === null || value === undefined) {
          return true;
        }
      }
      let error = ""; // 错误信息
      if (regular) {
        for (let i = 0; i < regular.length; i += 1) {
          const { rule: ruleStr, message } = regular[i];
          const reg = new RegExp(ruleStr);
          if (!reg.test(value)) {
            error = message;
            break;
          }
        }
      }
      if (error !== "") {
        nowObj.message = error;
        return false;
      }
      if (isUnique === 1) {
        const config = {
          customerName: {
            type: 2,
            id: "customerId"
          },
          mobile: {
            type: 1,
            id: "contactsId"
          }
        };
        let oneConfig = config[fieldName];
        if (!oneConfig) {
          return;
        }
        let emptyObj = {};
        this.orderAjax(
          {
            fieldName,
            name,
            val: value,
            types: oneConfig.type,
            id: form[oneConfig.id]
          },
          emptyObj
        );
        let { flag, msg } = emptyObj;
        nowObj.message = msg;
        return flag;
      } else {
        return true;
      }
    },
    placeholder(row) {
      // 提示
      let text = "";
      const { name, type, isNull } = row;
      const { placeholderText, isNullText } = this.typeJudge(row);
      text = `请${placeholderText}${isNullText}`;
      return text;
    },
    typeJudge({ name, type, isNull }) {
      let typeObj = {};
      if (
        this.inputArr.indexOf(type) > -1 ||
        this.textareaArr.indexOf(type) > -1
      ) {
        typeObj = {
          placeholderText: `输入${name}`,
          isNullText: isNull ? "(必填)" : "",
          texType: "input"
        };
      } else {
        typeObj = {
          placeholderText: `选择${name}`,
          isNullText: isNull ? "(必选)" : "",
          texType: "select"
        };
      }
      return typeObj;
    },
    showPicker(row) {
      const { fieldName, options, name, relation } = row;
      let nowValue = this.form[fieldName];
      if (relation) {
        const [idField, nameField] = relation.split(",");
        nowValue = this.form[idField];
      }
      this.pickerTitle = name;
      if (typeof options === "string") {
        this.pickerList = options.split(",").map((item, index) => {
          const [value, text = value] = item.split("^_^");
          if (nowValue && nowValue + "" === value) {
            this.pickerAnchor = [index];
          }
          return {
            text,
            value,
            fieldName,
            relation
          };
        });
      } else {
        this.pickerList = [
          {
            fieldName,
            text: "暂无数据",
            value: "暂无数据"
          }
        ];
      }
      this.$refs.picker.show();
    },
    handlePickerConfirm(value, column, text) {
      const {
        relation,
        fieldName,
        value: selectValue,
        text: selectText
      } = this.pickerList[column];
      if (relation) {
        const [idField, nameField] = relation.split(",");
        this.form[fieldName] = selectText;
        this.form[idField] = selectValue;
        this.form[nameField] = selectText;
      } else {
        this.form[fieldName] = selectText;
      }
    },
    multipleselecteChange({ textIds, texts, ids, idsField, textsField }) {
      // 多选框的回调
      this.form[textsField] = texts;
      this.form[idsField] = textIds;
      // 这个属性并没有双向绑定
      this.form[`${idsField}Id`] = ids;
    },
    PopSingleOrMultipleChange({ selectArr, texts, ids, idsField, textsField }) {
      // 多选框的回调
      this.form[textsField] = texts;
      this.form[idsField] = selectArr;
      // 这个属性并没有双向绑定
      this.form[`${idsField}Id`] = ids;
      this.$emit("generalFormChange", {
        fieldName: textsField,
        arr: selectArr
      });
    },
    addressChange({ value, fieldName, lng, lat, region }) {
      this.form[fieldName] = value;
      // 这里目前只有一个地址先写死如果后面有两种的话再动态匹配
      this.form.lng = lng;
      this.form.lat = lat;
      this.form.address = region;
      this.form.location = value;
      // this.form[`${fieldName}_lng`] = lng;
      // this.form[`${fieldName}_lat`] = lat;
      // this.from[`${fieldName}_region`] = region;
    },
    getImgSuccessList(res, row) {
      const { fieldName } = row;
      const { list, guid } = res;
      this.form[fieldName] = guid;
    },
    getEnclosureSuccessList(res, row) {
      const { fieldName } = row;
      const { list, guid } = res;
      this.form[fieldName] = guid;
    },
    // 同步的ajax
    orderAjax(params, emptyObj) {
      let obj = {};
      let login = JSON.parse(localStorage.getItem("login"));
      let token = "";

      if(!this.crmToGroup){
        token = login.accessToken;
      }else{
        token = this.token_GJ;
      }
      console.log('验证:',token)
      let ajax = new XMLHttpRequest();
      ajax.open("POST", `${window.config.service}/fields/verifying`, false); //false表示同步请求
      ajax.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      ajax.setRequestHeader("accessToken", token);
      ajax.onreadystatechange = function() {
        let { code, msg } = JSON.parse(ajax.responseText);
        if (ajax.readyState == 4 && ajax.status == 200) {
          if (code === 0) {
            emptyObj.flag = true;
            emptyObj.msg = "";
          } else {
            emptyObj.flag = false;
            emptyObj.msg = msg;
          }
        } else if (ajax.readyState == 4 && ajax.status == 302) {
          Toast.error({
            message: "token过期,或者没有登录"
          });
          localStorage.clear();
          window.location.href = `${window.location.protocol}//${window.location.host}/#/login`;
        } else if (ajax.readyState == 4 && ajax.status == 403) {
          Toast.warning({
            message: "您无权访问该页面"
          });
          window.history.go(-1);
        } else if (ajax.readyState == 4 && ajax.status == 500) {
          Toast.error({
            message: "服务器错误请联系管理员"
          });
          emptyObj.flag = false;
          emptyObj.msg = "服务器错误请联系管理员";
        }
      };
      ajax.send(Qs.stringify(params));
    }
  }
};
</script>
<style lang='less'>
.general-form {
  .line-feed {
    align-items: flex-start !important;
    .mu-form-item-content {
      width: 100% !important;
    }
  }
}
</style>
<style lang='less' scoped>
.nouse {
  visibility: hidden;
}
.pad0 {
  padding: 0 !important;
}
.p15 {
  padding: 0 15px;
}
.no-can-input {
  opacity: 0.76;
  background-color: #ededed;
}
.upload-file {
  width: 100%;
}
.mu-demo-form /deep/ .block .mu-form-item .mu-form-item-help {
  bottom: 0;
}
.mu-form-item /deep/ .mu-input-help,
.mu-form-item /deep/ .mu-input-line,
.mu-form-item /deep/ .mu-input-focus-line {
  display: none;
}
</style>
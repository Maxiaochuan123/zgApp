<template>
<!-- 使用方法
  type:"input / textarea / date month / picker", 字段类型
  field:"userName", 字段名
  label:"公证编号",  label标签
  rules:{
    required: true / false, 是否必填
    regExp:[{reg:/^\d{4}$/, message: "验证码错误"}] 正则不需要正则验证去掉
  }
 -->

  <div class="customerForm">
    <mu-form :model="form" class="mu-demo-form" label-position="left" ref="form">

      <div class="block" v-for="(item,index) in fieldList" :key="index">

        <!-- 输入框  -->
        <mu-form-item class="basic" :label="item.label" :prop="item.field.key" :rules="rules[item.field.key]" v-if="item.type === 'input'">
          <mu-text-field v-model.trim="form[item.field.key]" :prop="item.field.key" :placeholder="`请输入${item.label}`"></mu-text-field>
        </mu-form-item>

        <!-- 文本域 -->
        <mu-form-item class="textarea" :label="item.label" :prop="item.field.key" :rules="rules[item.field.key]" v-if="item.type === 'textarea'">
          <mu-text-field v-model.trim="form[item.field.key]" :prop="item.field.key" :placeholder="`请输入${item.label}`" multi-line :rows="1" :rows-max="6"></mu-text-field>
        </mu-form-item>

        <!-- 日期 & 月份 -->
        <mu-form-item class="basic date" :label="item.label" :prop="item.field.key" :rules="rules[item.field.key]" v-if="item.type === 'date' || item.type === 'month'">
          <span v-show="!form[item.field.key]">{{`请选择${item.label}`}}</span><mu-icon size="24" value=":iconfont icon-rightArrow"></mu-icon>
          <mu-date-input v-model="form[item.field.key]" :type="item.type" :value-format="item.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM'" :should-disable-date="disableDate" container="bottomSheet" label-float full-width></mu-date-input>
        </mu-form-item>

        <!-- 弹出 picker -->
        <div @click="showPicker(item)" v-if="item.type === 'picker'">
          <mu-form-item class="basic picker" :label="item.label" :prop="item.field.key" :rules="rules[item.field.key]">
            <mu-icon size="24" value=":iconfont icon-rightArrow"></mu-icon>
            <mu-text-field v-model.trim="form[item.field.key]" :prop="item.field.key" :placeholder="`请选择${item.label}`" disabled></mu-text-field>
          </mu-form-item>
        </div>

        <!-- 上传文件  -->
        <Upload class="upload-file" v-if="item.type === 'file'" @getImgID="getImgID" @getEnclosureID="getEnclosureID"></Upload>

      </div>
    </mu-form>
    
    <Picker :anchor="pickerAnchor" :data="pickerList" :textTitle="pickerTitle" @confirm="pickerConfirm" picker-class="pickerClass" ref="picker"></Picker>
  </div>
</template>

<script>
import Picker from "dm-vue-picker-h5";
import Upload from "@components/upLoad/Upload";
import { mapState } from "vuex"
import { YES_NO, STRATEGY, FOLLOWUP } from "@static/js/dictionaries"

export default {
  props: {
    fieldList:{
      type: Array,
      default: ()=>[]
    }
  },
  components: { Picker, Upload },
  data() {
    return {
      day:"", //今天日期
      form: {},
      rules:{},
      pickerItem:{},
      pickerTitle:"",
      pickerAnchor:[0],
      pickerList:[],
    }
  },
  created () {
    this.initForm();
    this.initRules();
    this.day = new Date();
  },
  computed: {
    ...mapState(["pageSource"])
  },
  methods: {

    // 图片 id list
    getImgID(data){
      this.form.attachmentIds.imgsID = [...data];
    },

    // 附件 id list
    getEnclosureID(data){
      this.form.attachmentIds.enclosureID = [...data];
    },


    // 控制日期选择返回
    disableDate(date){
      // return date.getTime() < Date.now() - 8.64e7; //包含今天
      return date.getTime() < Date.now(); //不包含今天
    },

    // picker 弹出
    showPicker(row){
      this.$refs.picker.show();
      this.pickerAnchor = [0];
      this.pickerItem = row;
      this.pickerTitle= row.label;

      switch (row.label) {
        case "变更策略": //催收类型
            this.pickerList = STRATEGY;
          break;
        case "跟进类型": //跟进类型
            this.pickerList = FOLLOWUP;
          break;
      }

      this.pickerList.forEach((item,index)=>{
        // console.log(item.text, row)
        if(item.text === row.field.value){
          this.pickerAnchor = [index]
        }
      })
    },
    // picker 确认
    pickerConfirm(value, column, text){
      this.pickerAnchor = [column];
      this.form[this.pickerItem.field.key] = text[0];
    },

    // 初始化表单
    initForm(){
      this.fieldList.forEach((item,index) => {
        this.$set(this.form,item.field.key,item.field.value)
      })
    },

    // 生成验证
    initRules(){
      let getMsg = type => {
        if(type === "input" || type === "textarea"){
          return '填写';
        }else if(type === "picker" || type === "date" || type === "month"){
          return '选择';
        }
      }

      let validateFn = val =>{
        if(val){
          this.$refs.form.clear();
          return true
        }else{
          return false
        }
      }

      this.fieldList.forEach((item,index) => {
        this.$set(this.rules,item.field.key,[])
        if(item.rules.required){
          this.rules[item.field.key].push({ validate: val => validateFn(val) , message: `必须${getMsg(item.type)}${item.label}`});
        }
        if(item.rules.regExp && item.rules.regExp.length >= 0){
          item.rules.regExp.forEach(regItem => {
            this.rules[item.field.key].push({ validate: val => regItem.reg.test(val), message: regItem.message});
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .customerForm{

    .block{
      // height: 46px;
      // overflow: hidden;
      &:not(:last-child){
        border-bottom: 1px solid @primary-border;
      }
    }

    // 弹出框 picker
    .picker, .date{
      position: relative;
      i{
        position: absolute;
        right: 0;
      }
    }

    // 日期
    .date{
      span{
        color: @regular-text;
        font-size: @primary-size;
        position: absolute;
        top: 6px;
      }
    }

    // 输入框
    /deep/ .mu-form-item__label-left, .mu-form-item__label-right{
      min-height: 46px !important;
      padding-top: 0 !important;
    }
    
    .mu-form-item{
      margin-bottom: 0;
      // padding-bottom: 0;
      align-items: center !important;
      // position: static;
      background-color: #fff;
      padding: 0 15px;

      /deep/ .mu-form-item-help{
        z-index: 999;
      }

      /deep/ .mu-form-item-label, .mu-form-item__focus{
        color: @primary-text;
        font-size: @primary-size;
      }
    }

    // input 基础样式
    .basic{
      /deep/ .mu-form-item-label{
        width: 130px;
        padding-right: 0;
      }
      /deep/ .mu-form-item-content{
        position: relative;
        height: 44px;
        .mu-icon{
          margin-top: 6px;
          width: 18px !important;
        }
        .mu-text-field-input{
          height: 44px;
        }
        .mu-input{
          position: absolute;
          right: 0;
          .mu-input-line{
            display: none;
          }
        }
      }
    }
    
    // 文本域
    .textarea{
      flex-direction: column;
      padding: 10px 15px 0 !important;
      /deep/ .mu-form-item-label{
        width: 100%;
      }
      /deep/.mu-form-item-content{
        width: 100%;
        .mu-input-content{
          padding: 4px 0 8px;
        }
        .mu-input-line{
          display: none;
        }
      }
    }

  }
</style>

<template>
<!-- 使用方法
  type:"input / date month / picker", 字段类型
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

        <!-- 输入框 -->
        <mu-form-item :label="item.label" :prop="item.field" :rules="rules[item.field]" v-if="item.type === 'input'">
          <mu-text-field v-model.trim="form[item.field]" :prop="item.field" :placeholder="`请输入${item.label}`"></mu-text-field>
        </mu-form-item>

        <!-- 日期 & 月份 -->
        <div class="date">
          <mu-form-item :label="item.label" :prop="item.field" :rules="rules[item.field]" v-if="item.type === 'date' || item.type === 'month'">
            <span v-show="!form[item.field]">{{`请选择${item.label}`}}</span><mu-icon size="24" value=":iconfont icon-rightArrow"></mu-icon>
            <mu-date-input v-model="form[item.field]" :type="item.type" container="bottomSheet" label-float full-width></mu-date-input>
          </mu-form-item>
        </div>

        <!-- 弹出 picker -->
        <div @click="showPicker(item)" v-if="item.type === 'picker'">
          <mu-form-item class="picker" :label="item.label" :prop="item.field" :rules="rules[item.field]">
            <mu-icon size="24" value=":iconfont icon-rightArrow"></mu-icon>
            <mu-text-field v-model.trim="form[item.field]" :prop="item.field" :placeholder="`请选择${item.label}`" disabled></mu-text-field>
          </mu-form-item>
        </div>
      </div>
    </mu-form>
    
    <Picker :anchor="pickerAnchor" :data="pickerList" :textTitle="pickerTitle" @confirm="pickerConfirm" picker-class="pickerClass" ref="picker"></Picker>
  </div>
</template>

<script>
import Picker from "dm-vue-picker-h5";
import { YES_NO } from "@static/js/dictionaries"

export default {
  props: {
    fieldList:{
      type: Array,
      default: ()=>[]
    }
  },
  components: { Picker },
  data() {
    return {
      form: {},
      rules:{},
      pickerItem:{},
      pickerTitle:"",
      pickerAnchor:[0],
      pickerList:[],
    }
  },
  created () {
    this.initRules();
  },
  methods: {
    // picker 弹出
    showPicker(row){
      this.$refs.picker.show();
      this.pickerAnchor = [0];
      this.pickerItem = row;
      this.pickerTitle= row.label;
      this.pickerList = YES_NO; //上拉菜单

      this.pickerList.forEach((item,index)=>{
        if(item.text === this.form[row.field]){
          this.pickerAnchor = [index]
        }
      })
    },
    // picker 确认
    pickerConfirm(value, column, text){
      this.pickerAnchor = [column];
      this.form[this.pickerItem.field] = text[0];
    },

    // 生成验证
    initRules(){
      let getMsg = type => {
        if(type === 'input'){
          return '填写';
        }else if(type === 'picker' || type === 'date'){
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
        this.$set(this.rules,item.field,[])
        if(item.rules.required){
          this.rules[item.field].push({ validate: val => validateFn(val) , message: `必须${getMsg(item.type)}${item.label}`});
        }
        if(item.rules.regExp && item.rules.regExp.length >= 0){
          item.rules.regExp.forEach(regItem => {
            this.rules[item.field].push({ validate: val => regItem.reg.test(val), message: regItem.message});
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
      height: 46px;
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

      /deep/ .mu-form-item-label, .mu-form-item__focus{
        color: @primary-text;
        font-size: @primary-size;
      }

      /deep/ .mu-form-item-label{
        width: 130px;
        padding-right: 0;
      }

      /deep/ .mu-form-item-content{
        position: relative;
        height: 44px;
        .mu-text-field-input{
          height: 44px;
        }
        .mu-input{
          position: absolute;
          right: 0;
          .mu-input-line{
            display: none;
          }
          .mu-input-focus-line{
            bottom: 2px;
          }
        }
      }
    }

  }
</style>

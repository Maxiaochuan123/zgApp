<template>
  <div class="archivingEdit">
    <!-- 补充信息 -->
    <div class="addInfo">
      <div class="itemBox header">补充信息</div>
      <CustomerForm ref="customerForm" :fieldList="fieldList"></CustomerForm>
    </div>
    <!-- 弹出选择器 -->
    <Picker :anchor="pickerAnchor" :data="pickerList" textTitle="档案类型" @confirm="pickerConfirm" picker-class="pickerClass" ref="picker"></Picker>

    <!-- 纸质归档明细 -->
    <div class="detailed">
      <div class="header"><span>纸质归档明细</span> <img src="@static/images/tianjia.png" @click="add"></div>
      <div class="block" v-for="(item,index) in detailed" :key="index">
        <div class="imgBox"><img src="@static/images/jianshao.png" @click="reduce(index)"></div>
        <div class="itemBox">
          <div class="item">
            <span>档案类型</span><div class="select" @click="pickerShow('档案类型',index)"><span>{{item.pickerVal}}</span><mu-icon size="24" value=":iconfont icon-xiajiantou"></mu-icon></div>
          </div>
          <div class="item">
            <span>原件份数</span><div class="input"><input type="number" @input="limit(item.originalNumber,index,'originalNumber')" v-model="item.originalNumber"></div>
          </div>
          <div class="item">
            <span>复印件份数</span><div class="input"><input type="number" @input="limit(item.copyNumber,index,'copyNumber')" v-model="item.copyNumber"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传组件 -->
    <Upload></Upload>

    <!-- 操作栏 -->
    <ActionBar :secondaryTest="secondaryTest" :confirmTest="confirmTest" @secondaryCallback="secondaryCallback" @confirmCallback="confirmCallback"></ActionBar>
  </div>
</template>

<script>
import Picker from "dm-vue-picker-h5";
import CustomerForm from "@components/basics/CustomerForm";
import Upload from "@components/upLoad/Upload";
import ActionBar from "@components/basics/ActionBar";
import { ARCHIVES } from "@static/js/dictionaries"

export default {
  components: {
    Picker, CustomerForm, Upload, ActionBar
  },
  data() {
    return {
      route: this.$route.params,

      fieldList:[],

      detailed:[{
        pickerVal:"",
        originalNumber:1,
        copyNumber:1,
      }],
      detailedPickerIndex:0,
      pickerAnchor:[0],
      pickerList: ARCHIVES,
    }
  },
  created () {
    this.fieldList = [{
      type:"picker",
      field:{ key:"pickerVal", value:"" },
      label:"是否有公证书",
      rules:{ required: false }
    },{
      type:"input",
      field:{ key:"number", value:"" },
      label:"公证书编号",
      rules:{ required: true }
    },{
      type:"input",
      field:"name",
      field:{ key:"name", value:"" },
      label:"代领人姓名",
      rules:{ required: false }
    },{
      type:"input",
      field:{ key:"expressNumber", value:"" },
      label:"快递单号",
      rules:{ required: false }
    },{
      type:"date",
      field:{ key:"dateval", value:"" },
      label:"邮寄日期",
      rules:{  required: false }
    },{
      type:"input",
      field:{ key:"address", value:"" },
      label:"邮寄地址",
      rules:{ required: false }
    }]
  },
  computed: {
    secondaryTest(){
      if(this.route.state === 'waitTransfer' || this.route.state === 'reject'){
        return '取消';
      }else if(this.route.state === 'waitFile'){
        return '驳回';
      }
    },
    confirmTest(){
      if(this.route.state === 'waitTransfer' || this.route.state === 'reject'){
        return '确认移交';
      }else if(this.route.state === 'waitFile'){
        return '确认归档';
      }
    }
  },
  methods: {
    // 显示 picker
    pickerShow(title,index){
      this.$refs.picker.show();
      this.detailedPickerIndex= index;
      this.pickerAnchor = [0];

      this.detailed.forEach((item,i)=>{
        this.pickerAnchor = item.pickerVal ? [item.pickerVal === this.detailed[i].pickerVal ? index : 0] : [0];
      })
    },
    // picker 确定
    pickerConfirm(value, column, text){
      this.pickerAnchor = [column];
      this.detailed[this.detailedPickerIndex].pickerVal = text[0];
    },
    // 限制输入返回
    limit(val,index,type){
      if(val > 10){
        type === "originalNumber" ? this.detailed[index].originalNumber = 10 : this.detailed[index].copyNumber = 10;
      }else if(val < 0){
        type === "originalNumber" ? this.detailed[index].originalNumber = 1 : this.detailed[index].copyNumber = 1;
      }
    },
    // 添加归档明细
    add(){
      this.detailed.push({
        pickerVal:"",
        originalNumber:1,
        copyNumber:1,
      })
    },
    // 删除归档明细
    reduce(index){
      this.detailed = this.detailed.filter((item,i)=>{
        return i !== index;
      })
    },
    // 取消
    secondaryCallback(){
      if(this.route.state === 'waitTransfer' || this.route.state === 'reject'){
        console.log('取消')
        // this.goBack();
      }else if(this.route.state === 'waitFile'){
        console.log('驳回')
      }
    },
    // 确认移交
    confirmCallback(){
      if(this.route.state === 'waitTransfer' || this.route.state === 'reject'){
        console.log('确认移交')
        
      }else if(this.route.state === 'waitFile'){
        console.log('确认归档')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .archivingEdit{
    margin-bottom: 84px;
    .addInfo{
      margin-top: 12px;
      font-size: @primary-size;
      color: @primary-text;
      padding: 0 15px;
      background-color: #fff;
      .header{
        font-size: @regular-size;
        padding-left: 5px;
        height: 44px !important;
        // height: 32px !important;
      }
      .itemBox{
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // position: relative;
        &:not(:last-child){
          border-bottom: 1px solid @primary-border;
        }
        .input{
          width: 67%;
          height: 100%;
          padding-left: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          
          .mu-input{
            margin: 0;
            padding: 0;

            min-height: 46px;
            /deep/ .mu-input-line{
              display: none;
            }
            /deep/ .mu-input-content{
              height: 46px;
            }
            /deep/ .mu-input-focus-line{
              bottom: 2px;
            }
          }
        }
        .date{
          span{
            position: absolute;
            color: @regular-text;
          }
        }
        .select,.date{
          i{
            width: initial !important;
            height: initial !important;
          }
        }
      }
    }

    .detailed{
      color: @primary-text;
      font-size: @regular-size;
      background-color: #fff;
      padding: 12px 20px;
      margin-top: 12px;

      img{
        width: 20px;
        height: 20px;
      }
      
      .header{
        padding-bottom: 12px;
        border-bottom: 1px solid @primary-border;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .block{
        display: flex;
        font-weight:400;
        .imgBox{
          width: 20px;
          position: relative;
          img{
            position: absolute;
            bottom: 5px;
          }
        }
        .itemBox{
          width: 100%;
          padding-left: 20px;
          display: flex;
          justify-content: space-between;
          .item{
            display: flex;
            flex-direction: column;
            span{
              margin: 5px 0;
            }
            .select{
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 108px;
              height: 30px;
              padding: 5px 0px 5px 14px;;
              border: 1px solid @regular-text;
              i{
                width: initial !important;
                height: initial !important;
              }
              span{
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
                text-overflow: ellipsis;
              }
            }
            .input{
              width: 50px;
              height: 30px;
              border: 1px solid @regular-text;
              // display: flex;
              // justify-content: space-between;
              // align-items: center;
              input{
                width: 100%;
                height: 100%;
                padding: 5px 14px;
              }
            }
          }
        }
      }
    }
  }
</style>

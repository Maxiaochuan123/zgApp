<template>
  <div class="archivingEdit">
    <!-- 补充信息 -->
    <div class="info">
      <div class="itemBox header">补充信息</div>
      <div class="itemBox"><span>是否有公正证书</span> <span>否</span></div>
      <div class="itemBox"><span>公证书编号</span> <span>zs:1234432</span></div>
      <div class="itemBox"><span>代领人姓名</span> <span>张三</span></div>
      <div class="itemBox"><span>快递单号</span> <span>kd:598671296985231</span></div>
      <div class="itemBox"><span>邮寄日期</span> <span>2020-4-20</span></div>
      <div class="itemBox"><span>邮寄地址</span> <span class="address">四川省 成都市 双流区 怡丰新城 双流区 怡丰新城</span></div>
    </div>

    <!-- 纸质归档明细 -->
    <div class="detailed">
      <div class="header"><span>纸质归档明细</span></div>
      <div class="describe"><span>档案类型</span><span>原件份数</span><span>复印件份数</span></div>
      <div class="item"><span>借款合同</span><span>1</span><span>1</span></div>
      <div class="item"><span>借款合同</span><span>1</span><span>1</span></div>
    </div>

    <!-- 上传组件 -->
    <Upload></Upload>

    <!-- 归档编号 -->
    <div class="info">
      <div class="itemBox header">归档编号</div>
      <div class="itemBox"><span>归档柜号</span> <span>324234234234</span></div>
      <div class="itemBox"><span>档案编号</span> <span>324234234234</span></div>
      <div class="itemBox"><span>钥匙柜号</span> <span>324234234234</span></div>
      <div class="itemBox"><span>钥匙收纳编号</span> <span>123333333123</span></div>
    </div>
  </div>
</template>

<script>
import Picker from "dm-vue-picker-h5";
import Upload from "@components/upLoad/Upload";
import ActionBar from "@components/basics/ActionBar";

export default {
  components: {
    Picker, Upload, ActionBar
  },
  data() {
    return {
      form:{
        pickerVal:"否",
        number:"",
        name:"",
        expressNumber:"",
        date:"",
        address:""
      },
      detailed:[{
        pickerVal:"",
        originalNumber:1,
        copyNumber:1,
      }],
      detailedPickerIndex:0,

      pickerTitle:"是否有公正证书",
      pickerAnchor:[0],
      pickerList:[],

      pickerList_0:[{
        text: "是",
        value: "0"
      },{
        text: "否",
        value: "1"
      }],
      pickerList_1:[{
        text: "是AA",
        value: "0"
      },{
        text: "否BB",
        value: "1"
      }],
    }
  },
  methods: {
    // 显示 picker
    pickerShow(title,index){
      this.$refs.picker.show();
      this.pickerTitle= title;
      this.detailedPickerIndex= index;
      
      if(title === '是否有公正证书'){
        this.pickerList = this.pickerList_0;
        this.pickerList.forEach((item,index)=>{
          this.pickerAnchor = [item.text === this.form.pickerVal ? index : 0];
        })
      }else if(title === '档案类型'){
        this.pickerList = this.pickerList_1;
        this.detailed.forEach((item,i)=>{
          this.pickerAnchor = item.pickerVal ? [item.pickerVal === this.detailed[i].pickerVal ? index : 0] : [0];
        })
      }
    },
    // picker 确定
    pickerConfirm(value, column, text){
      if(this.pickerTitle === '是否有公正证书'){
        this.form.pickerVal = text[0];
        this.pickerAnchor = [column];
      }else if(this.pickerTitle === '档案类型'){
        this.detailed[this.detailedPickerIndex].pickerVal = text[0];
      }
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
      this.goBack();
    },
    // 确认移交
    confirmCallback(){
      console.log(2)
    }
  }
}
</script>

<style lang="less" scoped>
  .archivingEdit{
    .info{
      margin-top: 12px;
      font-size: @primary-size;
      color: @primary-text;
      padding: 0 15px;
      background-color: #fff;
      .header{
        font-size: @regular-size;
        padding-left: 5px;
        height: 44px !important;
      }
      .itemBox{
        min-height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // position: relative;
        &:not(:last-child){
          border-bottom: 1px solid @primary-border;
        }
        .address{
          padding: 12px 0;
        }
        span:nth-child(1){
          color: @regular-text;
        }
        span:nth-child(2){
          color: @primary-text;
          display: inline-block;
          width: 64%;
          text-align: left;
        }
      }
    }

    .detailed{
      color: @primary-text;
      font-size: @regular-size;
      background-color: #fff;
      padding: 12px 20px;
      margin-top: 12px;
      
      .header{
        padding-bottom: 12px;
        border-bottom: 1px solid @primary-border;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .describe, .item{
        display: flex;
        justify-content: space-between;
        font-weight:400;
        margin-top: 10px;
      }
      .describe{
        span{
          &:nth-child(2){
            text-align: center;
          }
          &:nth-child(3){
            text-align: right;
          }
        }
      }
      .item{
        color: @regular-text;
        span:not(:first-child){
          padding-right: 8%;
        }
      }
    }
  }
</style>

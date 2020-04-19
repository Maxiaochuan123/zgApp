<template>
  <!-- 还款计划 -->
  <div class="Archiving">
    <AppBar pageTitle="还款计划" :menuList="menu.repayment"></AppBar>
    <div class="contentBox">
      <div class="content">
        <mu-tabs :value.sync="tabsActive" inverse color="primary" indicator-color="primary" center>
          <mu-tab>基本信息</mu-tab>
          <mu-tab>相关记录</mu-tab>
        </mu-tabs>
        <div class="body">
          <div class="basicInfo" v-if="tabsActive==0">
            <!-- 基础信息 -->
            <InfoCard></InfoCard>

            <!-- 补充信息 -->
            <!-- <div class="addInfo">
              <div class="itemBox header">补充信息</div>
              <div class="itemBox"><span>是否有公正证书</span><div class="input select" @click="pickerShow('是否有公正证书',pickerAnchor)"><span>{{form.pickerVal}}</span><mu-icon size="24" value=":iconfont icon-rightArrow"></mu-icon></div></div>
              <div class="itemBox"><span>公证书编号</span><div class="input"><mu-text-field placeholder="请输入编号" v-model.trim="form.number" ></mu-text-field></div></div>
              <div class="itemBox"><span>代领人姓名</span><div class="input"><mu-text-field placeholder="请输入姓名" v-model.trim="form.name" ></mu-text-field></div></div>
              <div class="itemBox"><span>快递单号</span><div class="input"><mu-text-field placeholder="请输入单号" v-model.trim="form.expressNumber" ></mu-text-field></div></div>
              <div class="itemBox"><span>邮寄日期</span><div class="input date"><span v-show="!form.date">请选择日期</span><mu-date-input v-model="form.date" type="date" label-float full-width></mu-date-input><mu-icon size="24" value=":iconfont icon-rightArrow"></mu-icon></div></div>
              <div class="itemBox"><span>详细地址</span><div class="input"><mu-text-field placeholder="请输入地址" v-model.trim="form.address" ></mu-text-field></div></div>
            </div> -->
            <!-- 弹出选择器 -->
            <Picker :anchor="pickerAnchor" :data="pickerList" :textTitle="pickerTitle" @confirm="pickerConfirm" picker-class="pickerClass" ref="picker" ></Picker>

            <!-- 纸质归档明细 -->
            <div class="detailed">
              <div class="header"><span>纸质归档明细</span> <img src="../../../../static/images/tianjia.png" @click="add"></div>
              <div class="block" v-for="(item,index) in detailed" :key="index">
                <div class="imgBox"><img src="../../../../static/images/jianshao.png" @click="reduce(index)"></div>
                <div class="itemBox">
                  <div class="item">
                    <span>档案类型</span><div class="select" @click="pickerShow('档案类型',index)"><span>{{item.pickerVal}}</span><mu-icon size="24" value=":iconfont icon-xiajiantou1"></mu-icon></div>
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
          </div>
          <div class="followUp" v-if="tabsActive==1">
            <h1>followUp</h1>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AppBar from '@components/AppBar'
import InfoCard from '@components/template/dataArchiving/InfoCard'
import Picker from "dm-vue-picker-h5";
// import LoanCard from '@components/template/repayment/LoanCard'

export default {
  components: {
    AppBar, InfoCard, Picker
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
  created(){
    
  },
  methods: {
    // 显示 picker
    pickerShow(pickerTitle,index){
      this.$refs.picker.show();
      this.pickerTitle= pickerTitle;
      this.detailedPickerIndex= index;
      
      if(pickerTitle == '是否有公正证书'){
        this.pickerList = this.pickerList_0;
        this.pickerList.forEach((item,index)=>{
          this.pickerAnchor = [item.text === this.form.pickerVal ? index : 0];
        })
      }else if(pickerTitle == '档案类型'){
        this.pickerList = this.pickerList_1;
        this.detailed.forEach((item,i)=>{
          this.pickerAnchor = item.pickerVal ? [item.pickerVal === this.detailed[i].pickerVal ? index : 0] : [0];
        })
      }
    },
    // picker 确定
    pickerConfirm(value, column, text){
      if(this.pickerTitle == '是否有公正证书'){
        this.form.pickerVal = text[0];
        this.pickerAnchor = [column];
      }else if(pickerTitle == '档案类型'){
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
    add(){
      this.detailed.push({
        pickerVal:"",
        originalNumber:1,
        copyNumber:1,
      })
    },
    reduce(index){
      this.detailed = this.detailed.filter((item,i)=>{
        return i !== index;
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .Archiving{
    .contentBox{
      height: 100vh;
      overflow: hidden;
    }
    .content{
      height: 100vh;
      overflow-y: scroll;
      padding-bottom: 12px;

      .clueList{
        margin-top: 12px;
      }
      .mu-tabs{
        position: fixed;
        top: 44px;
        z-index: 9;
        border-top: 1px solid @primary-border;
        box-shadow: 0px 2px 6px 0px #ededed;
      }

      .body{
        margin-top: 96px;
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
                // margin-left: 20px;
                span{
                  margin: 10px 0 6px;
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
    }
  }
</style>

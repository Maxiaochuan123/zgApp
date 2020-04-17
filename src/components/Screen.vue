<template>

  <div class="drawerContent">
    <div class="drawerTitle">筛选</div>

      <div class="content">
        <div class="screen" v-for="(item,index) in drawerList" :key="index">
          <div class="title" v-if="!(item.mode === 'single' || item.mode === 'multiple')">{{item.fileTitle}}</div>
          
          <div class="screenInput" v-if="item.type === 'input'">
            <i class="iconfont icon-sousuo1"></i>
            <mu-text-field class="input" v-model="item.val" :placeholder="item.placeholder"></mu-text-field>
          </div>

          <div class="dateInput" v-else-if="item.type === 'date'">
            <div class="screenInput">
              <span v-show="!item.val[0]">{{item.placeholder}}</span>
              <mu-date-input class="timeInput" icon="today" v-model="item.val[0]" type="date" label-float full-width container="bottomSheet" value-format="YYYY-MM-DD"></mu-date-input>
            </div>
            <span>至</span>
            <div class="screenInput">
              <span v-show="!item.val[1]">{{item.placeholder}}</span>
              <mu-date-input class="timeInput" icon="today" v-model="item.val[1]" type="date" label-float full-width container="bottomSheet" value-format="YYYY-MM-DD"></mu-date-input>
            </div>
          </div>

          <div class="screenInput selectOption" v-if="item.type === 'select'">
            <mu-select v-model="item.val" :placeholder="item.placeholder" full-width>
              <mu-option v-for="(option,index) in item.options" :key="index" :label="option" :value="option"></mu-option>
            </mu-select>
          </div>
          
          
           <ArrSingleOrMultiple :ref="`arrSingleOrMultiple${index}`" v-else-if="item.mode === 'single' || item.mode === 'multiple'" @arrSingleOrMultipleChange="arrSingleOrMultipleChange" :type="index" :title="item.fileTitle" :list="item.list" :mode="item.mode" :labelField="item.labelField" :valueField="item.valueField" :defaultValue="item.defaultValue"></ArrSingleOrMultiple>
        
        </div>
      </div>

      <div class="operation">
        <mu-button class="reset" @click="resetDrawerList">重置</mu-button>
        <mu-button class="confirm" @click="drawerSubmit">确定</mu-button>
      </div>
  </div>
</template>

<script>
import ArrSingleOrMultiple from './ArrSingleOrMultiple';
export default {
  props:{
    drawerList:{
      type: Object,
      default: () => {}
    }
  },
  components:{
    ArrSingleOrMultiple
  },
  data(){
    return{
      submitDrawerList:{}
    }
  },
  methods:{
    arrSingleOrMultipleChange({type,value}) {
      this.drawerList[type] = {...this.drawerList[type],val:value,};
    },
    // 筛选 - 重置
    resetDrawerList(){
      for(let item in this.drawerList){
        const onedata = this.drawerList[item];
        if(onedata.list){
          this.$refs[`arrSingleOrMultiple${item}`][0].handlerList(onedata.list);
        }else{
          onedata.val = '';
          onedata.val2 = '';
          onedata.selectVal = '';
        }
      
      }
    },
    //筛选 - 确认
    drawerSubmit(){
      this.getParams();
      this.$emit('getScreenParams', this.submitDrawerList);
      // this.resetDrawerList();
      this.closeDrawerState();
    },
    getParams(){
      for(let item in this.drawerList){
        // console.log(this.drawerList[item])
        this.submitDrawerList[item] = this.drawerList[item].val
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .drawerContent{
    height: 100%;
    // pointer-events: none;
    .drawerTitle{
      font-size: 20px;
      font-weight: @primary-weight;
      color: @primary-text;
      // background-color: aquamarine;
      // height: 20%;
    }
    .content{
      height: 200px;
      margin-top: 20px;
      background-color: #fff;
      overflow: auto;
      overflow-x: hidden;
      height: 86%;
    }
    .content, .drawerTitle , .operation{
      padding: 0 20px;
    }
    .screen{
      &:not(:first-child){
        margin-top: 20px;
      }
      .title{
        font-size: @primary-size;
        color: @primary-text;
        margin-bottom: 10px;
      }
      .screenInput{
        height: 36px;
        border-radius:6px;
        border:1px solid #9f9f9f;
        position: relative;
        >span{
          position: absolute;
          left: 10px;
          height: 36px;
          line-height: 36px;
          font-size: @regular-size;
          color: @regular-text;
        }
        >i{
          position: absolute;
          right: 10px;
          font-size: 24px;
          color: @regular-text;
          z-index: 99;
        }
        .icon-sousuo1{
          font-size: 18px;
          top: 2px;
          display: inline-block;
        }
        .shanchu{
          position: absolute;
          top: 2px;
          right: 34px;
          z-index: 10;
          .icon-shanchu{
            color: @regular-text;
            font-size: 18px;
          }
        }
        .timeInput{
          margin: 0;
          padding: 0;
          min-height: 0;
          /deep/ .mu-input-icon{
            display: none;
          }
          /deep/ .mu-text-field-input{
            padding-left: 10px;
          }
          /deep/ .mu-text-field{
            width: 96%;
            margin: 2px 0 0 4px;
          }
        }
        .input{
          margin: 0;
          padding: 0;
          min-height: 0;
          /deep/ .mu-text-field-input{
            padding-left: 10px;
          }
          /deep/ .mu-text-field{
            width: 76%;
            margin: 2px 0 0 4px;
          }
        }
        .mu-select-input{
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
        /deep/ .mu-input{
          font-size: 14px;
        }
      }
      .dateInput{
        display: flex;
        justify-content: space-between;
        .screenInput{
          width: 118px;
        }
        span{
          line-height: 36px;
          padding: 0 6px;
        }
      }
      .selectOption{
        padding-left: 14px;
      }
    }
    .operation{
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      .reset{
        color: @primary-text;
        background-color: #EDEDED;
      }
      .confirm{
        background-color: @primary;
        color: #fff;
      }
    }
  }
</style>
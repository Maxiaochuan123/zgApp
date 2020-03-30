<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 14:41:48
 * @LastEditTime: 2019-08-21 11:02:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="image-edit-box" v-if="editView">
    <span class="switch-close" @click="closeEditPreview"><i class="el-icon-close"></i></span>
    <div class="img-Box animation-in">
      <vue-cropper ref="cropper" :img="currentEditItem.src" :info="true" :full="option.full" :auto-crop="option.autoCrop" :center-box="option.centerBox" mode="cover"></vue-cropper>
      <div class="toolBar">
        <div class="editName">
          <input type="text" :value="currentImgNameVal" @input="editNameHandle">
          <span class="suffix">.jpeg</span>
          <span :class="['underline', editName === 1 ? 'success-boder' : editName === 2 ? 'error-boder' : '' ]"></span>
          <span class="errorText error-text" v-show="editName === 2">汉字 字母 数字 下划线，1-20位</span>
          <i class="el-icon-edit"></i>
        </div>
        <div class="tool"><i :class="['el-icon-scissors', isTailoring ? 'active' : 'onActive']" @click="tailoring"></i></div>
        <div class="btnBox">
          <button class="cancel" @click="closeEditPreview">取 消</button>
          <button :class="[isDisabled ? 'is-disabled' : 'determine']" :disabled="isDisabled" @click="submitEdit">确 定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
import tool from './js/tool'
export default {
  components:{ VueCropper },
  props:{
    editView:{ //是否显示编辑视窗
      type:Boolean,
      default:false
    },
    editItem:{ //当前需要编辑的图片
      type:Object,
      default:{}
    },
    imgNameVal:{ //当前需要编辑的图片名字
      type:String,
      default:''
    }
  },
  data(){
    return{
      currentEditItem: this.currentEditItem,
      currentImgNameVal: this.currentImgNameVal,
      isDisabled:false, //禁用确定
      // imgNameVal:'', //input 图片名
      editName:0, //编辑姓名
      isTailoring:false, //是否开启裁剪
      option: {
        full: true, //是否输出原图比例的截图
        autoCrop: false, //是否默认生成截图框
        centerBox: true, //截图框是否被限制在图片里面
      },
      
    }
  },
  watch:{
    editItem(newVal,oldVal){
      this.currentEditItem = newVal;
    },
    imgNameVal(newVal,oldVal){
      this.currentImgNameVal = newVal;
    },
    isTailoring(newVal,oldVal){
      const cropperDragBox = document.querySelector('.cropper-drag-box');
      const cropperCropBox = document.querySelector('.cropper-crop-box');
      
      if(newVal){
        cropperDragBox.style.display = 'block';
        cropperCropBox.style.display = 'block';
      }else{
        cropperDragBox.style.display = 'none';
        cropperCropBox.style.display = 'none';
      }
    }
  },
  methods:{
    //裁剪 or 改名 提交
    submitEdit(){
      if(this.editName === 1){
        this.currentEditItem.file = tool.dataUrltoFile(this.currentEditItem.base64, this.currentImgNameVal + ".jpeg");
      }
      
      if(this.isTailoring){
        this.$refs.cropper.getCropData((data) => {
          this.currentEditItem.base64 = data;
        })
        this.$refs.cropper.getCropBlob((data) => {
          this.currentEditItem.blob = data;
          this.currentEditItem.src = URL.createObjectURL(this.currentEditItem.blob);
        })
      }
      this.closeEditPreview();
      
    },
    // 裁剪状态
    tailoring(){
      this.isTailoring = !this.isTailoring;
      this.option.autoCrop = !this.option.autoCrop;
    },
    // 修改图片名
    editNameHandle(e){
      if(!e.target.value.match( /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,20}$/)){
        this.isDisabled = true;
        this.editName = 2;
      }else{
        this.isDisabled = false;
        this.editName = 1;
      }
      this.currentImgNameVal = e.target.value;
    },
    // 关闭 图片编辑 view
    closeEditPreview(){
      this.$emit('closeEditPreview',false);
      this.isDisabled = false;
      this.editName = 0;
    },
  }
}
</script>

<style lang="less" scope>
  .image-edit-box{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    span{
      z-index: 999;
    }

    .switch-close{
      position: absolute;
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      font-size: 24px;
      color: #fff;
      border-radius: 50%;
      background: #606266;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:active{
        transform: scale(.9)
      }
      
    }

    
    .img-Box{
      width: 1000px;
      height: 800px;
      // width: 80%;
      // height: 80%;
      padding: 10px;
      background-color: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
      // align-items: flex-end;  
      
      .toolBar{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        i{
          cursor: pointer;
          &:active{
            transform: scale(.9);
          }
        }
        .errorText{
          font-size: 14px;
          position: absolute;
          bottom: -10px;
          left: 0;
        }

        .active{
          color: #409eff;
        }
        .noActive{
          color: #333;
        }

        >div{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 44px;
        }
          
        .editName{
          position: relative;
          input{
            height: 34px;
            line-height: 34px;
            padding-left: 8px;
            background:none;  
            outline:none;  
            border: none;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 16px;
            color: #606266;
            &:focus ~ .underline{
              border-top:1px solid #409eff;
            }
            &:focus ~ i{
              color: #409eff;
            }
          }
          .underline{
            position: absolute;
            left: 0;
            bottom: 8px;
            width: 204px;
            border-top: 1px solid #dcdfe6;
          }
          .success-boder{
            border-color: #67C23A;
          }
          .error-boder{
            border-color: #F56C6C;
          }
          .error-text{
            color: #F56C6C;
          }
          .suffix{
            color: #909399;
            position: absolute;
            right: 24px;
          }

          i{
            font-size: 20px;
            margin-left: 4px;
          }
        }

        .tool{
          i{
            font-size: 24px;
          }
        }

        .btnBox{
          width: 180px;
          display: flex;
          justify-content: space-between;
          button{
            height: 32px;
            line-height: .5;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #dcdfe6;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
          }
          .determine , .is-disabled{
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
          }
          .determine{
            &:hover{
              background: #66b1ff;
              border-color: #66b1ff;
            }
          }
          .is-disabled{
            color: #fff;
            background-color: #a0cfff;
            border-color: #a0cfff;
            &:hover{
              cursor: not-allowed;
            }
          }
          .cancel{
            &:hover{
              color: #409eff;
              border-color: #c6e2ff;
              background-color: #ecf5ff;
            }
          }
        }
      }
    }
  }
</style>
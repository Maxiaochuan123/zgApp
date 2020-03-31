<template>
  <div class="retrievePassword">
    <AppBar pageTitle="找回密码" custom customTitle="保存" :customFnc="save"></AppBar>

    <div class="inputBox">
      <mu-form :model="form" class="mu-demo-form" ref="form">
        <mu-form-item :rules="rules.phone" class="phoneNumber" prop="phoneNumber" >
          <span>手机号</span>
          <mu-text-field
            placeholder="请输入手机号"
            prop="phoneNumber"
            v-model.trim="form.phoneNumber"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="rules.verificationCode" class="verificationCode" prop="verificationCode" >
          <span>验证码</span>
          <mu-button flat :class="countDown !== 60 ? 'disabled' : ''" :disabled="countDown !== 60" @click="getCode">{{ countDown === 60 ? "获取" : countDown }}</mu-button>
          <mu-text-field
            placeholder="请输入验证码"
            prop="verificationCode"
            v-model.trim="form.verificationCode"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="rules.password" class="password" prop="password" >
          <span>新密码</span>
          <mu-text-field
            placeholder="请输入新密码"
            prop="password"
            type="password"
            v-model.trim="form.password"
          ></mu-text-field>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar";
export default {
  components: { AppBar },
  data() {
    return {
      countDown: this.storage.localGet("countDown") || 60,
      form:{
        phoneNumber: "",
        verificationCode: "",
        password: ""
      },
      rules:{
        phone: [
          { validate: val => !!val, message: "必须填写手机号" },
          {
            validate: val => /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val),
            message: "手机号格式不正确"
          }
        ],
        verificationCode: [
          { validate: val => !!val, message: "必须填写验证码" },
          {
            validate: val => /^\d{4}$/.test(val),
            message: "验证码错误"
          }
        ],
        password: [
          { validate: val => !!val, message: "必须填写新密码" },
          {
            validate: val => /^[\w_-]{6,10}$/.test(val),
            message: "密码只能由 6~10 位大小写字母,数字,下划线 组成"
          }
        ],
      }
    };
  },
  created(){
    this.countDown && this.countDown !== 60 ? this.codeInterval() : '';
  },
  methods: {
    // 保存
    save(){
      this.$refs.form.validate().then(result => {
        if (result) {
          
        }
      });
    },
    // 倒计时
    getCode(){
      this.countDown = 59;
      this.codeInterval();
    },
    codeInterval(){
      let time = setInterval(()=>{
        this.countDown -= 1;
        this.storage.localSet("countDown",this.countDown);
        if(this.countDown < 0){
          this.countDown = 60;
          this.storage.localSet("countDown",60);
          clearInterval(time);
        }
      },1000);
    }
  }
};
</script>

<style lang="less" scope>
  .retrievePassword{
    padding-top: 56px;

    .inputBox{
      background-color: #fff;
      .verificationCode{
        position: relative;
        .mu-button{
          position: absolute;
          right: 15px;
          z-index: 99;
          border-radius: 6px;
          color: @primary;
          border: 1px solid @primary;
          margin: 0;
          min-width: 52px;
          height: 30px;
          .mu-button-wrapper{
            padding: 0;
          }
        }
        .disabled{
          color: rgba(0,0,0,.3);
          cursor: not-allowed;
          border-color: #d0d0d0;
        }
      }
      .mu-form-item {
        min-height: 46px;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      .mu-input-line, .mu-input-focus-line {
        left: 36vw;
        bottom: -4px;
      }
      .mu-form-item-help{
        padding-left: 36vw;
        bottom: -12px;
      }
      .mu-form-item-content{
        position: relative;
        min-height: 46px;
        border-bottom: 1px solid @primary-border;
        // background-color: #ff6600;
        span{
          position: absolute;
          padding-left: 4vw;
          color: @primary-text;
          font-size: @primary-size;
        }
        .mu-text-field{
          padding-left: 36vw;
        }
      }

      .mu-input-line, .mu-input-focus-line {
        display: none;
      }
      .password{
        .mu-form-item-content{
          border-bottom: none;
        }
      }
    }
  }
</style>

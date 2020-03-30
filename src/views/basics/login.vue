<!--
 * @Description: 用户登录界面
 * @Author: shenah
 -->
<template>
  <div class="login">
    <div class="headPortrait">
      <div class="photo">
        <img src="../../../static/images/defaultHeadPortrait.png">
      </div>
      <span>欢迎回来!</span>
    </div>

    <div class="inputBox">
      <mu-form :model="form" class="mu-demo-form" label-position="left" ref="form">
        <mu-form-item :rules="myRules.must('用户名')" class="username" prop="username" >
          <img src="../../../static/images/phone.png">
          <mu-text-field
              placeholder="请输入用户名"
              prop="username"
              v-model.trim="form.username"
            ></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="myRules.must('密码')" class="password" prop="password" >
          <img src="../../../static/images/pwd.png">
          <mu-text-field
              :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
              placeholder="请输入密码"
              prop="password"
              v-model.trim="form.password"
            ></mu-text-field>
        </mu-form-item>
      </mu-form>
    </div>
    <div class="otherOperations">
      <div class="rememberPassword" @click="setRemPwd">
        <img :src="remPwd ? '../../../static/images/remember.png' : '../../../static/images/forget.png'">
        <span>记住密码</span>
      </div>
      <div class="forgetPassword" @click="retrievePassword">
        <span>忘记密码</span>
      </div>
    </div>
    <div class="loginBtnBox">
      <mu-button color="primary" @click="login">登 录</mu-button>
    </div>
  </div>
</template>

<script>
import tool from "@static/js/tool.js";
import Rules from "@static/js/rules";
import axios from "axios";
import storage from '../../../../crm/my-app/dist/static/js/storage';
export default {
  components: {},
  data() {
    return {
      loc_loginInfo: JSON.parse(tool.decAse192(localStorage.getItem("loc_loginInfo"),"loc_loginInfo")) || {}, // 本地登陆信息
      remPwd: this.storage.localGet("remPwd") || false, // 是否记住密码
      visibility: false, // 密码可见度
      form: {
        username: "", // 用户名
        password: "", // 密码
      }
    };
  },
  created(){
    // 获取已记住的账号密码
    if(this.loc_loginInfo.username) this.form.username = this.loc_loginInfo.username;
    if(this.remPwd && this.loc_loginInfo.password){
      this.form.password = this.loc_loginInfo.password;
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate().then(result => {
        if (result) {
          // this.api.login(this.form).then(res => {
            // 记住账号密码
            this.loc_loginInfo.username = this.form.username;
            this.loc_loginInfo.password = this.form.password;
            this.storage.localSet("loc_loginInfo",tool.encAse192(JSON.stringify(this.loc_loginInfo),"loc_loginInfo"));
            // 存入登陆信息
            this.storage.localSet("login",{});
            this.goPage("home");
          // });
        }
      });
    },

    // 设置记住密码
    setRemPwd(){
      if(this.form.password){
        this.remPwd = !this.remPwd;
        this.storage.localSet("remPwd", this.remPwd);
      }else{
        this.$toast.warning("请先输入密码, 再勾选!")
      }
    },

    // 找回密码
    retrievePassword(){
      this.goPage("retrievePassword");
    }
  }
};
</script>

<style lang='less' scope>
.login {
  width: 100vw;
  height: 100vh;
  padding: 0 30px;
  background-color: #fff;
  overflow:hidden;

  .headPortrait{
    width: 100px;
    margin: 0 auto;
    .photo{
      margin-top: 80px;
      width: 100px;
      height: 100px;
      img{
        width: 100px;
        height: 100px;
        border: 0;
      }
    }
    span{
      margin-top: 16px;
      width: 100%;
      display: inline-block;
      text-align: center;
    }
  }
  
  .inputBox{
    margin-top: 56px;

    .mu-form-item-label{
      padding-right: 0px;
    }

    img{
      width: 20px;
      height: 20px;
    }
    
    input{
      padding-left: 30px;
    }
    .username, .password{
      position: relative;
      img{
        position: absolute;
      }
    }
  }
  .otherOperations{
    display: flex;
    justify-content: space-between;
    color: @primary-text;
    .rememberPassword{
      display: flex;
      align-items: center;
      img{
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
    }
  }
  .loginBtnBox{
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    button{
      width: 272px;
      height: 44px;
      border-radius: 6px;
    }
  }
}
</style>
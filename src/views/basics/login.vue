<!--
 * @Description: 用户登录界面
 * @Author: shenah
 -->
<template>
  <div class="login">
    <!-- <mu-form-item
      :rules="myRules.must('密码')"
      class="password"
      prop="password"
    >
      <div class="login-input">
        <img
          :src="loadingImg('login-password.png')"
          class="input-img"
        />
        <mu-text-field
          :action-click="clearPad"
          action-icon=":iconfont icon-cuo"
          placeholder="请输入密码"
          prop="password"
          type="password"
          v-model.trim="form.password"
        ></mu-text-field>
      </div>
    </mu-form-item> -->
  </div>
</template>

<script>
import tool from "@static/js/tool.js";
import Rules from "@static/js/rules";
import axios from "axios";
export default {
  name: "login",
  components: {},
  data() {
    return {
      remPwd: false, // 是否记住密码
      form: {
        username: this.storage.localGet("username") || "", // 用户名
        password: "", // 密码
      }
    };
  },
  created(){
    // 获取已记住的密码
    let loc_remPwd = this.storage.localGet("remPwd");
    if(loc_remPwd){
      let loc_pwd = this.storage.localGet("password");
      this.form.password = loc_pwd;
    }
  },
  // computed:{
  //   password:{
  //     get(){

  //     },
  //     set(val){

  //     }
  //   }
  // },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.api.login(this.form).then(res => {
            // 记住账号密码
            this.storage.localSet("username", this.form.username);
            this.storage.localSet("password", this.form.password);
            // 存入登陆信息
          });
        }
      });
    },

    // 设置记住密码
    setRemPwd(){
      if(this.remPwd){
        this.storage.localSet("remPwd",this.form.password)
      }
      
    }
    // queryLoginRight() {
    //   return Api.getAuthorByToken().then(res => {
    //     this.$store.commit("setAuthor", res.data);
    //   });
    // },
    // queryUser() {
    //   return Api.getCurrentUserByToken().then(res => {
    //     this.$store.commit("setUser", res.data);
    //   });
    // },
  }
};
</script>

<style lang='less' scope>
.login {

}
</style>
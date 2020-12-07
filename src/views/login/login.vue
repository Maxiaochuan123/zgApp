<template>
  <div class="login">
    <div class="headPortrait">
      <div class="photo">
        <img :src=" headerImg ? headerImg : loadImage('defaultHeadPortrait.png') " />
      </div>
      <span>欢迎回来!</span>
    </div>

    <div class="inputBox">
      <mu-form :model="form" class="mu-demo-form" label-position="left" ref="form">
        <mu-form-item :rules="rules.username" class="username" prop="username" >
          <img src="@static/images/phone.png">
          <mu-text-field
              placeholder="请输入用户名"
              prop="username"
              v-model.trim="form.username"
            ></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="rules.password" class="password" prop="password" >
          <img src="@static/images/pwd.png">
          <mu-text-field
              :action-icon="visibility ? 'visibility' : 'visibility_off'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
              placeholder="请输入密码"
              prop="password"
              v-model.trim="form.password"
            ></mu-text-field>
        </mu-form-item>
      </mu-form>
    </div>
    <div class="otherOperations">
      <div class="rememberPassword" @click="setRemPwd">
        <img :src="remPwd ? loadImage('selected.png') : loadImage('forget.png')">
        <span>记住密码</span>
      </div>
      <!-- <div class="forgetPassword" @click="retrievePassword">
        <span>忘记密码</span>
      </div> -->
    </div>
    <div class="loginBtnBox">
      <mu-button color="primary" @click="login">登 录</mu-button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import storage from '@static/js/storage';
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      headerImg: this.storage.localGet("userInfo") ? this.storage.localGet("userInfo").headIcon : "", //上次登陆的头像
      loc_loginInfo:{}, // 记住密码所需本地存储信息
      remPwd: this.storage.localGet("remPwd") || false, // 是否记住密码
      visibility: false, // 密码可见度
      form: {
        username: "", // 用户名
        password: "", // 密码
      },
      rules:{
        username:[{ validate: val => !!val, message: "请填写账号" }],
        password:[{ validate: val => !!val, message: "请填写密码" }]
      }
    };
  },
  created(){
    if(localStorage.getItem("loc_loginInfo")){
      this.loc_loginInfo = JSON.parse(this.tool.decAse192(localStorage.getItem("loc_loginInfo"),"loc_loginInfo"));
    
      // 获取已记住的账号密码
      if(this.loc_loginInfo.username) this.form.username = this.loc_loginInfo.username;
      if(this.remPwd && this.loc_loginInfo.password){
        this.form.password = this.loc_loginInfo.password;
      }
    }
  },
  watch: {
    "form.username":{
      handler(newVal,oldVal){
        if(!newVal) this.form.password = "";
      },
      deep: true
    },
    "form.password":{
      handler(newVal,oldVal){
        if(!newVal) this.remPwd = false, this.storage.localSet("remPwd", false);
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(["setScreenList"]),

    // 登录
    login() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.api.login(this.form).then(res => {
            if(res.message === "success"){
              // 记住账号密码
              this.loc_loginInfo.username = this.form.username;
              this.loc_loginInfo.password = this.form.password;
              this.storage.localSet("loc_loginInfo",this.tool.encAse192(JSON.stringify(this.loc_loginInfo),"loc_loginInfo"));

              // 存入登陆信息
              this.storage.localSet("token",this.tool.encAse192(res.data.token,"token"));
              this.storage.localSet("userInfo",res.data.user);

              let _this = this;

              axios.all ([this.api.company(), this.api.lendingPlatform(), this.api.repaymentState(), this.api.projectState(), this.api.collectionStatus(), this.api.personLiable(), 
              this.api.strategy(), this.api.followUp(), this.api.accessControl()])
              .then(axios.spread(function (data1, data2, data3, data4, data5, data6, data7, data8, data9) {

                // 设置  storage 数据
                storage.localSet("company", data1.data); //公司
                storage.localSet("lendingPlatform", data2.data); //放款平台
                storage.localSet("personLiable", data6.data); //责任人
                
                storage.localSet("strategy", data7.data); //策略类型
                storage.localSet("followUp", data8.data); //跟进类型
                storage.localSet("control", data9.data); //权限
                
                // 设置 vuex 侧边筛选栏数据
                _this.setScreenList({
                  company:data1.data, 
                  lendingPlatform:data2.data, 
                  personLiable:data6.data,
                  repaymentState:data3.data,
                  projectState:data4.data,
                  collectionStatus:data5.data,
                })

                _this.goPage("home");

              }))

            }else{
              this.form.password = "";
            }
          });
        }
      });
    },

    // 设置记住密码
    setRemPwd(){
      if(this.form.password){
        this.remPwd = !this.remPwd;
        this.storage.localSet("remPwd", this.remPwd);
      }else{
        this.$toast.info("请先输入密码, 再勾选!")
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
        border-radius: 50%;
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
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="loginRules" class="login-form" status-icon>

      <h4 class="title">{{title}}</h4>

      <el-form-item prop="username">
        <el-input v-model="loginForm.username"  prefix-icon="el-icon-user" placeholder="账号:pipihua666" autofocus></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="el-icon-key" placeholder="密码:123456" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isRemenber">记住密码</el-checkbox>
      </el-form-item>

      <div class="login">
        <el-button type='danger' @click="reset('loginForm')">重置</el-button>
        <el-button type="primary" @click="login" :loading="isloading">登录</el-button>
      </div>
      
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
     //判断账号是否合法
      const validateUsername = (rule, value, callback) => {
        let reg=/^[a-z0-9]+$/i;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的账号'))
        } else {
          callback()
        }
      }
      //判断密码是否合法
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
    return {
      title:'超市管理系统',
      loginForm: {
        username: "",
        password: "",
        remenber:false
      },
      loginRules:{
        username: [{ required: true, trigger: 'blur', validator: validateUsername ,}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      isloading:false,
      isRemenber:false,
    };
  },
  methods: {
    // 登录
    login() {
      //表单验证通过再提交登陆
      this.$refs['loginForm'].validate((isOK)=>{ 
        if(isOK){
          let that = this;
          if(this.isRemenber){
            this.loginForm.remenber=true;
          }
            this.isloading = true;
            this.$ajax({
              url:'/api/login',
              method:"post",
              data:this.loginForm,
            })
            .then(response => {
                //模拟异步请求时间
                console.log(response.data);
                setTimeout(function(){
                  that.isloading = false;
                  that.$router.push({path:"/goods"})
                },2000)
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
          this.$message.error('登陆出错，请检查你的登陆名或者密码是否正确');
        }
      });
    } ,
    //重置表单
    reset(ref){
      this.$refs[ref].resetFields();
    },
    getToken(){
      if(document.cookie.includes('password')){
        let cookie=document.cookie.split(';');
        let username = cookie[0].split('=')[1];
        let password = cookie[1].split('=')[1];
        this.loginForm.username = username;
        this.loginForm.password = password;
      }
    }
  },
  mounted:function(){
    this.getToken();
  }
};
</script>



<style lang="scss" rel="stylesheet/scss">
.login-container{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/bg.jpg');
  background-attachment: no-repeat;
  background-size: 100% 100%;
  color: black;
    .title{
      font-size: 3rem;
      margin-bottom: 2rem;
      padding: 40px 0;
      background: transparent;
      text-align: center;
      border-bottom: none;
    }
    .el-input__inner{
      padding-left: 3rem;
    }
    .el-input{
      width: 85%;
      input{
        height: 3rem;
      }
    }
    .login-form{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40%;
      transform: translate(-50%,-30%);
      .login{
        text-align: center;
        .el-button{
          width: 18%;
          margin-left: 2rem;
        }
      }
  }
} 

</style>
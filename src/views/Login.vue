<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">login</h3>
      <el-form-item prop="userName">
        <el-input type="text" auto-complete="false" v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
       </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input style="width: 280px; margin-right: 5px" type="text" auto-complete="false" v-model="loginForm.code" placeholder="输入验证码"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberMe">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        userName: 'name1',
        password: 'password1',
        code: 'code'
      },
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message:'请输入验证码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = '/captcha?time' + new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post("/user/login", this.loginForm).then(
              response => {
                _this.$store.commit("SET_TOKEN", response.data.data.token);
                _this.$store.commit("SET_USERINFO", response.data.data.user);
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                _this.$router.push("/admin");
              }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px;
  background: beige;
  border: 1px solid gray;
  box-shadow: 0 0 25px gray;
}

.loginTitle {
  margin: 0px auto 40px auto;
  text-align: center;
}

.rememberMe {
  margin: 0 0 15px 0;
}

</style>

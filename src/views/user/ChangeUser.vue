<template>
<div>
  <el-tabs type="border-card">
    <el-tab-pane label="修改用户信息">
      <el-form :label-position="labelPosition" label-width="80px" :model="userInfoForm" :rules="userInfoRules" ref="userInfoForm" size=medium >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userInfoForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="userAvatar">
          <el-input v-model="userInfoForm.userAvatar"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="userInfoForm.userEmail"></el-input>
        </el-form-item >
        <el-form-item label="个性签名" prop="userDescription">
          <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              :autosize="{ minRows: 6, maxRows: 6}"
              v-model="userInfoForm.userDescription"
              maxlength="255"
              show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUserInfoForm('userInfoForm')">提交</el-button>
          <el-button @click="resetUserInfoForm('userInfoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改密码" >
      <el-form :label-position="labelPosition" label-width="80px" :model="passwordForm" :rules="passwordRules" status-icon ref="passwordForm" size=medium>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passwordForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="checkPassword">
          <el-input v-model="passwordForm.checkPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
          <el-button @click="resetForm('passwordForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import simpleUtils from "@/utils/simpleUtils";

export default {
  name: "ChangeUser",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      }
      callback();
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.checkPassword !== '') {
          this.$refs.passwordForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isChange: false,
      activeName: 'first',
      labelPosition: 'left',
      userInfoForm: {
        userId: '',
        userName: '',
        userAvatar: '',
        userEmail: '',
        userDescription: '',
        userLoginLast: ''
      },
      passwordForm: {
        password: '',
        oldPassword: '',
        checkPassword: '',
        userName: ''
      },
      passwordRules: {
        oldPassword: [
          {validator: validatePass, trigger: 'blur'},
          {min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur'}
        ],
        password: [
          {validator: validatePass1, trigger: 'blur'},
          {min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'},
          {min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur'}
        ],
      },
      userInfoRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur' }
        ],
        userAvatar: [
          { required: true, message: '请输入图片路径', trigger: 'blur' },
          { min: 5, max: 255, message: '长度在 5 到 255 个字符', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  methods: {
    resetUserInfoForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitUserInfoForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alterUser();
        } else {
          this.$message({
            message: '提交失败',
            type: 'error'
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alterPassword();
        } else {
          this.$message({
            message: '提交失败',
            type: 'error'
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    alterPassword() {
      if (this.$store.getters.getUser == '') {
        this.passwordForm.userName = '';
      } else {
        this.passwordForm.userName = this.$store.getters.getUser.userName;
      }
      this.$axios.put("/user/alterPassword", this.passwordForm, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            } else {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
          }
      ).catch(err => {
      });
    },
    alterUser() {
      this.userInfoForm.userId = this.$store.getters.getUser.userId;
      this.userInfoForm.userLoginLast = simpleUtils.setDateStringToDate(this.userInfoForm.userLoginLast);
      this.$axios.put("/user/alter", this.userInfoForm, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
              this.$router.push('/login');
            } else {
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
          }
      ).catch(err => {
      });
    },
    initPage() {
      this.isChange = this.$route.query.isChange;
      if (this.isChange) {
        this.getUserInfo();
      }
    },
    getUserInfo() {
      this.$axios.get('/user/info?userName=' + this.$store.getters.getUser.userName,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.userInfoForm = response.data.data;
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          }
      ).catch(
          err => {

          }
      );
    }
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>
.el-form {
  width: 40%;
}
</style>

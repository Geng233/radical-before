<template>
<div>
  <template>
    <el-tabs type="border-card">
      <el-tab-pane label="用户信息">
        <el-descriptions class="margin-top" title="当前用户和权限信息" :column="3"border>
          <template slot="extra">
            <el-button type="primary" @click="alterUserInfo">修改</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{this.loginUser.userName}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              邮箱
            </template>
            {{this.loginUser.userEmail}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              用户头像
            </template>
            {{this.loginUser.userAvatar}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              最后登录时间
            </template>
            {{this.loginUser.userLoginLast}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              个性签名
            </template>
            {{this.loginUser.userDescription}}
          </el-descriptions-item>
        </el-descriptions>
        <el-table
            :data="permissionData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="permissionId"
              label="权限id"
              v-if=false>
          </el-table-column>
          <el-table-column
              prop="permissionName"
              label="权限名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="permissionCode"
              label="权限code">
          </el-table-column>
          <el-table-column
              prop="permissionPath"
              label="权限前端路由">
          </el-table-column>
          <el-table-column
              prop="permissionFatherId"
              label="权限父id">
          </el-table-column>
          <el-table-column
              label="权限是否为菜单"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.permissionIsMenu == 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </template>
</div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      loginUser: {
        userId: 'userId',
        userName: 'userName',
        userAvatar: '',
        userEmail: 'userEmail@outlook.com',
        userDescription: 'userDescription',
        userLoginLast: ''
      },
      permissionData: [],
    };
  },
  methods: {
    initPage() {
      this.$axios.get('/user/info?userName=' + this.$store.getters.getUser.userName,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.loginUser = response.data.data;
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
      this.$axios.get('/permission/getOne?userName=' + this.$store.getters.getUser.userName,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.permissionData = response.data.data;
              console.log(this.loginUser);
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
    },
    alterUserInfo() {
      this.$router.push({path: '/user/change', query: {isChange: true}});
      this.$emit("saveMenuActive",'/user/change');
    }
  },
  created() {
    this.initPage();
    // this.menuItems = this.$emit("subGetMenuItem")
  }
}
</script>

<style scoped>
.el-descriptions {
  margin-bottom: 30px;
}
</style>

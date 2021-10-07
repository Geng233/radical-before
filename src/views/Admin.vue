<template>
  <div class="admin">
    <el-container>
      <el-header>
        <span class="blogTitle">博客后台管理</span>
        <span class="loginName">{{loginName}}</span>
        <el-button @click="logout()" class="logoutButton" type="primary" plain>退出登陆</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col>
            <el-menu
                :default-active="menuActive"
                router
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
              <el-menu-item  @click="saveMenuActive(item.fatherMenu.permissionPath)" :key="item.fatherMenu.permissionId" :index="item.fatherMenu.permissionPath" v-for="item in menuItem" v-if="!item.subMenu">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.fatherMenu.permissionName}}</span>
              </el-menu-item>
              <el-submenu :key="item.fatherMenu.permissionId" :index="item.fatherMenu.permissionPath" v-for="item in menuItem" v-if="item.subMenu">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.fatherMenu.permissionName}}</span>
                </template>
                <el-menu-item  @click="saveMenuActive(subItem.permissionPath)" :key="subItem.permissionId" :index="subItem.permissionPath" v-for="subItem in item.subMenu">{{subItem.permissionName}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main style="overflow:visible">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/panel'" class="breadcrumb">
              <el-breadcrumb-item :to="{ path: '/panel' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view @saveMenuActive="saveMenuActive" @subGetMenuItem="subGetMenuItem"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      loginName: '登陆名称',
      menuItem: [],
      menuActive: ''
    };
  },
  methods: {
    logout() {
      this.$confirm('退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$store.commit("REMOVE_INFO");
        localStorage.setItem("menuActive", "");
        this.$router.push("/login");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    subGetMenuItem() {
      return this.menuItem;
    },
    getMenuItem() {
      var userName;
      if (this.$store.getters.getUser == '') {
        userName = '';
      } else {
        userName = this.$store.getters.getUser.userName;
      }
      this.$axios.get("user/menu?userName=" + userName, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.menuItem = response.data.data;
              console.log(this.menuItem);
            }
          }
      ).catch(
          err => {}
      );
    },
    saveMenuActive(val) {
      this.menuActive = val;
      localStorage.setItem("menuActive", val);
    }
  },
  created() {
    this.loginName = this.$store.getters.getUser.userName;
    this.menuActive = localStorage.getItem("menuActive");
    // 默认仪表盘
    if (this.menuActive == '') {
      this.menuActive = '/panel';
      this.$router.push('/panel');
    }
    this.getMenuItem();
  }
}
</script>

<style scoped>

/*Container*/
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: left;
  height: auto;
}

.el-container {
  height: auto;
  min-height: 100%;
}


.el-menu {
  border-right: 0;
  text-align: left;
}

/*Mine*/

.admin {
  padding: 0;
  margin: 0;
  height: 100%;
}

.loginName {
  position: absolute;
  right: 150px;
  cursor: pointer;
}

.logoutButton {
  position: absolute;
  right: 10px;
  margin: 10px;
}

.blogTitle {
  font-size: 30px;
  font-family: 华文行楷;
  color: white;
}

.breadcrumb {
  margin-bottom: 20px;
}

</style>


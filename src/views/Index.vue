<template>
<div class="index">
  <el-backtop :right="100" :bottom="300"></el-backtop>
  <el-container>
    <el-header>
      <el-menu
          :style="mainStyle"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
          background-color="#B3C0D1"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="/indexArticle">首页</el-menu-item>
        <el-menu-item index="/category">文章目录</el-menu-item>
        <el-menu-item index="3">待开发</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">本项目地址</a></el-menu-item>
      </el-menu>
    </el-header>

    <el-main :style="mainStyle" >
      <el-row :gutter="20">
        <el-col :span="18" class="content-col">
          <router-view></router-view>
        </el-col>
        <el-col :span="6" class="side-col">
          <el-card class="notice-board">
            {{ indexInfo.noticeBoard }}
          </el-card>
          <el-calendar class="calender"></el-calendar>
          <aPlayer class="a-player"/>
          <!--可以使用网抑云-->
<!--          <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=100 src="//music.163.com/outchain/player?type=2&id=508042850&auto=0&height=66"></iframe>-->
        </el-col>
      </el-row>
    </el-main>

    <el-footer>Footer</el-footer>
  </el-container>
</div>
</template>

<script>
import aPlayer from "@/components/aPlayer";
export default {
  name: "Index",
  components: {
    aPlayer
  },
  data() {
    return {
      activeIndex: '1',
      mainStyle: 'width: '+ 74 + '%',
      indexInfo: {}
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initPage() {
      this.$axios.get('/index/indexInfo', {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.indexInfo = response.data.data;
            }
          }
      ).catch(() => {});
    }
  },
  watch:{
    '$store.state.screenWidth': function (val) { //监听屏幕宽度变化
      //1920为中心值 支持1280-1920-3804 100% - 80% - xx%
      var offset = 3804 - val; //2524-1884-0
      var width = offset / 2524 * 100;
      this.mainStyle = 'width: ' + width + '%';
    },
  },
  mounted() {
    this.initPage();
    this.$router.push('/indexArticle');
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}


.el-main {
  background-color: rgba(112, 188, 215, 0.3);
  color: #333;
  height: 100%;
  min-height: 1500px;
  margin: auto;
}

.el-menu {
  margin: auto;
  padding: 0;
}

.el-col {
  border-radius: 4px;
}

.el-container {
  height: auto;
  min-height: 100%;
}

.calender {
  width: auto;
  min-width: 300px;
  margin: 5px 0;
}

/deep/ .el-calendar-table .el-calendar-day{
  width: 20px;
  height: 40px;
}

.index {
  padding: 0;
  margin: 0;
  position: absolute;
  height: auto;
  width: 100%;
  min-height: 100%;
  background-image: url("../assets/image/full_res.jpg");
  background-size: 80px 60px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.a-player {
  margin: 5px 0;
}

.notice-board {
  margin: 5px 0;
}
</style>

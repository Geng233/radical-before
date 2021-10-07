<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px', background: '#49CF6A'}">
          <div class="card-div">
            <span class="card-div-name">已发布文章</span>
            <span class="card-div-value">{{this.panelValue.articleOkNum}}</span>
          </div>
          <div class="bottom" style="background: #2A8F1F">
            <el-button type="text" class="button" @click="handleClick1">查看更多</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px', background: '#009999' }">
          <div class="card-div">
            <span class="card-div-name">草稿箱</span>
            <span class="card-div-value">{{this.panelValue.articleDraftNum}}</span>
          </div>
          <div class="bottom" style="background: #1B8077">
            <el-button type="text" class="button" @click="handleClick2">查看更多</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px', background: '#006DFD' }">
          <div class="card-div">
            <span class="card-div-name">成立天数</span>
            <span class="card-div-value">{{this.panelValue.blogCreateTime}}</span>
          </div>
          <div class="bottom" style="background: #0E4FD2">
            <el-button type="text" class="button" disabled>{{this.panelValue.blogCreateDate}}</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px', background: '#990089' }">
          <div class="card-div">
            <span class="card-div-name">最近登录</span>
            <span class="card-div-value">{{this.panelValue.updateDate}}</span>
          </div>
          <div class="bottom" style="background: #88007A">
            <el-button type="text" class="button" disabled>{{this.panelValue.updateDate}}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <recent-article></recent-article>
    </div>
  </div>
</template>

<script>
import RecentArticle from "@/views/panel/RecentArticle";

export default {

  name: "Panel",
  components: {
    'recent-article': RecentArticle,
  },
  data() {
    return {
      panelValue: {
        articleOkNum: 'a',
        articleDraftNum: 'b',
        blogCreateTime: undefined,
        blogCreateDate: undefined,
        updateDate: undefined,
      },
    }
  },
  methods:{
    initPage() {
      this.getPanelInfo();
    },
    getPanelInfo() {
      this.$axios.get('/panel/panelInfo?userName=' + this.$store.getters.getUser.userName,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              var value = response.data.data;
              console.log(value);
              this.panelValue.articleOkNum = value.articleOkSize;
              this.panelValue.articleDraftNum = value.articleDraftSize;
              this.panelValue.blogCreateDate = value.blogCreateDate;
              this.panelValue.blogCreateTime = parseInt((new Date() - new Date(value.blogCreateDate) ) / (24 * 3600 * 1000));
              this.panelValue.updateDate = new Date(value.loginLast).toLocaleDateString();
            }
          }
      )
    },
    handleClick1() {
      this.$router.push({path: '/article/view'});
    },
    handleClick2() {
      this.$router.push({path: '/article/view'});
    }
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>
/*Layout*/

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.el-card {
  line-height: 100px;
}

/*Card*/
.bottom {
  line-height: 12px;
  padding: 0;
  margin: 0;
  height: 30px;
  text-align: center;
}

.button {
  padding: 0;
  margin: 0;
  line-height: 30px;
  color: white;
}

.card-div {
  padding: 14px;
}

.card-div-name {
  font-size: 15px;
  color: white;
}

.card-div-value {
  font-size: 25px;
  float: right;
  margin-right: 10%;
  color: white;
}

/*.el-table {*/
/*  width: 40%;*/
/*  display: inline-block;*/
/*  margin: 10px;*/
/*}*/
</style>

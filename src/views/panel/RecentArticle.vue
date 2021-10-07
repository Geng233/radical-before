<template>
  <div>
    <el-card>
      <el-descriptions title="最近文章">
      </el-descriptions>
      <el-table
          :data="recentArticleData"
          stripe
          style="width: 100%"
      >
        <el-table-column
            prop="articleId"
            label="文章id"
            v-if=false>
        </el-table-column>
        <el-table-column
            prop="articleTitle"
            label="文章标题"
            width="400">
        </el-table-column>
        <el-table-column
            label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.articleCreateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="修改时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.articleUpdateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="文章状态"
            width="400"
            prop="articleType">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RecentArticle",
  data() {
    return {
      recentArticleData: [],
    }
  },
  methods: {
    initPage() {
      this.getRecentArticle();
    },
    getRecentArticle() {
      this.$axios.get("/article/getSimple?userName=" + this.$store.getters.getUser.userName + '&length=5', {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.recentArticleData = response.data.data;
              console.log(this.recentArticleData);
            }
          }
      ).catch(
          err => {}
      );
    },
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>

</style>

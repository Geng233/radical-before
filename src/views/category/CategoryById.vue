<template>
  <div class="container">

    <div v-for="item in articleData" :key="item.articleId" class="articleMainDiv">

      <el-card shadow="never" @click="openArticle(item.articleId)">
        <div  @click="openArticle(item.articleId)">
          <el-descriptions title="文章信息" :column="2" @click="openArticle(item.articleId)">
            <el-descriptions-item label="文章标题">{{item.articleTitle}}</el-descriptions-item>
            <el-descriptions-item label="文章类型">{{item.articleType}}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{item.articleCreateDate}}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{item.articleUpdateDate}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryById",
  data() {
    return {
      categoryId: '',
      articleData: [],
    }
  },
  methods: {
    initPage() {
      this.categoryId = this.$route.params.id;
      this.getArticlesByCategoryId();
    },
    getArticlesByCategoryId() {
      this.$axios.get("/article/category?categoryId=" + this.categoryId, {
        "Authorization": this.$store.getters.getToken
      }).then(
        response => {
          if (response.data.code == 200) {
            this.articleData = response.data.data;
          }
        }
      ).catch( () => {});
    },
    openArticle(articleId) {
      this.$router.push({
        path: `/oneArticle/${articleId}`
      })
    }
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>
.articleMainDiv {
  margin-bottom: 20px;
}
</style>

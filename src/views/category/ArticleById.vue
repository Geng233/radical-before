<template>
  <div>
    <el-card>
      <div class="html-content">
        <div v-html="article.articleHtmlContent"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleById",
  data() {
    return {
      articleId: '',
      article: {}
    };
  },
  methods: {
    initPage() {
      this.articleId = this.$route.params.id;
      this.getArticle();
    },
    getArticle() {
      this.$axios.get("/article/getOne?articleId=" + this.articleId, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.article = response.data.data;
              tocbot.refresh();
            }
          }
      ).catch( () => {});
    }
  },
  mounted() {
    this.initPage();
  }
}
</script>

<style scoped>

/*md渲染*/

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto 0 auto;
  padding: 0;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>

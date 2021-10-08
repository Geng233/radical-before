<template>
  <div class="container">

    <div v-for="item in articleDataWithActive" :key="item.articleId" class="articleMainDiv">
      <el-card shadow="never">
        <div>
          <el-descriptions title="文章信息" :column="2">
            <el-descriptions-item label="文章标题" >{{item.articleTitle}}</el-descriptions-item>
            <el-descriptions-item label="文章类型">{{item.articleType}}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{item.articleCreateDate}}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{item.articleUpdateDate}}</el-descriptions-item>
            <el-descriptions-item label="tags">
              <el-tag size="small" v-for="i in item.tags" :key="item.tags.tagId">{{i.tagName}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="所属目录">
              <el-tag size="small" v-for="i in item.categories" :key="item.categories.categoryId">{{i.categoryName}}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div   class="container" v-show="item.isActive">
          <div v-html="item.articleHtmlContent" class="markdown-body"></div>
        </div>
        <el-button type="text" class="button" @click="handleOpen(item)">展开</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>


export default {
  name: "IndexArticle",
  data() {
    return {
      displayName: '',
      articleData: [
      ],
      articleDataWithActive: [],
    };
  },
  methods: {
    initPage: function () {
      this.$axios.get("/index/indexInfo", {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              var map = response.data.data;
              this.displayName = map.displayName;
              this.$axios.get("/article/getWithoutContent?userName=" + this.displayName + '&length=5', {
                "Authorization": this.$store.getters.getToken
              }).then(
                  resp => {
                    if (resp.data.code == 200) {
                      this.articleData = resp.data.data.filter( x => x.articleType == 'ok');
                      console.log(this.articleData);
                      for (const article of this.articleData) {
                        var art = {};
                        art.articleTitle = article.articleTitle;
                        art.articleId =  article.articleId;
                        art.articleType =  article.articleType;
                        art.articleCreateDate =  article.articleCreateDate;
                        art.articleUrl =  article.articleUrl;
                        art.articleUpdateDate = article.articleUpdateDate;
                        // art.articleHtmlContent =  article.articleHtmlContent;
                        art.tags = article.tags;
                        art.categories = article.categories;
                        art.isActive = false;
                        this.articleDataWithActive.push(art);
                      }
                      this.articleDataWithActive[0].isActive = true;
                      this.getOneArticle(this.articleDataWithActive[0]);
                    }
                  }
              ).catch(
                  err => {
                  }
              );
            }
          }
      ).catch(
          err => {
          }
      );
    },
    getOneArticle(article) {
      this.$axios.get("/article/getOne?articleId=" + article.articleId, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              article.articleHtmlContent = response.data.data.articleHtmlContent;
              console.log("getArticleContent" + article.articleTitle);
              this.$forceUpdate();
              setTimeout(function () {
                Prism.highlightAll();
              },2000);
            }
          }
      ).catch(() => {
      });
    },
    handleOpen(item) {
      item.isActive = !item.isActive;
      console.log(item.isActive);
      if (item.isActive) {
        this.getOneArticle(item);
      }
    }
  },
  created() {
    this.initPage();
  },
}
</script>

<style scoped>
.button {
  padding: 0;
  margin: 0;
  line-height: 50px;
  width: 100%;
  color: black;
  background: beige;
}

.articleMainDiv {
  margin-bottom: 20px;
}

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

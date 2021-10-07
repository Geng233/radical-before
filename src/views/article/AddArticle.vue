<template>
<div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="12">
        <el-col :span="18">
          <el-form-item label="文章标题">
            <el-input v-model="form.articleTitle"></el-input>
          </el-form-item>
          <div>
            <textarea id="MyId"></textarea>
          </div>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文章类型">
            <el-select v-model="form.articleType" placeholder="请选择文章类型">
              <el-option label="发布" value="ok"></el-option>
              <el-option label="私密" value="ban"></el-option>
              <el-option label="草稿" value="draft"></el-option>
              <el-option label="回收站" value="recycleBin"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章路径">
            <el-input v-model="form.articleUrl" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="文章标签">
            <el-select  v-model="tagId" filterable placeholder="请选择">
              <el-option
                  v-for="item in tags"
                  :key="item.tagId"
                  :label="item.tagName"
                  :value="item.tagId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章目录">
            <el-select  v-model="categoryId" filterable placeholder="请选择">
              <el-option
                  v-for="item in categories"
                  :key="item.categoryId"
                  :label="item.categoryName"
                  :value="item.categoryId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="success" @click="onSubmitA" v-if="!isAlter">发表</el-button>
            <el-button type="success" @click="onSubmitB" v-if="isAlter">更新</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
</div>
</template>

<script>
import "simplemde/dist/simplemde.min.css";
import SimpleMDE from "simplemde";
import showdown from "showdown";

export default {
  name: "AddArticle",
  data() {
    return {
      form: {
        articleTitle: '',
        articleType: '',
        articleUrl: '',
        userId: -1,
        articleCreateDate: null,
        articleUpdateDate: null,
        articleHtmlContent: '',
        articleMdContent: '',
        tags: [],
        categories: [],
      },
      tags: [],
      categories: [],
      tagId: '',
      categoryId: '',
      simplemde: null,
      data: '请输入文字',
      htmlData: '',
      articleId: undefined,
      isAlter: false
    }
  },
  methods: {
    getArticle() {
      this.$axios.get("article/getOne?articleId=" + this.articleId, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              var inArticle = response.data.data;
              this.form = inArticle;
              this.data = inArticle.articleMdContent;
              this.htmlData = inArticle.articleHtmlContent;
              this.simplemde.value(this.data);
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          }
      );
    },
    createSimplemde() {
      this.simplemde = new SimpleMDE();
      if (this.data) {
        this.simplemde.value(this.data);
      }
      // 加载事件处理
      this.simplemde.codemirror.on("change", () => {
        // 刷新html文档数据
        this.htmlData = new showdown.Converter().makeHtml(
            this.simplemde.value()
        );
        // 刷新data数据
        this.data = this.simplemde.value();
      });
    },
    initPage() {
      this.createSimplemde();
      //判断重写
      this.articleId = this.$route.query.articleId;
      if (this.articleId != undefined) {
        this.isAlter = true;
        this.getArticle();
      }
      this.getTags();
      this.getCategories();
    },
    onSubmitA() {
      var userName, userId;
      if (this.$store.getters.getUser == '') {
        userName = '';
      } else {
        userName = this.$store.getters.getUser.userName;
      }
      this.$axios.get("user/info?userName=" + userName, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              userId = response.data.data.userId;
            }
            this.form.userId = userId;
            this.form.articleCreateDate = this.form.articleUpdateDate = new Date();
            this.form.articleHtmlContent = this.htmlData;
            this.form.articleMdContent = this.data;
            this.form.categories = [{"categoryId" :this.categoryId}];
            this.form.tags = [{"tagId" :this.tagId}];
            console.log(this.form);
            this.$axios.post("/article/add", this.form).then(
                res => {
                  if (res.data.code == 200) {
                    this.$message({
                      message: res.data.message,
                      type: 'success'
                    });
                  } else {
                    this.$message({
                      message: res.data.message,
                      type: 'error'
                    });
                  }

                }
            ).catch(err => {
            });
          }
      ).catch(
          err => {}
      );
    },
    onSubmitB() {
      var userName, userId;
      if (this.$store.getters.getUser == '') {
        userName = '';
      } else {
        userName = this.$store.getters.getUser.userName;
      }
      this.$axios.get("user/info?userName=" + userName, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              userId = response.data.data.userId;
            }
            this.form.userId = userId;
            this.form.articleCreateDate = this.$simpleUtils.setDateStringToDate(this.form.articleCreateDate);
            this.form.articleUpdateDate = new Date();
            this.form.articleHtmlContent = this.htmlData;
            this.form.articleMdContent = this.data;
            console.log(this.form);
            this.$axios.put("/article/alter", this.form).then(
              res => {
                if (res.data.code == 200) {
                  this.$message({
                    message: res.data.message,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: res.data.message,
                    type: 'error'
                  });
                }
              }
            ).catch(
                err => {

                }
            );
          }
      ).catch(
          err => {}
      );
    },
    getTags() {
      this.$axios.get('/tag/get',{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.tags = response.data.data;
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
    getCategories() {
      this.$axios.get('/category/get',{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.categories = response.data.data;
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
  },
  mounted() {
    this.initPage();
  }
}
</script>

<style scoped>

/deep/ .CodeMirror {
  min-height: 700px;
}

/deep/ .CodeMirror-scroll {
  min-height: 700px;
}

.buttons .el-button {
  width: 200px;
  margin: 10px;
}

</style>

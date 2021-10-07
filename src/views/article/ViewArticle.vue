<template>
<div>
  <el-tabs type="border-card">
    <el-tab-pane :label="item.tagName"  v-for="item in tabs" :key="item.tagName" :value="item.tagType">
      <div class="articleArea">
        <el-table
            :data="item.articleData.slice((item.currentPage-1)*item.pageSize,item.currentPage*item.pageSize)"
            stripe
            style="width: 100%"
            >
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
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
              label="修改状态"
              prop="articleType"
              width="400">
            <template slot-scope="scope">
              <div>
                <el-radio-group v-model="scope.row.articleType" size="small" @change="changeArticleType(scope.row)">
                  <el-radio-button label="ok"></el-radio-button>
                  <el-radio-button label="ban"></el-radio-button>
                  <el-radio-button label="draft"></el-radio-button>
                  <el-radio-button label="recycleBin"></el-radio-button>
                </el-radio-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="50">
            <template slot-scope="props">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-card shadow="hover">
                    <el-descriptions title="目录"></el-descriptions>
                    <el-tag
                        v-for="category in props.row.categories"
                        :key="category.categoryId"
                        closable
                        type="success"
                        @close="handleCloseCategory(category, props.row)"
                        effect="dark">
                      {{category.categoryName}}
                    </el-tag>
                    <el-button class="button-new-tag" size="small" @click="showAddArticleCategory(props.row.articleId)">+ New Category</el-button>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="hover">
                    <el-descriptions title="标签"></el-descriptions>
                    <el-tag
                        v-for="tag in props.row.tags"
                        :key="tag.tagId"
                        closable
                        type="success"
                        @close="handleCloseTag(tag, props.row)"
                        effect="plain">
                      {{tag.tagName}}
                    </el-tag>
                    <el-button class="button-new-tag" size="small" @click="showAddArticleTag(props.row.articleId)">+ New Tag</el-button>
                  </el-card>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="item.total"
              :page-size="item.pageSize"
              :current-page="item.currentPage"
              @current-change="current_change($event, item)">
          </el-pagination>
        </div>
      </div>
    </el-tab-pane >
  </el-tabs>
  <el-dialog title="标签选择" :visible.sync="dialogTagFormVisible">
    <el-form>
      <el-form-item label="标签名">
        <el-select  v-model="value" filterable placeholder="请选择">
          <el-option
              v-for="item in tags"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTagFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddArticleTag">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="目录选择" :visible.sync="dialogCategoryFormVisible">
    <el-form>
      <el-form-item label="目录名">
        <el-select  v-model="value" filterable placeholder="请选择">
          <el-option
              v-for="item in categories"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCategoryFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddArticleCategory">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "ViewArticle",
  data() {
    return {
      marks: {
        0: '发表',
        30: '私密',
        60: '草稿箱',
        90: '回收',
      },
      articleData: [],
      tags: [],
      categories: [],
      articleId: '',
      categoryId: '',
      dialogTagFormVisible: false,
      dialogCategoryFormVisible: false,
      value: '',
      tabs: [
        {
          tagName: '发表',
          tagType: 'ok',
          total: 1,
          pageSize:11,
          currentPage:1,
          articleData: [],
        },
        {
          tagName: '私密',
          tagType: 'ban',
          total: 1,
          pageSize:11,
          currentPage:1,
          articleData: [],
        },
        {
          tagName: '草稿箱',
          tagType: 'draft',
          total: 1,
          pageSize:11,
          currentPage:1,
          articleData: [],
        },
        {
          tagName: '回收站',
          tagType: 'recycleBin',
          total: 1,
          pageSize:11,
          currentPage:1,
          articleData: [],
        },
      ]
    }
  },
  methods: {
    initPage() {
      this.$axios.get("/article/getWithoutContent?userName=" + this.$store.getters.getUser.userName, {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.articleData = response.data.data;
              for (const tab of this.tabs) {
                tab.total = response.data.data.filter( x => x.articleType == tab.tagType).length;
                tab.articleData = response.data.data.filter(x => x.articleType == tab.tagType);
              }
            }
          }
      ).catch(
          err => {}
      );
    },
    changeArticleType(article) {
      console.log(article.articleType);
      article.articleCreateDate = article.articleUpdateDate = '';
      this.$axios.put('/article/alterType', article,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              console.log(article.articleType)
              this.initPage();
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
          }
      ).catch(() => {

      });
    },
    filterType(value, row) {
      return row.articleType === value;
    },
    handleEdit(index, row) {
      this.$router.push({path: '/article/add', query: {articleId: row.articleId}});
      this.$emit("saveMenuActive",'/article/add');
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除【'  + row.articleTitle + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete("/article/remove?articleId=" + row.articleId, {
          "Authorization": this.$store.getters.getToken
        }).then(
            response => {
              if (response.data.code == 200) {
                this.initPage();
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                });
              }
            }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCloseTag(tag, article) {
      article.tags.splice(article.tags.indexOf(tag), 1);
      this.removeArticleTag(tag, article);
    },
    handleCloseCategory(category, article) {
      article.categories.splice(article.tags.indexOf(category), 1);
      this.removeArticleCategory(category, article);
    },
    removeArticleTag(tag, article) {
      console.log(tag.tagId);
      console.log(article.articleId);
      this.$axios.delete('/article/removeTag?articleId=' + article.articleId + '&tagId=' + tag.tagId,{
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
                type: 'error'
              });
            }
          }
      ).catch(
          err => {

          }
      );
    },
    removeArticleCategory(category, article) {
      this.$axios.delete('/article/removeCategory?articleId=' + article.articleId + '&categoryId=' + category.categoryId,{
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
                type: 'error'
              });
            }
          }
      ).catch(
          err => {

          }
      );
    },
    addArticleTag(articleId, tagId) {
      this.$axios.post('/article/addTag', {"articleId": articleId, "tagId": tagId},{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.initPage();
              this.$message({
                message: response.data.message,
                type: 'success'
              });
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
    addArticleCategory(articleId, categoryId) {
      this.$axios.post('/article/addCategory', {"articleId": articleId, "categoryId": categoryId},{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.initPage();
              this.$message({
                message: response.data.message,
                type: 'success'
              });
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
    showAddArticleTag(articleId) {
      this.articleId = articleId;
      this.getTags();
      this.dialogTagFormVisible = true;
    },
    showAddArticleCategory(articleId) {
      this.articleId = articleId;
      this.getCategories();
      this.dialogCategoryFormVisible  = true;
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
    handleAddArticleTag() {
      this.dialogTagFormVisible = false;
      console.log(this.articleId);
      console.log(this.value);
      this.addArticleTag(this.articleId, this.value);
      this.articleId = '';
      this.value = '';
    },
    handleAddArticleCategory() {
      this.dialogCategoryFormVisible = false;
      console.log(this.articleId);
      console.log(this.value);
      this.addArticleCategory(this.articleId, this.value);
      this.articleId = '';
      this.value = '';
    },
    current_change(val, item){
      item.currentPage = val;
    },
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>
.articleArea {
  width: 100%;
}
.el-tag{
  margin: 10px 10px 0 0;
}
.button-new-tag {
  margin: 10px 10px 0 0;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>

<template>
<div>
    <el-row :gutter="12">
      <el-col :span="18">
        <el-card>
          <div class="tagArea">
            <el-descriptions title="标签信息">
              <template slot="extra">
                <el-button type="primary" @click="handleAdd">添加</el-button>
              </template>
            </el-descriptions>
            <el-table
                :data="tags.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100%"
            >
              <el-table-column
                  prop="tagId"
                  label="标签id"
                  v-if=false>
              </el-table-column>
              <el-table-column
                  prop="tagName"
                  label="标签名称"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="tagUrl"
                  label="标签url">
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
            </el-table>
            <div style="text-align: center;margin-top: 30px;">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="pageSize"
                  :current-page="currentPage"
                  @current-change="current_change">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-descriptions title="标签快速管理">
        </el-descriptions>
        <div>
          <el-card class="tag-card" shadow="hover">
            <el-tag
                v-for="tag in tags"
                :key="tag.tagId"
                closable
                type="success"
                @close="handleClose(tag)"
                effect="plain">
              {{tag.tagName}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="编辑标签" :visible.sync="dialogFormVisible">
      <el-form :model="tagForm">
        <el-form-item label="标签名字" :label-width="formLabelWidth">
          <el-input v-model="tagForm.tagName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签url" :label-width="formLabelWidth">
          <el-input v-model="tagForm.tagUrl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdateOrAdd">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
  inject:['reload'],
  name: "ViewTag",
  data() {
    return {
      total: 1,
      pageSize:11,
      currentPage:1,
      inputVisible: false,
      inputValue: '',
      isChange: false,
      tags: [],
      rowTem: {
        tagId: '',
        tagName: '',
        tagUrl: '',
      },
      dialogFormVisible: false,
      tagForm: {
        tagId: '',
        tagName: '',
        tagUrl: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    initPage() {
      this.getTags();
    },
    getTags() {
      this.$axios.get('/tag/get',{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.tags = response.data.data;
              this.total = response.data.data.length;
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
    handleAdd() {
      this.tagForm.tagId = '';
      this.tagForm.tagName = '';
      this.tagForm.tagUrl = '';
      this.isChange = false;
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      // this.tagForm.tagId = row.tagId;
      // this.tagForm.tagName = row.tagName;
      // this.tagForm.tagUrl = row.tagUrl;
      this.tagForm = row;
      this.rowTem.tagId = row.tagId;
      this.rowTem.tagName = row.tagName;
      this.rowTem.tagUrl = row.tagUrl;
     // this.rowMarked = row;
      this.isChange = true;
      this.dialogFormVisible = true;
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.tagForm.tagId = this.rowTem.tagId;
      this.tagForm.tagName = this.rowTem.tagName;
      this.tagForm.tagUrl = this.rowTem.tagUrl;
    },
    handleUpdateOrAdd() {
      this.dialogFormVisible = false;
      if (this.isChange) {
        this.alterTag(this.tagForm);
      } else {
        this.addTag(this.tagForm);
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除【' + row.tagName + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
          () => {
            this.removeTag(row.tagId);
          }
      ).catch(
          () => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          }
      );
    },
    addTag(tag) {
      this.$axios.post('/tag/add',tag,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.reload();
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
    removeTag(tagId) {
      this.$axios.delete('/tag/remove?tagId=' + tagId,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.reload();
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

    alterTag(value) {
      this.$axios.put('/tag/alter',value,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              //此处为了用户体验就不刷新了，只是使用缓存的数据，但是数据库已经变了，所以无所谓
              //this.reload();
              // this.reload();
              this.$message({
                message: response.data.message,
                type: 'success'
              });
              return true;
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              });
              return false;
            }
          }
      ).catch(
          err => {

          }
      );
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.removeTag(tag.tagId);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push({tagName: inputValue, tagUrl: inputValue});
        this.addTag({tagName: inputValue, tagUrl: inputValue});
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    current_change(currentPage){
      this.currentPage = currentPage;
    },
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>
.tagArea {
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
.input-new-tag {
  width: 90px;
  margin: 10px 10px 0 0;
  vertical-align: bottom;
}
</style>

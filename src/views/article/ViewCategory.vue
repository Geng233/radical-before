<template>
<div>
  <el-card>
    <div class="categoryArea">
      <el-descriptions title="目录信息">
        <template slot="extra">
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </template>
      </el-descriptions>
      <el-table
          :data="categories.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
      >
        <el-table-column
            prop="categoryId"
            label="目录id"
            v-if=false>
        </el-table-column>
        <el-table-column
            prop="categoryName"
            label="目录名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="categoryUrl"
            label="目录url"
            width="200">
        </el-table-column>
        <el-table-column
            prop="categoryDescription"
            label="目录描述">
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
  <el-dialog title="编辑目录" :visible.sync="dialogFormVisible">
    <el-form :model="categoryForm">
      <el-form-item label="目录名字" :label-width="formLabelWidth">
        <el-input v-model="categoryForm.categoryName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="目录url" :label-width="formLabelWidth">
        <el-input v-model="categoryForm.categoryUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="目录描述" :label-width="formLabelWidth">
        <el-input v-model="categoryForm.categoryDescription" autocomplete="off"></el-input>
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
  name: "ViewCategory",
  data() {
    return {
      total: 1,
      pageSize:11,
      currentPage:1,
      inputVisible: false,
      inputValue: '',
      isChange: false,
      categories: [],
      rowTem: {
        categoryId: '',
        categoryName: '',
        categoryUrl: '',
        categoryDescription: ''
      },
      dialogFormVisible: false,
      categoryForm: {
        categoryId: '',
        categoryName: '',
        categoryUrl: '',
        categoryDescription: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    initPage() {
      this.getCategories();
    },
    getCategories() {
      this.$axios.get('/category/get',{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.categories = response.data.data;
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
      this.categoryForm.categoryId = '';
      this.categoryForm.categoryName = '';
      this.categoryForm.categoryUrl = '';
      this.categoryForm.categoryDescription = '';
      this.isChange = false;
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.categoryForm = row;
      this.rowTem.categoryId = row.categoryId;
      this.rowTem.categoryName = row.categoryName;
      this.rowTem.categoryUrl = row.categoryUrl;
      this.rowTem.categoryDescription = row.categoryDescription;
      // this.rowMarked = row;
      this.isChange = true;
      this.dialogFormVisible = true;
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.categoryForm.categoryId = this.rowTem.categoryId;
      this.categoryForm.categoryName = this.rowTem.categoryName;
      this.categoryForm.categoryUrl = this.rowTem.categoryUrl;
      this.categoryForm.categoryDescription = this.rowTem.categoryDescription;
    },
    handleUpdateOrAdd() {
      this.dialogFormVisible = false;
      if (this.isChange) {
        this.alterCategory(this.categoryForm);
      } else {
        this.addCategory(this.categoryForm);
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除【' + row.categoryName + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
          () => {
            this.removeCategory(row.categoryId);
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
    addCategory(category) {
      this.$axios.post('/category/add',category,{
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
    removeCategory(categoryId) {
      this.$axios.delete('/category/remove?categoryId=' + categoryId,{
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
    alterCategory(value) {
      this.$axios.put('/category/alter',value,{
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
.categoryArea {
  width: 100%;
}
</style>

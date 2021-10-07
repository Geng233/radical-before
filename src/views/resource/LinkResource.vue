<template>
  <div>
    <div class="linkArea">
      <el-descriptions title="链接信息">
        <template slot="extra">
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </template>
      </el-descriptions>
      <el-table
          :data="links"
          style="width: 100%"
          :row-class-name=" tableRowClassName">
        <el-table-column
            prop="linkId"
            label="链接id"
            v-if=false>
        </el-table-column>
        <el-table-column
            prop="linkName"
            label="链接名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="linkUrl"
            label="url"
            width="200">
        </el-table-column>
        <el-table-column
            prop="linkDescription"
            label="链接描述"
        >
        </el-table-column>
        <el-table-column
            prop="linkPic"
            label="链接图片"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="linkState"
            label="链接状态"
            width="200">
          <template slot-scope="scope">
            <div>
              <el-radio-group v-model="scope.row.linkState" size="small" @change="changeLinkState(scope.row)">
                <el-radio-button label="ok"></el-radio-button>
                <el-radio-button label="ban"></el-radio-button>
                <el-radio-button label="disable"></el-radio-button>
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
      </el-table>
    </div>

    <el-dialog title="编辑链接" :visible.sync="dialogFormVisible">
      <el-form :model="linkForm">
        <el-form-item label="链接名字" :label-width="formLabelWidth">
          <el-input v-model="linkForm.linkName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接url" :label-width="formLabelWidth">
          <el-input v-model="linkForm.linkUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接图片" :label-width="formLabelWidth">
          <el-input v-model="linkForm.linkPic" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接描述" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 10}"
              maxlength="255"
              show-word-limit
              placeholder="请输入内容"
              v-model="linkForm.linkDescription">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateOrAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  name: "LinkResource",
  data() {
    return {
      isChange: false,
      links: [],
      dialogFormVisible: false,
      linkForm: {
        linkId: '',
        linkName: '',
        linkUrl: '',
        linkDescription: '',
        linkPic: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    initPage() {
      this.getLinks();
    },
    getLinks() {
      this.$axios.get('/link/get',{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.links = response.data.data;
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
    tableRowClassName({row, rowIndex}) {
      switch(row.linkState) {
        case 'ok':
          return 'ok-row';
          break;
        case 'ban':
          return 'ban-row';
          break;
        case 'disable':
          return 'disable-row';
          break;
        default:
          return '';
      }
      return '';
    },
    handleAdd() {
      this.linkForm.linkId = '';
      this.linkForm.linkName = '';
      this.linkForm.linkUrl = '';
      this.linkForm.linkDescription = '';
      this.linkForm.linkPic = '';
      this.linkForm.linkState = 'ok';
      this.isChange = false;
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.linkForm.linkId = row.linkId;
      this.linkForm.linkName = row.linkName;
      this.linkForm.linkUrl = row.linkUrl;
      this.linkForm.linkDescription = row.linkDescription;
      this.linkForm.linkPic = row.linkPic;
      this.linkForm.linkState = row.linkState;
      this.isChange = true;
      this.dialogFormVisible = true;
    },
    handleUpdateOrAdd() {
      this.dialogFormVisible = false;
      if (this.isChange) {
        this.alterLink(this.linkForm);
      } else {
        this.addLink(this.linkForm);
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除【' + row.linkId + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
          () => {
            console.log(row.linkId);
            this.removeLink(row.linkId);
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
    changeLinkState(value) {
      this.alterLink(value);
    },
    addLink(link) {
      this.$axios.post('/link/add',link,{
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
    removeLink(linkId) {
      this.$axios.delete('/link/remove?linkId=' + linkId,{
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

    alterLink(value) {
      this.$axios.put('/link/alter',value,{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              //此处为了用户体验就不刷新了，只是使用缓存的数据，但是数据库已经变了，所以无所谓
              //this.reload();
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
    }
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>

/deep/ .el-table .ok-row {
  background: #f0f9eb;
}
/deep/ .el-table .disable-row {
  background: #B3C0D1;
}
/deep/ .el-table .ban-row {
  background: oldlace;
}

.linkArea {
  width: 80%;
}

</style>

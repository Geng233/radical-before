<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          图片查看
          待开发
        </el-card>
      </el-col>
      <el-col :span="6">
        <div class="upload-div">
          <el-card>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://localhost:8060/attachment/upload"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-error="handleError"
                :on-success="handleSuccess"
                :file-list="fileList"
                :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RecentArticle from "@/views/panel/RecentArticle";

export default {
  name: "ImageResource",
  components: {
    'recent-article': RecentArticle,
  },
  data() {
    return {
      fileList: [
      ]
    };
  },
  computed: {
    headers() {
      return {
        "Authorization": this.$store.getters.getToken// 你是怎么存的 token，怎么取 token 就行
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res, file, filelist) {
      if (res.data.code == '200') {
        this.$message.success("上传成功");
      } else {
        this.$message.error("上传失败");
      }
    },
    // err 表示失败后的响应体
    handleError(err, file, filelist) {
      this.$message.error("上传失败");
    },
  }
}
</script>

<style scoped>
</style>

<template>
  <div class="upload-div">
<!--    <el-upload-->
<!--        class="upload-demo"-->
<!--        drag-->
<!--        action="http://localhost:8060/attachment/upload"-->
<!--        :on-error="handleError"-->
<!--        :on-success="handleSuccess"-->
<!--        :on-remove="handleRemove"-->
<!--        :before-remove="beforeRemove"-->
<!--        :before-upload="beforeUpload"-->
<!--        :headers="headers"-->
<!--        multiple>-->
<!--      <i class="el-icon-upload"></i>-->
<!--      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--    </el-upload>-->

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
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>


<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->

<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    headers() {-->
<!--      return {-->
<!--        "Authorization": this.$store.getters.getToken// 你是怎么存的 token，怎么取 token 就行-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--// res 表示请求响应体-->
<!--    handleSuccess(res, file, filelist) {-->
<!--      if (res.data.code == '200') {-->
<!--        this.$message.success("上传成功");-->
<!--      } else {-->
<!--        this.$message.error("上传失败");-->
<!--      }-->
<!--    },-->
<!--    // err 表示失败后的响应体-->
<!--    handleError(err, file, filelist) {-->
<!--      this.$message.error("上传失败");-->
<!--    },-->
<!--    beforeRemove(file, fileList) {-->
<!--      return this.$confirm(`确定移除 ${ file.name }？`);-->
<!--    },-->
<!--    handleRemove(file, fileList) {-->
<!--      console.log("你要移除的文件为", file.name);-->
<!--    },-->
<!--    beforeUpload(file) {-->

<!--    },-->
<!--    handlePreview(file) {-->
<!--      console.log(file);-->
<!--    },-->
<!--    handleExceed(files, fileList) {-->
<!--      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);-->
<!--    },-->

<!--  }-->
<!--}-->
<!--</script>-->


<script>
export default {
  data() {
    return {
      fileList: [
        // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
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
.upload-div {
  width: 200px;
  height: 200px;
  background: #f0f9eb;
}
</style>


<!--https://blog.csdn.net/qq_43647359/article/details/108884311-->

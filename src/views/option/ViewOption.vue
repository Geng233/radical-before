<template>
<div>
  <el-form label-position="left" label-width="150px">
    <el-form-item :label=item.optionName v-for="item in options" :key = item.optionId>
      <el-input
          placeholder="请输入内容"
          v-model="item.optionValue"
          :disabled="true"
          >
      </el-input>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "ViewOption",
  data() {
    return {
      options: []
    }
  },
  methods: {
    getOption() {
      this.$axios.get('/option/get',{
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.options = response.data.data;
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
    this.getOption();
  }
}
</script>

<style scoped>

</style>

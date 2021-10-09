<template>
  <el-table
      :data="linksTable.filter(x => x.linkState != 'ban')"
      stripe
      style="width: 100%">
    <el-table-column
        v-if=false
        prop="linkId"
        label="链接id"
        width="180">
    </el-table-column>
    <el-table-column
        prop="linkName"
        label="链接名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="linkUrl"
        label="链接url">
      <template slot-scope="scope">
        <el-link type="success" :href="scope.row.linkUrl" v-if="scope.row.linkState == 'ok'">{{scope.row.linkUrl}}</el-link>
        <el-link type="info" :href="scope.row.linkUrl" v-if="scope.row.linkState == 'disable'" disabled>{{scope.row.linkUrl}}</el-link>
      </template>
    </el-table-column>
    <el-table-column
        prop="linkDescription"
        label="链接描述">
    </el-table-column>
    <el-table-column
        v-if=false
        prop="linkPic"
        label="链接图片">
    </el-table-column>
    <el-table-column
        v-if=false
        prop="linkState"
        label="链接状态">
      <template slot-scope="scope">
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "IndexLink",
  data() {
    return {
      linksTable: [],
    }
  },
  methods: {
    initPage() {
      this.getLinks();
    },
    getLinks() {
      this.$axios.get('/link/get', {
        "Authorization": this.$store.getters.getToken
      }).then(
          response => {
            if (response.data.code == 200) {
              this.linksTable = response.data.data;
            }
          }
      ).catch(() => {
      });
    }
  },
  created() {
    this.initPage();
  }
}
</script>

<style scoped>

</style>

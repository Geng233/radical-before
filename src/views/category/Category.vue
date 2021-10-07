<template>
<div>
  <el-card :body-style="{background: colors[i%39][0], height: '100%'}" v-for="(item,i) in categories" :key="item.categoryId">
    <div class="card-div">
      <div class="card-div-value">
        <span>目录名：  </span>
        {{item.categoryName}}
      </div>
      <div class="card-div-value">
        <span>目录地址：  </span>
        {{item.categoryUrl}}
      </div>
      <div class="card-div-description">
        {{item.categoryDescription}}
      </div>
    </div>
    <div class="bottom" :style="{background: colors[i%39][1]}">
      <el-button type="text" class="button" @click="handleClick(item.categoryId)">查看更多</el-button>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      categories: [],
      colorIndex: 1,
      colors: [
        ['#666666', '#444444'],
        ['#FFB7DD', '#FF88C2'],
        ['#C10066', '#A20055'],
        ['#FFCCCC', '#FF8888'],
        ['#CC0000', '#AA0000'],
        ['#FFC8B4', '#FFA488'],
        ['#E63F00', '#C63300'],
        ['#FFDDAA', '#FFBB66'],
        ['#EE7700', '#CC6600'],
        ['#FFEE99', '#FFDD55'],
        ['#DDAA00', '#AA7700'],
        ['#EEFFBB', '#DDFF77'],
        ['#EEEE00', '#BBBB00'],
        ['#CCFF99', '#BBFF66'],
        ['#99DD00', '#88AA00'],
        ['#99FF99', '#66FF66'],
        ['#00DD00', '#00AA00'],
        ['#BBFFEE', '#77FFCC'],
        ['#00DD77', '#00AA55'],
        ['#AAFFEE', '#77FFEE'],
        ['#00DDAA', '#00AA88'],
        ['#99FFFF', '#66FFFF'],
        ['#00DDDD', '#00AAAA'],
        ['#CCEEFF', '#77DDFF'],
        ['#009FCC', '#0088A8'],
        ['#CCDDFF', '#99BBFF'],
        ['#0044BB', '#003C9D'],
        ['#CCCCFF', '#9999FF'],
        ['#0000CC', '#0000AA'],
        ['#CCBBFF', '#9F88FF'],
        ['#4400CC', '#2200AA'],
        ['#D1BBFF', '#B088FF'],
        ['#5500DD', '#4400B3'],
        ['#E8CCFF', '#D28EFF'],
        ['#7700BB', '#66009D'],
        ['#F0BBFF', '#E38EFF'],
        ['#A500CC', '#7A0099'],
        ['#FFB3FF', '#FF77FF'],
        ['#CC00CC', '#990099'],
      ]
    }
  },
  methods: {
    initPage() {
      this.getCategory();
    },
    getCategory() {
      this.$axios.get("/category/get", {
        "Authorization": this.$store.getters.getToken
      }).then(
        response => {
          if (response.data.code == 200) {
            this.categories = response.data.data;
          }
        }
      ).catch( () => {});
    },
    handleClick(categoryId) {
      this.$router.push({
        path: `/category/${categoryId}`
      // params: {
      //   id: category.categoryId
      // }
    });
    }
  },
  created() {
    this.initPage();
  },
}
</script>

<style scoped>
.el-card {
  display: inline-block;
  width: 230px;
  margin: 5px;
  padding: 0;
  height: 230px;
}

.card-div {
  height: 70%;
}
.card-div-value {
  color: white;
  padding-bottom: 5px;
}
.card-div-description {
  color: #333333;
  font-size: 15px;
}
.bottom {
  line-height: 12px;
  padding: 0;
  margin: 0;
  height: 30px;
  text-align: center;
}

.button {
  padding: 0;
  margin: 0;
  line-height: 30px;
  color: white;
}

</style>

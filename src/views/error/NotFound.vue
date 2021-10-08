<template>
  <div class="backg">
    <div class="_404">
      <div class="_404Content">
        404
      </div>
      <h2 class="m-0">抱歉，页面未找到，<span>{{countDown}}</span>s后自动跳转到
        <a @click="goHome">首页</a>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      countDown: 5,
      timer: null
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  },
  created() {
    if (!this.timer) {
      this.countDown = 5;
      this.show = false
      this.timer = setInterval(() => {
        if (this.countDown > 0 && this.countDown <= 5) {
          this.countDown--;
        } else {
          this.show = true
          clearInterval(this.timer);
          this.timer = null;
          this.$router.push('/');
        }
      }, 1000);
    }
  }
}

</script>

<style>
.m-0 {
  margin: 0;
  padding: 0;
}

._404 {
  text-align: center;
}

._404 a {
  color: #010101;
}

._404Content {
  font-size: 300px;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
}

._404 a:hover {
  color: skyblue;
}


</style>

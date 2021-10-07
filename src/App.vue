<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import {L2Dwidget} from 'live2d-widget';

export default {
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return{
      isRouterAlive: true                    //控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
  },
  mounted() {
    var _this = this;
    window.onresize = function(){ // 定义窗口大小变更通知事件
      _this.$store.state.screenWidth = document.documentElement.clientWidth; //窗口宽度
      _this.$store.state.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
  },
}
</script>

<style>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

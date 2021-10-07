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
    /*看板娘初始化
      参数说明
      model 模型的配置
         json 文件资源路径，可以支持网络路径，此处使用的是相对路径
         scale 模型缩放系数
      display 模型布局
         position 位置
         width 宽度
         height 高度
         hOffset 水平偏移量
         vOffset 垂直偏移量
      mobile 移动端配置
         show 显示/隐藏
         scale 缩放比例
      react 模型矩形框样式
         opacity 透明度
         opacityDefault 默认透明度
         opacityOnHover 鼠标悬浮透明度
      */
    setTimeout(function () {
      L2Dwidget.init({
        model: {
          // jsonPath: 'https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/L2Dwidget/live2d-widget-model-haruto/assets/haruto.model.json',
          // jsonPath: 'https://cdn.jsdelivr.net/gh/Geng233/wangsr-image-bucket/L2Dwidget/live2d-widget-model-gf/assets/Gantzert_Felixander.model.json',
          jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json',
        },
        //display: { position: 'right', width: 200, height: 400 },  //调整大小,和位置
        // mobile: { show: true },   //要不要盯着你的鼠标看
        // log: false,
      });
      //https://github.com/mAAdhaTTah/babel-plugin-prismjs
      //通过上述提示修改.babelrc文件
      //theme --- dafault dark dunky okaidia twilight coy solarizedlight tomorrownight
      Prism.highlightAll();
    },3000);
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

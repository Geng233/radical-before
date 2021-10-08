<template>
  <div id="qrcode" />
</template>
<script>
import QRCode from 'qrcodejs2'

export default {
// eslint-disable-next-line vue/no-unused-components
// components: { },
  data: function() {
    return {
      temp: {
        qrcode: undefined
      }
    }
  },
  created() {
    this.$nextTick(function() {
      this.qrCode('https://blog.csdn.net/qq_45846359/article/details/113646405');
    })
  },
  methods: {
// 生成二维码
    qrCode(url) {
      let qrcode = new QRCode('qrcode', {
        width: 150, //图像宽度
        height: 150, //图像高度
        colorDark : "#000000", //前景色
        colorLight : "#ffffff", //背景色        typeNumber:4,         correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
      qrcode.clear() //清除二维码
      qrcode.makeCode(url) //生成另一个新的二维码
    }
  }
}
</script>

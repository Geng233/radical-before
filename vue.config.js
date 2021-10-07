module.exports = {
  // https://www.jianshu.com/p/b358a91bdf2d  这个博客很清楚说明了
  // 基本路径 部署应用包时的基本 URL 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径
  publicPath: "",
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    open: process.platform === 'darwin',
    disableHostCheck: true,
    host: 'localhost',
    port: 8070,
    https: false,
    hotOnly: false,
    before: app => {}
  },
}

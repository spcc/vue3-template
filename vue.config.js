const path = require('path')

module.exports = {
  outputDir: 'dist',
  devServer: {
    open: true,
    port: 8088,
    https: false,
    proxy: {
      '/api': {
        target: 'http://47.100.47.3/',
        changeOrigin: true
      }
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  }
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/varibles.less')
      ]
    })
}
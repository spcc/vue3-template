const path = require('path')

module.exports = {
  outputDir: 'dist',
  devServer: {
    open: true,
    port: 8088,
    https: false,
    proxy: {
      '/api': {
        target: 'http://114.55.242.22:8084',
        changeOrigin: true
      }
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    // config.resolve.alias.set('@images', resolve('src/assets')).set('@images', resolve('src/assets'))
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
function resolve(dir) {
  return path.join(__dirname, dir)
}
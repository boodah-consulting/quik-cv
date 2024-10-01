const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],
  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/\.ya?ml?$/)
      .use('yaml-loader')
      .loader('yaml-loader')
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})

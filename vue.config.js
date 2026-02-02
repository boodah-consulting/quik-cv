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
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, '/src'),
        "@recruiter": require('path').resolve(__dirname, 'src/components/Recruiter'),
        "@hiring-manager": require('path').resolve(__dirname, 'src/components/HiringManager'),
        "@engineering-manager": require('path').resolve(__dirname, 'src/components/EngineeringManager'),
        "@technical-peer": require('path').resolve(__dirname, 'src/components/TechnicalPeer'),
      }
    }
  }
})

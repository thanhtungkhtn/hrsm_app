module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
  // resolve: {
  //   extensions: ['.js', '.vue', '.json'],
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js',
  //   }
  // }
}

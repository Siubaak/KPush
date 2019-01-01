const merge = require('lodash.merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

const serverConfig = {
  entry: './src/entry.server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
}

const clientConfig = {
  entry: './src/entry.client.js',
  optimization: {
    splitChunks: {
      minChunks: Infinity
    }
  },
  plugins: [
    new VueSSRClientPlugin()
  ]
}

module.exports = {
  configureWebpack: () => TARGET_NODE ? serverConfig : clientConfig,
  chainWebpack: config => config.module.rule('vue').use('vue-loader')
    .tap(options => merge(options, { optimizeSSR: false })),
  devServer: { proxy: 'http://localhost:8081' }
}

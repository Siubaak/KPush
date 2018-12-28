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
  configureWebpack: () => TARGET_NODE ? serverConfig : clientConfig
}

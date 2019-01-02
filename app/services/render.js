
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const bundle = require('../../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync(path.resolve(__dirname, '../../public/index.html'), 'utf-8')
  .replace('<div id="app"></div>', '<!--vue-ssr-outlet-->')

const renderer = createBundleRenderer(bundle, {
  template,
  clientManifest,
  runInNewContext: false
})

module.exports = ctx => renderer.renderToString(ctx)
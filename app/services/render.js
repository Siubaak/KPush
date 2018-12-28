
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const bundle = require('../../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync(path.resolve(__dirname, '../../public/index.html'), 'utf-8')

const renderer = createBundleRenderer(bundle, { clientManifest, template })

module.exports = ctx => renderer.renderToString(ctx)
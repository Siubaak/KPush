#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const package = require('../package')

program.version(package.version)
  .option('-c, --config <string>', 'set kpush custom config')
  .option('-o, --host <string>', 'set kpush server listening host')
  .option('-p, --port <number>', 'set kpush server listening port')
  .option('-s, --smtp <string>', 'set stmp server of pushing mail')
  .option('-u, --user <string>', 'set user of pushing mail')
  .option('-w, --pass <string>', 'set password of pushing mail')
  .option('-k, --kindle <string>', 'set user of kindle received mail')
  .parse(process.argv)

let config = require('../config')
if (program.config) {
  try {
    config = require(program.config)
  } catch (err) {
    console.log("\n  error: can't load config at `%s'\n", program.config)
  }
} else {
  config.host = program.host || config.host
  config.port = program.port || config.port
  config.smtp = program.smtp || config.smtp
  config.user = program.user || config.user
  config.pass = program.pass || config.pass
  config.kindle = program.kindle || config.kindle
}
fs.writeFileSync(path.join(__dirname, '../config.json'), JSON.stringify(config))

const app = require('../app')

app.listen(config.port, config.host,
  () => app.context.log.i(`Server is listening at http://${config.host}:${config.port}`))
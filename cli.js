#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const package = require('./package')
const program = require('commander')

program.version(package.version)
  .option('-c, --config <string>', 'set kpush custom config')
  .option('-p, --port <number>', 'set kpush server listening port')
  .option('-s, --smtp <string>', 'set stmp server of pushing mail')
  .option('-u, --user <string>', 'set user of pushing mail')
  .option('-s, --pass <string>', 'set password of pushing mail')
  .option('-k, --kindle <string>', 'set user of kindle received mail')
  .parse(process.argv)

let config = require('./config')
if (program.config) {
  try {
    config = require(program.config)
  } catch (err) {
    console.log("\n  error: can't load config on `%s'\n", program.config)
  }
} else {
  config.port = program.port || config.port
  config.smtp = program.smtp || config.smtp
  config.user = program.user || config.user
  config.pass = program.pass || config.pass
  config.kindle = program.kindle || config.kindle
}
fs.writeFileSync(path.join(__dirname, './config.json'), JSON.stringify(config))

const app = require('./app')
app.listen(config.port)
console.log('KPush server is listening at ' + config.port)
const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport({
  host : config.smtp,
  secureConnection: true,
  port: 465,
  auth : {
      user : config.mail,
      pass : config.password
  }
})

module.exports = path => {
  return new Promise(resolve => {
    transporter.sendMail({
      from: config.mail,
      to: config.kindle,
      subject: 'mobi',
      attachments: [{ path }]
    }, (err, info) => resolve(err))
  })
}
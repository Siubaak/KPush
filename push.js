const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport({
  host : config.smtp,
  secureConnection: true,
  port: 465,
  auth : {
      user : config.user,
      pass : config.pass
  }
})

module.exports = path => {
  return new Promise(resolve => {
    transporter.sendMail({
      from: 'noreply  <' + config.mail + '>',
      to: config.kindle,
      subject: 'Convert',
      text: 'Pushing to kindle from ' + path,
      attachments: [{ 
        path,
        encoding: 'base64',
        contentType: 'application/x-mobipocket-ebook'
      }]
    }, (err, info) => resolve(err))
  })
}
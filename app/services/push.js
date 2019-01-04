const config = require('../../config')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host : config.smtp,
  secureConnection: true,
  port: 465,
  auth : {
    user : config.user,
    pass : config.pass
  }
})

module.exports = path => transporter.sendMail({
  from: `noreply  < ${config.user} >`,
  to: config.kindle,
  subject: 'Convert',
  text: `Pushing to kindle from ${path}`,
  attachments: [{
    path: encodeURI(path),
    encoding: 'base64',
    contentType: 'application/x-mobipocket-ebook'
  }]
})

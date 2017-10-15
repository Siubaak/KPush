const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host : 'smtp.163.com',
  secureConnection: true,
  port: 465,
  auth : {
      user : 'test',
      pass : 'test'
  }
})

module.exports = path => {
  transporter.sendMail({
    from: 'test',
    to: 'test',
    subject: 'mobi',
    attachments: [{ path }]
  }, (err, info) => { console.log(info); return err })
}
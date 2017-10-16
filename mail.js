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
  return new Promise(resolve => {
    transporter.sendMail({
      from: 'test',
      to: 'test',
      subject: 'mobi',
      attachments: [{ path }]
    }, (err, info) => {
      resolve(err)
    })
  })
  
}
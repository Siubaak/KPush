const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bsspirit@gmail.com',
        pass: 'xxxxx'
    }
})

module.exports = path => {
  transporter.sendMail({
    from: 'noreply@163.com',
    to: 'a416142313@kindle.cn',
    subject: 'mobi',
    attachments: [{ path }]
  }, (err, info) => { return err })
}
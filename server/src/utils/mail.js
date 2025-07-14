const nodemailer = require('nodemailer');
const secret = require('../utils/secret');
class MailService {
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: secret.smtp_host,
      port: secret.smtp_port,
      secure: false,
      auth: {
        user: secret.smtp_user,
        pass: secret.smtp_password
      }
    }) 
  }
  async sendMail(to,activationLink) {
    await this.transporter.sendMail({
      from:"Savitar Uzuhiko",
      to,
      subject:"Activate your account",
      text:"Activate your account",
      html:`<a href="${activationLink}">Activate your account</a>`
    })
  }
}

module.exports = new MailService()
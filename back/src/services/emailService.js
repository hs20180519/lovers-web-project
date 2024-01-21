const nodemailer = require("nodemailer");
require("dotenv").config();
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      },
    );
  }

  async sendEmail(to, subject, text) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();

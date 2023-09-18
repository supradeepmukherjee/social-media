const mailer = require('nodemailer')

exports.sendEmail = async ({ to, subject, text }) => {
    // const transporter = mailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //         user: process.env.SMTP_MAIL,
    //         pass: process.env.SMTP_PASSWORD,
    //     },
    //     service: process.env.SMTP_SERVICE,
    // })
    const transporter = mailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "86e5bac0d3f4cb", //webdevformailing
            pass: '90169f9ee21879' // webdev@mailing6
        },
    })
    const mailOptions = { from: process.env.SMTP_MAIL, to, text, subject }
    await transporter.sendMail(mailOptions)
}
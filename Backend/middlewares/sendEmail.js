const nodemailer = require('nodemailer')


exports.sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: 'fp9838948@gmail.com',
            pass: 'pluzgbnukebhgwpi'
        }
    })

    const mailOption = {
        from: 'INK <fp9838948@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOption);
}
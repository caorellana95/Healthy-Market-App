const nodemailer = require ("nodemailer");
var dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
service: "gmail",
host: "smtp.gmail.com",
secure:false,
auth: {
    user:'rociomolina.b3@gmail.com',
    pass:'muwoqhbkutpnabik',
    }
})

 async function welcomeUser (email){
    try { let info = await transporter.sendMail({
            from: 'rociomolina.b3@gmail.com',
            to:email,
            subject: "hola",
            html:"<p>usted se ha logueado correctamente</p>"
        })
        console.log(info.messageId);
        console.log('Mail service working');
    } catch (error) {
        console.log(error.message)
    }

}

module.exports = {
    welcomeUser
}
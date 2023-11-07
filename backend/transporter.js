const nodemailer = require("nodemailer");
// CONFIGURER LE .ENV
const dotenv = require("dotenv");
dotenv.config({path: './.env'})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_USER,
    },
    tls: {
		rejectUnauthorized: false
	}
});

module.exports = transporter;
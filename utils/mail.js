import nodemailer from "nodemailer";

export default function sendMail(email, name, subject, htmlMessage) {
    const token = process.env.PW;
    const user = process.env.MAIL_USER;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Cambiado a false para usar STARTTLS
        auth: {
            user: user,
            pass: token,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `Estudiatus <${user}>`,
        to: email,
        subject: subject,
        html: htmlMessage,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email enviado");
        }
    }
    );
}

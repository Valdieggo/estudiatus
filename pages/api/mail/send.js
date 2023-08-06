import nodemailer from "nodemailer";

export default async (req, res) => {
    const token = process.env.PW;
    const user = process.env.USER;
    const email = "emerson.salazar1901@alumnos.ubiobio.cl";
    const name = "Emerson";

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Cambiado a false para usar STARTTLS
            auth: {
                user: "estuadiatus@gmail.com",
                pass: token,
            },
        });

        const mailOptions = {
            from: `Estudiatus <${user}>`,
            to: email,
            subject: "Sancion",
            html: `
                <p>Estimado ${name},</p>
                <p>Haz sido baneado lo lamentamos</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email enviado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

import nodemailer from "nodemailer";
import { emailResetPassword } from "../../emails/templates.js";

const emailOlvidePassword = async (datos) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Enviar Eamail
  const { nombre, email, token } = datos;
  const info = await transporter.sendMail({
    from: `"FinTrack 💸" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Resetea tú contraseña en Fintrack",
    html: emailResetPassword({ nombre, token }),
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;

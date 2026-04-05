import nodemailer from "nodemailer";
import { emailConfirmacion } from "../../emails/templates.js";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const emailConfirmarCuenta = async (datos) => {
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
    subject: "Confirma tu cuenta en FinTrack",
    html: emailConfirmacion({ nombre, token }),
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailConfirmarCuenta;

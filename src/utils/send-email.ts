import { ISendMail } from "types/interface";
import nodemailer from "nodemailer";

const sendMail = async ({
  email,
  message,
  subject,
  messageType = "html",
}: ISendMail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: any = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
  };

  mailOptions[messageType] = message;

  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default sendMail;

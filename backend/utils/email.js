// backend/utils/email.js
import nodemailer from "nodemailer";

export async function sendNotificationEmail({ to, subject, text, html }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_HOST) {
    throw new Error("Email config missing (EMAIL_HOST / EMAIL_USER / EMAIL_PASS)");
  }

  const port = Number(process.env.EMAIL_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure: port === 465, // true for 465, false for 587/other
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return info;
}

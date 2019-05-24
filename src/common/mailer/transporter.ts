import * as NodeMailer from 'nodemailer';
import { TypedEnv } from '../env/constant';
import { rejects } from "assert";

const transporter = NodeMailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TODO: upgrade later
    auth: {
      user: TypedEnv.CONFIRM_EMAIL_ACCOUNT,
      pass: TypedEnv.CONFIRM_EMAIL_PASSWORD,
    },
  },
);

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(mailOptions: MailOptions) {
  try {
    return await transporter.sendMail(mailOptions);
  }
  catch (e){
    return rejects(e);
  }
}
import { MailAdapter, SendMailData } from "../mail_adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "92e44927bc6ad4",
    pass: "26a80be473ad66",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Rodrigo Castañon <rodrigo.castanon.carvalho@gmail.com>",
      subject,
      html: body,
    });
  }
}

// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendEmail({
    to,
    subject,
    text,
    html,
    attachments = [],
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
    attachments?: { filename: string; path: string }[];
  }) {
    // Configure the transporter with Gmail service and credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "m.ametwally15@gmail.com", // Gmail account email
        pass: "jqubhqjeatmprplt" // Gmail account password
      },
    });

    // Define email options
    const mailOptions = {
      from: `"Mohamed" <${"m.ametwally15@gmail.com"}>`, // sender address
      to,
      subject,
      text,
      html,
      attachments,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(info);

    if (info.rejected.length) {
      throw new Error('Rejected Email');
    }

    return { message: 'Email sent successfully!' };
  }
}

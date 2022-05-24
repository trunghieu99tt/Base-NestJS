import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_MAIL_REFRESH_TOKEN,
  GOOGLE_SECRET,
  MAILER_EMAIL_ID,
} from 'src/common/config/env';
import Mail = require('nodemailer/lib/mailer');
import SMTPTransport = require('nodemailer/lib/smtp-transport');

@Injectable()
class Mailer {
  private readonly logger = new Logger('Mailer');
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: MAILER_EMAIL_ID,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_MAIL_REFRESH_TOKEN,
      },
    });

    this.transporter.on('token', (token) => {
      console.log('A new access token was generated');
      console.log('User: %s', token.user);
      console.log('Access Token: %s', token.accessToken);
      console.log('Expires: %s', new Date(token.expires));
    });
  }

  async sendMail(
    receiver: string,
    subject: string,
    text: string,
    senderName = 'Store Support',
  ): Promise<any> {
    const mailOptions: Mail.Options = {
      from: `"${senderName}" ${MAILER_EMAIL_ID}`,
      to: receiver,
      subject,
      html: text,
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        mailOptions,
        (err: Error, info: SMTPTransport.SentMessageInfo) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            this.logger.verbose(`Message sent: ${info.messageId}`);
            this.logger.verbose(
              `Preview URL: ${nodemailer.getTestMessageUrl(info)}`,
            );
            resolve(info);
          }
        },
      );
    });
  }

  async sendMails(
    receivers: string[],
    subject: string,
    text: string,
  ): Promise<void> {
    const mailOptions: Mail.Options = {
      from: MAILER_EMAIL_ID,
      bcc: receivers,
      subject,
      html: text,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        mailOptions,
        (err: Error, info: SMTPTransport.SentMessageInfo) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            this.logger.verbose(`Message sent: ${info.messageId}`);
            this.logger.verbose(
              `Preview URL: ${nodemailer.getTestMessageUrl(info)}`,
            );
            resolve();
          }
        },
      );
    });
  }
}

export const SMTPMailer = new Mailer();

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  GOOGLE_EMAIL_SERVICE_ACCOUNT_KEY,
  MAILER_EMAIL_ID,
} from 'src/common/config/env';
import Mail = require('nodemailer/lib/mailer');
import SMTPTransport = require('nodemailer/lib/smtp-transport');

/**
 * !! Deprecated !!
 */
@Injectable()
export class MailerService {
  private readonly logger = new Logger('Mailer');
  private readonly accessToken: string | null = null;
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: MAILER_EMAIL_ID,
        serviceClient: '113702201297823103657',
        privateKey: GOOGLE_EMAIL_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'),
      },
    });
    this.transporter.set(
      'oauth2_provision_cb',
      (user: any, renew: any, callback) => {
        const accessToken = this.accessToken;
        console.log('accessToken', accessToken);
        if (accessToken) {
          return callback(null, accessToken);
        }
        return callback(new Error('Not configured'));
      },
    );
  }

  sendMail(
    receiver: string,
    subject: string,
    text: string,
    senderName = 'Store Support',
  ): void {
    const mailOptions: Mail.Options = {
      from: `"${senderName}" ${MAILER_EMAIL_ID}`,
      to: receiver,
      subject,
      html: text,
    };
    this.transporter.sendMail(
      mailOptions,
      (err: Error, info: SMTPTransport.SentMessageInfo) => {
        if (err) {
          console.error(err);
        } else {
          this.logger.verbose(`Message sent: ${info.messageId}`);
          this.logger.verbose(
            `Preview URL: ${nodemailer.getTestMessageUrl(info)}`,
          );
        }
      },
    );
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
    const info = (await this.transporter.sendMail(
      mailOptions,
    )) as SMTPTransport.SentMessageInfo;
    this.logger.verbose(`Message sent: ${info.messageId}`);
    this.logger.verbose(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
}

export const SMTPMailer = new MailerService();

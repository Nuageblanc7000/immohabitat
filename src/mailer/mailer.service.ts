import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { UserDTO } from 'src/users/dto/user.dto';
import { join } from 'path';
import { readFileSync } from 'fs';
import hbs from 'handlebars';
@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}
  async transporter() {
    // const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport(
      {
        host: this.configService.get('M_HOST'),
        port: this.configService.get('M_PORT'),
        auth: {
          user: this.configService.get('M_USER'),
          pass: this.configService.get('M_PASS'),
        },
      },
      {
        from: this.configService.get('M_FROM'),
      },
    );
  }

  async sendMail(user: UserDTO, context: object = {}, subject: string) {
    const templateFile = join(
      __dirname,
      '..',
      'mail/templates',
      'email.verifyUser.hbs',
    );
    const template = hbs.compile(readFileSync(templateFile, 'utf8'));

    const info = (await this.transporter()).sendMail({
      to: user.email,
      subject: subject,
      html: template(context),
    });
  }
}

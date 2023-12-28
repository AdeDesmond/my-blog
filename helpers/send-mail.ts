import nodemailer from "nodemailer";

const MAILER_USER = process.env.NODEMAIL_TRANSPORT_USER;
const MAILER_PASS = process.env.NODEMAIL_TRANSPORT_PASS;

if (!MAILER_USER || !MAILER_PASS) {
  console.log("wrong credentials");
}

export async function sendEmail(name: string, email: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILER_USER,
        pass: MAILER_PASS,
      },
    });
    const mailOptions = {
      from: email,
      to: "my-blog@email.com",
      subject: `Contact email from ${name} `,
      message: `<p> ${message} </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (errors) {
    if (errors instanceof Error) {
      return;
    } else {
      return;
    }
  }
}

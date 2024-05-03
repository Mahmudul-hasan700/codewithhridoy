import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      // Configure your email transport options (e.g., SMTP, SendGrid, Mailgun)
      // See https://nodemailer.com/smtp/ for examples
      service: 'gmail',
      auth: {
        user: "<try.mahmudulhasan@gmail.com>",
        pass: "try.mahmudulhasan@{7610706}.m-sender-sib.com",
      },
    });

    await transporter.sendMail({
      from: "<try.mahmudulhasan@gmail.com>",
      to,
      subject,
      text,
    });

    console.log('Email sent');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export default sendEmail; 
import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "mhhridoy7462@gmail.com",
        pass: "vtct vfyg xpum xztm",
      },
    });

    await transporter.sendMail({
      from: "mhhridoy7462@gmail.com",
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
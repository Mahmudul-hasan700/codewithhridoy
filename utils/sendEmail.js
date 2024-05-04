import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
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
      html,
    });

    console.log('Email sent');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export default sendEmail; 
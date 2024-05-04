import dbConnect from '@/utils/dbconnect';
import User from '@/models/User';
import sendEmail from '@/utils/sendEmail';
import crypto from 'crypto';

dbConnect();

export default async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Save the reset token and its expiration date to the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    // Create the email template
    const resetUrl = `${req.headers.origin}/reset-password?token=${resetToken}`;
    const emailContent = `
      <p>Hello ${user.name},</p>
      <p>We received a request to reset your password.</p>
      <p>To reset your password, please click the following link:</p>
      <a href="${resetUrl}" style="background-color:#4CAF50;border:none;color:white;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px 2px;cursor:pointer;border-radius:10px;">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>Thanks,<br/>Codewithhridoy</p>
    `;

    // Send the reset email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: emailContent,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error sending password reset email:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
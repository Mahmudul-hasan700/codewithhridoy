// pages/api/reset-password.js

import dbConnect from '@/utils/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

dbConnect();

export default async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Find the user's original password before updating
    const originalUser = await User.findById(user._id);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and remove the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Replace the updated password with the original password
    originalUser.password = user.password;

    await originalUser.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
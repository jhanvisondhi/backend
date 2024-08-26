import express from 'express';
import nodemailer from 'nodemailer'; // Ensure this module is installed
import { Request, Response } from 'express';

const router = express.Router();
const otpStore: Record<string, string> = {}; // Example OTP store

// Send OTP
router.post('/send-otp', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Generate OTP and send via email
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Set password
router.post('/set-password', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Handle password setting logic

  res.status(200).json({ message: 'Password set' });
});

// Verify OTP
router.post('/verify-otp', (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  if (otpStore[email] === otp) {
    delete otpStore[email]; // OTP is used, so remove it
    res.status(200).json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

export default router;

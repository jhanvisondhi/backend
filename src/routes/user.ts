import express, { Request, Response } from 'express'; // Import Request and Response
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.get('/profile', async (req: Request, res: Response) => { // Use correct types
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as { id: string }; // Type assertion
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch {
    res.status(401).send('Unauthorized');
  }
});

export default router;

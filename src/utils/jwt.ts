import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as { id: string; role: string };
};
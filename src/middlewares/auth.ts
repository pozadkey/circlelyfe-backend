import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { verifyToken } from '../utils/verify_token';

const JWT_SECRET = process.env.JWT_SECRET;

const prisma = new PrismaClient();

type AuthRequest = Request & { user?: User };

// Authentication middleware
export const  authToken =  async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get authentication token from the request header
  const authHeader = req.headers['authorization'];
  const jwtToken = authHeader?.split(' ')[1];

  // Check if jwtToken exists or is valid
  if (!jwtToken) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    // Verify jwt Toen
    const payload = verifyToken(jwtToken, JWT_SECRET as string);

    if (!payload)  return res.sendStatus(401); // Unauthorized 

    const dbToken = await prisma.token.findUnique({
      where: { id: payload.tokenId },
      include: { user: true },
    });

    // Check if the token valid or not expired
    if (!dbToken || !dbToken.valid || dbToken.expiration < new Date())
    return res.status(401).json({ error: 'API token expired or invalid' });
 
    req.user = dbToken.user;
    next();
  } catch (error) {
    return res.sendStatus(401); // Unauthorized
  }
}



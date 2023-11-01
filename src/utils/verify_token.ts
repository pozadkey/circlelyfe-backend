import jwt  from 'jsonwebtoken';

interface TokenPayload {
    tokenId: number;
  }  
// Function to verify the token
export const verifyToken = (token: string, secretKey: string): TokenPayload | null => {
    try {
      const verifiedToken = jwt.verify(token, secretKey) as TokenPayload;
      return verifiedToken;
    } catch (error) {
      return null; // Verification failed
    }
  }
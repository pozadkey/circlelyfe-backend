import { PrismaClient } from '@prisma/client';
import { generateAuthToken, generateEmailToken } from '../../utils/generate_token';

const prisma = new PrismaClient();

// Email  token expiration time
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;

// Auth expiration time
const AUTHENTICATION_EXPIRATION_HOURS = 12;

const JWT_SECRET = process.env.JWT_SECRET;

// Create user, if it  doesn't exist
// Generate emailToken and send to user's email
export const loginUser = async (data: { email: string}) => {
    const { email } = data;

    // Generate token
    const emailToken = generateEmailToken();

    // Expiry date
    const expiration = new Date(
        new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
      );

    // Create token
    const createdToken = await prisma.token.create({
        data: {
          type: 'EMAIL',
          emailToken,
          expiration,
          user: {
            connectOrCreate: {
              where: { email },
              create: { email },
            },
          },
        },
      });

      console.log(createdToken);

      return createdToken;
};

// Verify user
export const verifyUser = async (data: {
    email: string,
    emailToken: string
}) => {
    const { email, emailToken } = data; //

    const dbEmailToken = await prisma.token.findUnique({
        where: {
          emailToken,
        },
        include: {
          user: true,
        },
      });
    
      // Check if  the token exists or is valid
      if (!dbEmailToken || !dbEmailToken.valid) throw Error('Verification failed.');

      // Check if the token is expired
      if (dbEmailToken.expiration < new Date()) throw Error('Token expired.');

      // Validate that the user owns the email
      if (dbEmailToken?.user?.email !== email)  throw Error('Verification failed.');
    
      // Generate an API token
      const expiration = new Date(
        new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
      );
      const apiToken = await prisma.token.create({
        data: {
          type: 'API',
          expiration,
          user: {
            connect: {
              email,
            },
          },
        },
      });
    
      // Invalidate the email
      await prisma.token.update({
        where: { id: dbEmailToken.id },
        data: { valid: false },
      });
    
      // Generate the JWT token
      const authToken = generateAuthToken(apiToken.id, JWT_SECRET as string);

      return apiToken;
  
};
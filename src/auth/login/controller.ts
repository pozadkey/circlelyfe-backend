import { PrismaClient } from '@prisma/client';
import { generateAuthToken, generateEmailToken } from '../../utils/generate_token';
import { sendEmail } from '../../utils/send_email';

const prisma = new PrismaClient();

// Email  token expiration time
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;

// Auth expiration time
const AUTHENTICATION_EXPIRATION_HOURS = 12;

const JWT_SECRET = process.env.JWT_SECRET;

// Create user, if it  doesn't exist
// Generate emailToken and send to user's email
export const loginUser = async (data: { email: string }) => {
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
      
      // Email variable
      const authEmail = process.env.AUTH_EMAIL;

      // Check if  if authEmail is not undefined
      if (authEmail){
        const emailOptions = {
          from: authEmail,
          to: email,
          subject: 'Please verify your email',
          html: `<h3> Verify your account </h3><p>Verification code: <b>${ createdToken.emailToken }</b></p><p>(This code is valid for 10 minutes>)</p>`
        };

        // Send emailToken to the user
        try {
          sendEmail(emailOptions);
          console.log('Email sent successfully.');
        } catch (error: any) {
          throw(`Unable to send code: ${error.message}`);
        }
      } else {
        throw Error(`Unable to send code`);
      }

      return createdToken;
};

// Verify user
export const verifyUser = async (data: {
    email: string,
    emailToken: string
}) => {
    const { email, emailToken } = data; 

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
     const authToken = await generateAuthToken(apiToken.id, JWT_SECRET as string);
     
     return authToken;

};


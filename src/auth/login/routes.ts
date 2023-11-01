import { Router, Request, Response } from 'express';
import { loginUser, logoutUser, verifyUser } from './controller';

const loginRouter: Router = Router();

// Create user, if it  doesn't exist
// Generate emailToken and send to user's email
loginRouter.post('/login', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

    await  loginUser({
        email
      })

      res.status(201).json({
        message: `A verification code has been sent to ${email}. Check your inbox.`
    });

    } catch (error: any ) {
      res.status(400).json({
        error: error.message
    });
    }
  });

  // Verify User
  loginRouter.post('/verify', async (req: Request, res: Response) => {
    try {
      const { email, emailToken } = req.body;

      const verifiedUser = await verifyUser({
        email,
        emailToken
      })

      res.status(201).json({
        message: `Welcome Circlelyfe`,
        token: verifiedUser
    });

    } catch (error: any) {
        res.status(400).json({
          error: error.message
        });
    }
  });

    // Logout User
    loginRouter.post('/logout', async (req: Request, res: Response) => {
      try {
        const { authToken } = req.body;
  
        const loggedOutUser = await logoutUser({
          authToken
        })
  
        res.status(201).json({
          message: 'Logged out successfully.' 
      });
  
      } catch (error: any) {
          res.status(400).json({
            error: error.message
          });
      }
    });


  export default loginRouter;
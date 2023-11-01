import { Router, Request, Response } from 'express';
import { loginUser, verifyUser } from './controller';

const loginRouter: Router = Router();

// Create user, if it  doesn't exist
// Generate emailToken and send to user's email
loginRouter.post('/', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

    await  loginUser({
        email
      })

      res.sendStatus(200);

    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  
  loginRouter.post('/verify', async (req: Request, res: Response) => {
    try {
      const { email, emailToken } = req.body;

      const verifiedUser = await verifyUser({
        email,
        emailToken
      })

      res.json(verifiedUser); 

    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
  });


  export default loginRouter;
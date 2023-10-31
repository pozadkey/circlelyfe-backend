// userRoutes.ts
import { Router, Request, Response } from 'express';
import { getUser, getUserById } from './controller';

const userRouter: Router = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = await getUserById({id : Number(id) });
    res.json(userId);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


export default userRouter;

import { Router, Request, Response } from 'express';
import { createUser, deleteUser, editUser, getUser, getUserById } from './controller';

const userRouter: Router = Router();

// Get all users
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get a single user
userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById({id : Number(id) });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Create a new user
userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email, name, username, bio = 'Hey there' } = req.body;
    const newUser = await createUser({
      email, 
      name,
      username,
      bio
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Username and email should be unique' });
  }
});

// Edit user
userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bio, name, image } = req.body;

    const editedUser = await editUser(
      { id: Number(id) },
      {
        bio,
        name,
        image,
    });

    res.json(editedUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// Delete user
userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
     await deleteUser({id : Number(id) });
    res.status(202).json({
      message: `User deleted.`,
   });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

export default userRouter;

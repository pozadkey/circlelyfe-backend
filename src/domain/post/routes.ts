import { Router, Request, Response } from 'express';
import {createPost, deletePost, getPost, getPostById} from './controller';

const postRouter: Router = Router();

// Get all users
postRouter.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await getPost();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Create new post
postRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { content, image } = req.body; // Get post data from the user
     // @ts-ignore
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const newPost = await createPost({
      content,
      image,
      userId: user.id, // Use user.id to specify the user for the post
    });

    res.json(newPost); // Return data in JSON
  } catch (error) {
    res.status(400).json({ error: 'Unable to create post' });
  }
});

// Get a single post
postRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getPostById({id : Number(id) });
    if(!post) return res.status(404).json({ error: 'Post not found!' })
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete user
postRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
     await deletePost({id : Number(id) });
    res.status(202).json({
      message: `Post deleted.`,
   });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});


export default postRouter;
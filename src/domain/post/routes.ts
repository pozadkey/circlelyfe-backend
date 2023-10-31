import { Router, Request, Response } from 'express';
import {createPost, getPost, getPostById} from './controller';

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
    const {content, image, userId } = req.body; // Get post data from user
    const newPost = await createPost({
      content, 
      image,
      userId,
    });
    res.json(newPost); // Return data in json
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



export default postRouter;
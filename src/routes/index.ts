import { Request, Response, Router } from 'express';
import userRouter from '../domains/user/routes';
import postRouter from '../domains/post/routes';
import authRouter from '../auth/login/routes';
import { authToken } from '../middlewares/auth';
const router: Router = Router();

// Routes
router.use('/user', authToken, userRouter);
router.use('/post', authToken, postRouter);

// Auth Routes
router.use('/', authRouter);

// HomePage
router.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: `This is the homepage`
        });
    } catch (error) {
        res.status(500).json({
            message: `Error connecting to page.`
        });
    }
});

// Handle unknown routes.
router.get('*', (req: Request, res: Response) => {
    res.status(404).json({
        message: `This page does not exist.`
    });
});

export default router;

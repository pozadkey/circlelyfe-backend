import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

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

// Import express
import express from 'express';

//Port
const port = process.env.PORT || 5000;

// start express
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
import routes from './routes';

// Routes
app.use(routes);

// Run the server
const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error}`);
    }
}

startServer();

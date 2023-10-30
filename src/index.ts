import express from 'express';

//Port
const port = process.env.PORT || 5000;

import routes from './routes';

// start express
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Runt the server
const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
            
        } )
    } catch(error) {
        console.error(`Error starting server ${error}`);
    }
}

startServer();

//Routes
app.use(routes);


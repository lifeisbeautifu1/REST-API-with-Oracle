import express from 'express'

import 'colors'
import 'express-async-errors'

import { connectDB } from './db/connectDB';
import errorHandler from './middleware/errorHandler';
import studentsRouter from './routes/students'


const app = express()

const PORT = process.env.PORT || 5000;


app.use(express.json())

app.use('/api/students', studentsRouter)


app.use(errorHandler)

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`.green.bold);
        });

    } catch (error) {
        console.log(error)
    }
}

start();


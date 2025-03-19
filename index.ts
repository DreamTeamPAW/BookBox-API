import express from 'express';
const { Request, Response } = express;

import swaggerUi from "swagger-ui-express";
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const swaggerOutput = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger_output.json'), 'utf-8'));


import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.ts';
import cors from 'cors';

import userRoutes from './routes/userRoutes.ts';
import bookRoutes from './routes/bookRoutes.ts';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is working");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API documentation is available at url:${port}/api-docs`);
});

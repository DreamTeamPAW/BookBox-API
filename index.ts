import express from 'express';
const { Request, Response } = express;

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig.ts'; 

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.ts';
import cors from 'cors';

import userRoutes from './routes/userRoutes.ts';
import bookRoutes from './routes/bookRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app = express();
const port = process.env.PORT || 3000;

connectDB();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation is available at http://localhost:${port}/api-docs`);
});

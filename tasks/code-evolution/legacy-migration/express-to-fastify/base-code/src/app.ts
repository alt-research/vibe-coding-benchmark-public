import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/users.js';
import { itemRouter } from './routes/items.js';
import { authMiddleware } from './middleware/auth.js';
import { errorHandler } from './middleware/error.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.use('/api/users', userRouter);
app.use('/api/items', authMiddleware, itemRouter);

app.use(errorHandler);

export { app };

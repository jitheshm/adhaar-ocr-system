import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ocrRouter from './routes/ocr';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use('/api', ocrRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

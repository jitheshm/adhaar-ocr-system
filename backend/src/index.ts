import express from 'express';
import ocrRouter from './routes/ocr';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', ocrRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

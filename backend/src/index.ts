import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ocrRouter from './routes/ocr';
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;

const userBuildPath = path.join(__dirname, '../../frontend/dist');

app.use(express.json());
app.use(cors())
app.use('/', express.static(userBuildPath));

app.use('/api', ocrRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });

});

app.get("/*", function (req, res) {

  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

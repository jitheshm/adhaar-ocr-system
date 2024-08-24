import { Router } from 'express';
import multer from 'multer';
import ocrController from '../controllers/ocrController';


const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/ocr', upload.array('images', 2), ocrController);

export default router;

import { Request, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';
import ocrController from '../controllers/ocrController';
const path = require('path');


const router = Router();
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG files are allowed.'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/ocr', upload.array('images', 2), ocrController);

export default router;

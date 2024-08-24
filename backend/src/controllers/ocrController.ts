import { Request, Response } from "express";
import Tesseract from 'tesseract.js';
import cleanText from "../utils/cleanText";
import preprocessImage from "../utils/preprocessImage";
import extractDetails from "../utils/extractDetails";

export default async (req: Request, res: Response) => {
    if (!req.files || (req.files as Express.Multer.File[]).length !== 2) {
        return res.status(400).send('Two files are required.');
    }

    try {
        const files = req.files as Express.Multer.File[];

        const processedBuffers = await Promise.all(files.map(file =>
            preprocessImage(file.buffer)
        ));

        const ocrResults = await Promise.all(processedBuffers.map(buffer =>
            Tesseract.recognize(buffer, 'eng', {
                logger: (m) => console.log(m), // Log progress
            }).then(({ data: { text } }) => text)
        ));

        const cleanedTexts = ocrResults.map(text => cleanText(text));
        const extractData = extractDetails(cleanedTexts)

        res.status(200).json({ status: true, data: extractData, message: "Parsing Successfull" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing images.');
    }
}
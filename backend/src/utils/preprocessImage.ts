import sharp from "sharp";

export default async (inputBuffer: Buffer): Promise<Buffer> => {
    return sharp(inputBuffer)
      .resize(2000)  
      .grayscale()              
      .normalize()
      .median(3)              
    //   .threshold(100)           
      .toBuffer();
  };
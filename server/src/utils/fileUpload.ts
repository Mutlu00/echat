import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
const cloudinary = require('cloudinary').v2;

type CloudinaryUploadResult = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  url: URL;
  secure_url: URL;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const fileUpload = async (file: FileUpload) => {
  const { createReadStream, filename } = await file;

  const filePath = `${__dirname}/../../images/${filename}`;

  const writableStream = createWriteStream(filePath, { autoClose: true });
  const createdFile = new Promise((res, rej) => {
    createReadStream()
      .pipe(writableStream)
      .on('finish', () => res(true))
      .on('error', () => rej(false));
  });

  try {
    await createdFile;
    cloudinary.uploader.upload(
      filePath,
      (error: any, result: CloudinaryUploadResult) => {
        console.log(result, error);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

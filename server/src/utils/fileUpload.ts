import fs from 'fs';
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
  url: string;
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const fileUpload = async (file: FileUpload) => {
  const { createReadStream, filename } = await file;

  const filePath = `${__dirname}/../../files`;

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  const writableStream = fs.createWriteStream(`${filePath}/${filename}`, {
    autoClose: true,
  });
  const createdFile = new Promise((res, rej) => {
    createReadStream()
      .pipe(writableStream)
      .on('finish', () => res(true))
      .on('error', () => rej(false));
  });

  let link = '';
  try {
    await createdFile;
    await cloudinary.uploader.upload(
      `${filePath}/${filename}`,
      (error: any, result: CloudinaryUploadResult) => {
        if (error) {
          console.log(error);
          return;
        }
        link = result.secure_url;
      }
    );
  } catch (error) {
    console.log(error);
  }

  return link;
};

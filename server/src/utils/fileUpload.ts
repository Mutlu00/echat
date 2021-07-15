import { createWriteStream } from "fs";
import { FileUpload } from "graphql-upload";

export const fileUpload = async(file: FileUpload) => {
  const { createReadStream, filename } = await file;
  const writableStream = createWriteStream(
    `${__dirname}/../../images/${filename}`,
    { autoClose: true }
  );
  return new Promise((res, rej) => {
    createReadStream()
      .pipe(writableStream)
      .on('finish', () => res(true))
      .on('error', () => rej(false));
  });
} 
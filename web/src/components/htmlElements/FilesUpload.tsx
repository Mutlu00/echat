import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon } from '@heroicons/react/outline';

type FileUploadProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  files: [File] | null;
};

export const FilesUpload: React.FC<FileUploadProps> = ({
  setFieldValue,
  files,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFieldValue('files', acceptedFiles);
    },
  });
  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <label className='block text-sm font-medium text-gray-700'>
        Cover photo
      </label>

      <div
        {...getRootProps()}
        className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'
      >
        <div className='space-y-1 text-center'>
          <PhotographIcon
            className='h-6 w-6 m-auto text-gray-700'
            aria-hidden='true'
          />
          <div className='flex text-sm text-gray-600'>
            <label
              htmlFor='file-upload'
              className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </label>
          </div>
          <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {files &&
        files.map((file, i) => (
          <li key={i}>
            {`File:${file.name} Type:${file.type} Size:${file.size} bytes`}{' '}
          </li>
        ))}
    </div>
  );
};

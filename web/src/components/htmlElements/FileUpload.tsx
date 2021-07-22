import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon } from '@heroicons/react/outline';
import {
  useDeleteImageMutation,
  useSingleUploadMutation,
  useUserImagesQuery,
} from '../../generated/graphql';
import { isServer } from '../../utils/helpers/isServer';
import { ProgressBar } from '../utils';

export const FileUpload: React.FC = ({}) => {
  const [progress, setProgress] = useState<number>(0);

  const { data, loading, refetch } = useUserImagesQuery({
    skip: isServer(),
    variables: { type: 'secondary' },
  });

  const [singleUpload] = useSingleUploadMutation();
  const [deleteImage] = useDeleteImageMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: async (files) => {
      await singleUpload({
        variables: { file: files[0], type: 'secondary' },
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev: ProgressEvent) => {
              setProgress(Math.floor((100 * ev.loaded) / ev.total));
            },
            onAbortPossible: (_: any) => {},
          },
        },
      })
      refetch();
      setProgress(0);
    },
  });

  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <label className='block text-sm font-medium text-gray-700'>
        File Upload
      </label>

      <div
        {...getRootProps()}
        className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'
      >
        {progress ? (
          <ProgressBar progress={progress} />
        ) : (
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
        )}
      </div>
      <div className='flex flex-wrap'>
        {!loading &&
          data?.userImages?.map((image) => (
            <div key={image.url} className='relative'>
              <img className='' src={image.url} alt='dummy-image' />
              <button
                type='button'
                className='absolute top-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2'
                onClick={async () => {
                  await deleteImage({
                    variables: { publicId: image.publicId },
                  });
                  refetch();
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

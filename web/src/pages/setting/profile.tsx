import { Form, Formik } from 'formik';
import React, { useState, useCallback } from 'react';
import { ButtonField } from '../../components/htmlElements/ButtonField';
import { InputField } from '../../components/htmlElements/InputField';
import { useDropzone } from 'react-dropzone';

import { Wrapper } from '../../components/Wrapper';
import {
  useForgotPasswordMutation,
  useMultipleUploadMutation,
  useSingleUploadMutation,
} from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import { FilesUpload } from '../../components/htmlElements/FilesUpload';

const Profile: React.FC = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const [singleUpload] = useSingleUploadMutation();
  const [multipleUpload] = useMultipleUploadMutation();

  // const onDrop = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   singleUpload({ variables: { file } });
  // }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles;
    console.log(files);
    multipleUpload({ variables: { files } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Wrapper navbar>
      <Formik
        initialValues={{
          files: null,
        }}
        onSubmit={async ({files}, { setErrors }) => {
          // console.log(files)
          multipleUpload({ variables: { files } });
        }}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form>
            <FilesUpload setFieldValue={setFieldValue} files={values.files}/>
            <ButtonField text='send' type='submit' loading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Profile);

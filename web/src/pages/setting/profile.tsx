import { Form, Formik } from 'formik';
import React from 'react';
import {
  ButtonField,
  FileUpload,
  FilesUpload,
} from '../../components/htmlElements/';
import { Wrapper } from '../../components/Wrapper';
import { withApollo } from '../../utils/apollo/withApollo';

const Profile: React.FC = ({}) => {
  return (
    <Wrapper navbar>
      <Formik
        initialValues={{
          files: null,
        }}
        onSubmit={async ({ files }, { setErrors }) => {
          // await multipleUpload({ variables: { files, type: 'secondary' } });
        }}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form>
            <FileUpload />
            <FilesUpload />

            <ButtonField text='send' type='submit' loading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Profile);

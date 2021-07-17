import { Form, Formik } from 'formik';
import React from 'react';
import { ButtonField } from '../../components/htmlElements/ButtonField';
import { FilesUpload } from '../../components/htmlElements/FilesUpload';
import { Wrapper } from '../../components/Wrapper';
import { useMultipleUploadMutation } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

const Profile: React.FC = ({}) => {
  const [multipleUpload] = useMultipleUploadMutation();

  return (
    <Wrapper navbar>
      <Formik
        initialValues={{
          files: null,
        }}
        onSubmit={async ({ files }, { setErrors }) => {
          multipleUpload({ variables: { files } });
        }}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form>
            <FilesUpload setFieldValue={setFieldValue} files={values.files} />
            <ButtonField text='send' type='submit' loading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Profile);

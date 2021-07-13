import { Wrapper } from '../components/Wrapper';
import { withApollo } from '../utils/withApollo';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/input/InputField';
import { Loading } from '../components/utils/Loading';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper navbar>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Reset your Password
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={async ({ email }, { setErrors }) => {
              await forgotPassword({ variables: { email } });
              setComplete(true);
            }}
          >
            {({ values, handleChange, isSubmitting }) =>
              complete ? (
                <div>
                  if an account with that email exists, we sent you can email
                </div>
              ) : (
                <Form className='space-y-6'>
                  <InputField
                    name='email'
                    placeholder='email'
                    type='email'
                    label='Email'
                  />
                  {isSubmitting ? (
                    <Loading />
                  ) : (
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Forgot Password
                    </button>
                  )}
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);

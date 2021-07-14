import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from '../components/htmlElements/InputField';
import { ButtonField } from '../components/htmlElements/ButtonField';
import { Loading } from '../components/utils/Loading';
import { Wrapper } from '../components/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper navbar>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Register your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { options: values },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.register.user,
                    },
                  });
                },
              });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                router.push('/');
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form className='space-y-6'>
                <InputField
                  name='username'
                  placeholder='username'
                  label='Username'
                />
                <InputField
                  name='email'
                  placeholder='email'
                  label='Email'
                  type='email'
                />
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                />
                <ButtonField
                  loading={isSubmitting}
                  text='Login'
                  type='submit'
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);

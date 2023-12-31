import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Placeholder backend validation functions
const checkUsernameExists = async (username) => {
  // Replace this with your actual API call to check if the username exists
  return true;
};

const isPasswordValid = async (username, password) => {
  // Replace this with your actual API call to validate the password
  return true;
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Required')
    .test(
      'checkUsername',
      'Username does not exist',
      async (value) => await checkUsernameExists(value)
    ),
  password: Yup.string()
    .required('Required')
    .test(
      'checkPassword',
      'Invalid password',
      async (password, { parent }) => await isPasswordValid(parent.username, password)
    ),
});

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="username" className="block">
              Username
              {errors.username && touched.username && (
                <span className="label-text-alt pl-8 text-red-500"> - {errors.username}</span>
              )}
            </label>
            <Field
              name="username"
              type="text"
              className={`mt-1 block w-full ${errors.username && touched.username ? 'outline-red-500' : 'outline-green-500'}`}
            />
          </div>

          <div>
            <label htmlFor="password" className="block">
              Password
              {errors.password && touched.password && (
                <span className="label-text-alt pl-8 text-red-500"> - {errors.password}</span>
              )}
            </label>
            <Field
              name="password"
              type="password"
              className={`mt-1 block w-full ${errors.password && touched.password ? 'outline-red-500' : 'outline-green-500'}`}
            />
          </div>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

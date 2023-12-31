import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Mock function to check if display name exists
// Replace this with your actual backend call
const checkDisplayNameExists = async (displayName) => {
  // API call to check if display name exists
  // For now, just a placeholder
  return false; 
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  displayName: Yup.string()
    .required('Required')
    .test(
      'checkDuplDisplayName',
      'Display name already taken',
      async (value) => !await checkDisplayNameExists(value)
    ),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters with at least one uppercase letter and one number'
    ),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
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
            <label htmlFor="email" className="block">
              Email
              {errors.email && touched.email && (
                <span className="label-text-alt ml-8  text-red-500"> - {errors.email}</span>
              )}
            </label>
            <Field
              name="email"
              type="email"
              className={`mt-1 block w-full ${errors.email && touched.email ? 'outline-red-500' : 'outline-green-500'}`}
            />
          </div>

          <div>
            <label htmlFor="displayName" className="block">
              Display Name
              {errors.displayName && touched.displayName && (
                <span className="label-text-alt  ml-8  text-red-500"> - {errors.displayName}</span>
              )}
            </label>
            <Field
              name="displayName"
              type="text"
              className={`mt-1 block w-full ${errors.displayName && touched.displayName ? 'outline-red-500' : 'outline-green-500'}`}
            />
          </div>

          <div>
            <label htmlFor="password" className="block">
              Password
              {errors.password && touched.password && (
                <span className="label-text-alt ml-8  text-red-500"> - {errors.password}</span>
              )}
            </label>
            <Field
              name="password"
              type="password"
              className={`mt-1 block w-full ${errors.password && touched.password ? 'outline-red-500' : 'outline-green-500'}`}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block">
              Confirm Password
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="label-text-alt ml-8   text-red-500"> - {errors.confirmPassword}</span>
              )}
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className={`mt-1 block w-full ${errors.confirmPassword && touched.confirmPassword ? 'outline-red-500' : 'outline-green-500'}`}
            />
          </div>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

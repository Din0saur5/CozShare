import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Placeholder backend validation functions
const checkemailExists = async (email) => {
  // Replace this with your actual API call to check if the email exists
  return true;
};

const isPasswordValid = async (email, password) => {
  // Replace this with your actual API call to validate the password
  return true;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Required')
    .test(
      'checkemail',
      'email does not exist',
      async (value) => await checkemailExists(value)
    ),
  password: Yup.string()
    .required('Required')
    .test(
      'checkPassword',
      'Invalid password',
      async (password, { parent }) => await isPasswordValid(parent.email, password)
    ),
});

const LoginForm = () => {
  const server = import.meta.env.VITE_URL
  const navigate = useNavigate()

    const handleSubmit = (values, { setSubmitting }) => {

      const url = `${server}/login`; // Change this URL to your actual server endpoint
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email, // Make sure this matches with your backend expected field
          password: values.password
        }),
        credentials: 'include' // if you're handling sessions
      })
      .then(response => { if(response.ok){
        navigate('/dashboard')
        
        } else{
          throw new Error("HTTP error " + response.status)
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        // Handle login error here (e.g., show error message)
      })
      .finally(() => {
        setSubmitting(false); // Stop the submission process
        
      });
    };
  
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block">
              Email
              {errors.email && touched.email && (
                <span className="label-text-alt pl-8 text-red-500"> - {errors.email}</span>
              )}
            </label>
            <Field
              name="email"
              type="email"
              className={`mt-1 block w-full ${errors.email && touched.email ? 'outline-red-500' : 'outline-green-500'}`}
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

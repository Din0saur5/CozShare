/* eslint-disable no-unused-vars */

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const LoginForm = ({setUserData}) => {
  const server = import.meta.env.VITE_URL
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (values, { setSubmitting }) => {
      setIsLoading(true)
      const url = `${server}/login`; 
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email, 
          password: values.password
        }),
        credentials: 'include' 
      })
      .then(response => { if(response.ok){
        return response.json()
         
        } else{
          throw new Error("HTTP error " + response.status)
        }
      })
      .then((data)=>{
        console.log('line 64 login form', data)
        setUserData(data)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error('Login Error:', error);
        
        
      })
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false)
     
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
          {isLoading? (
            <button className="btn rounded mt-4 px-4 py-2">
            <span className="loading loading-infinity loading-lg"></span>
            loading
          </button>
          ):
          (<button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-inner shadow-white">
            Login
          </button>)
          }
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

/* eslint-disable react/prop-types */

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Mock function to check if display name exists
// Replace this with your actual backend call



const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  displayName: Yup.string()
  .required('Required'),
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

const SignupForm = ({setUserData}) => {
  const server = import.meta.env.VITE_URL
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false) 
  const checkDisplayNameExists = (displayName) => {
    const url = `${server}/check_user/${displayName}`; // Replace with your actual server URL

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // If you're handling sessions
    })
    .then(response => {
      if (response.ok) {
        // If the response is ok (status 200), then the display name is available
        return false;
      } else if (response.status === 409) {
        // If the response status is 409, the display name already exists
        return true;
      }
      throw new Error(`Server responded with status: ${response.status}`);
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Rethrow or handle error appropriately
    });
  };

  function signup(email, displayName, password) {
    const url = `${server}/signup`; // Change to your actual server URL
    const data = {
      email: email,
      display_name: displayName,
      password: password

    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include' // if you're handling sessions
    })
    .then(response =>{ if(response.ok){
      return response.json()
        
    } else{
      throw new Error("HTTP error " + response.status)
    }
    })
    .then(data=>{
      setUserData(data)
      navigate('/dashboard')
     
    })
    
      
    
    .catch((error) => {
      console.error('Error:', error);
      location.reload()
    });
  }




  return (
    <Formik
      initialValues={{
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting,  setFieldError  }) => {
        setIsLoading(true)
        try {
          const displayNameExists = await checkDisplayNameExists(values.displayName);
          if (displayNameExists) {
            setFieldError('displayName', 'Display name already taken');
            throw new Error("Display Name Taken")
          }else{
            signup(values.email, values.displayName, values.password)
          }
        } catch (error) {
          console.error('Submission error:', error);
          // Handle other submission errors
        }
        
        setSubmitting(false); // Stop the submission process (hide loading indicators, etc.)
        setIsLoading(false)
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
              {/* <ErrorMessage name="email" component="div" className="text-red-500" /> */}
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
             {/* <ErrorMessage name="displayName" component="div" className="text-red-500" /> */}
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
            {/* <ErrorMessage name="password" component="div" className="text-red-500" /> */}
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
            {/* <ErrorMessage name="confirmPassword" component="div" className="text-red-500" /> */}
          </div>

         { isLoading? (
          <button className="btn rounded mt-4 px-4 py-2">
            <span className="loading loading-infinity loading-lg"></span>
            loading
          </button>
         ):
         ( <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-inner shadow-white">
            Sign Up
          </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

/* eslint-disable react/prop-types */

import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';


const PasswordUpdateForm = ({setToastMessage, setShowToast}) => {
    const server = import.meta.env.VITE_URL
    

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Required'),
        newPassword: Yup.string()
            .required('Required')
            .matches(
                /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Password must be at least 8 characters with at least one uppercase letter and one number'
            ),
        confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const url = `${server}/update_password`;
        const data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        };

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include' // if you're using sessions
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error updating password'); 
            }

            setToastMessage('Password updated successfully');
            setShowToast(true);

            
        } catch (error) {
            setToastMessage('Error updating password: ' + error.message);
            setShowToast(true);
            
        }
        resetForm();
        setSubmitting(false);
    };

    return (
        <>
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className="space-y-4 mt-12 mb-24">
                    <div className="label">
                        <span className="block   text-secondary sm:text-primary">Change Password</span>
                    </div>
                    {/* Old Password */}
                    <div>
                        <label htmlFor="oldPassword" className="block text-secondary text-sm sm:text-primary">Old Password</label>
                        <Field
                            name="oldPassword"
                            type="password"
                            className={`mt-1 block input input-bordered shadow-sm w-full sm:w-1/2 ${errors.oldPassword && touched.oldPassword ? 'outline-red-500' : 'outline-green-500'}`}
                        />
                        <ErrorMessage name="oldPassword" component="div" className="text-red-500" />
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor="newPassword" className="block text-secondary text-sm sm:text-primary">New Password</label>
                        <Field
                            name="newPassword"
                            type="password"
                            className={`mt-1 input input-bordered shadow-sm  block sm:w-1/2 w-full ${errors.newPassword && touched.newPassword ? 'outline-red-500' : 'outline-green-500'}`}
                        />
                        <ErrorMessage name="newPassword" component="div" className="text-red-500" />
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-secondary text-sm sm:text-primary">Confirm New Password</label>
                        <Field
                            name="confirmPassword"
                            type="password"
                            className={`mt-1 block input input-bordered shadow-sm sm:w-1/2 w-full ${errors.confirmPassword && touched.confirmPassword ? 'outline-red-500' : 'outline-green-500'}`}
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                    </div>

                    <button type="submit" className="mt-4 sm:ml-4 btn btn-accent btn-sm">Update Password</button>
                </Form>
            )}
        </Formik>
        
        </>
    );
};

export default PasswordUpdateForm;

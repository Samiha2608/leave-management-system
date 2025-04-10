import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './Header';
import '../App.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    role: Yup.string()
      .oneOf(['student', 'teacher', 'tutor', 'HOD', 'superadmin'], 'Invalid role selected')
      .required('Role is required'),
  });

  const loginUser = async (formData) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await loginUser(values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate based on user role
      switch (data.user.role) {
        case 'student':
        case 'teacher':
          navigate('/userDashboard');
          break;
        case 'superadmin':
          navigate('/super-admin');
          break;
        case 'tutor':
        case 'HOD':
          navigate('/adminDashboard');
          break;
        default:
          navigate('/userDashboard');
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">Log in to your account</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div id="login-form" className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{ email: '', password: '', role: 'student' }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className="block w-full px-3 py-2 border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 inset-y-0 pr-3 flex items-center"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <Field
                      id="role"
                      name="role"
                      as="select"
                      className="block w-full px-3 py-2 border rounded-md"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="tutor">Tutor</option>
                      <option value="HOD">HOD</option>
                      <option value="superadmin">Superadmin</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                  </div>
                  {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border rounded-md text-white bg-blue-900 hover:bg-blue-700"
                    >
                      {isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

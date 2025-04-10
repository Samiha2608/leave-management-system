import React, { useState, useEffect } from 'react';
import Header from './Header';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const form = document.getElementById('forgot-password-form');
    form.classList.add('fade-in');
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(email);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 flex flex-col items-center justify-center">
        <div id="forgot-password-form" className="bg-white p-8 rounded-lg shadow-lg max-w-[800px] w-full opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Reset Password</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
            >
              Send Reset Link
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Remember your password?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;

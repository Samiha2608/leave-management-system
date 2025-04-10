import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './Header';
import '../App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    status: '',
    designation: '',
    registrationNumber: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    const form = document.getElementById('register-form');
    form.classList.add('fade-in');
  }, []);

  const validate = () => {
    let errors = {};
    if (step === 1) {
      if (!formData.firstName) errors.firstName = 'First Name is required';
      if (!formData.lastName) errors.lastName = 'Last Name is required';
      if (!formData.email) errors.email = 'Email is required';
      if (!formData.password) errors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
      if (!formData.role) errors.role = 'Role is required';
    } else if (step === 2) {
      if (!formData.department) errors.department = 'Department is required';
      if (!formData.status) errors.status = 'Status is required';
      if (!formData.designation) errors.designation = 'Designation is required';
      if (!formData.registrationNumber) errors.registrationNumber = 'Registeration number is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (step === 1) {
      setStep(2);
    } else {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('role', formData.role);
        formDataToSend.append('department', formData.department);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('registrationNumber', formData.registrationNumber);
        if (profilePicture) {
          formDataToSend.append('profile_picture', profilePicture);
        }

        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          alert('Registration successful!');
          window.location.href = '/login'; // Redirect to login page
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-800 flex flex-col items-center justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white mt-[-10]">Create an Account</h2>
        </div>
        <div id="register-form" className="bg-white p-8 rounded-lg shadow-lg max-w-[600px] w-full opacity-0 mt-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="flex flex-col">
  <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1">
    Role
  </label>
  <select
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="">Select Role</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="super-admin">Super Admin</option> {/* New Option Added */}
  </select>
  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
</div>
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="profilePicture" className="text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleFileChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="department" className="text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Department</option>
                    <option value="computer science">Computer Science</option>
                    <option value="electrical">Electrical</option>
                    <option value="mechanical">Mechanical</option>
                  </select>
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Status</option>
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="designation" className="text-sm font-medium text-gray-700 mb-1">
                    Designation/Degree
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="designation" className="text-sm font-medium text-gray-700 mb-1">
                    Registeration No
                  </label>
                  <input type="text" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} />
                  {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
                </div>
              </>
            )}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-300 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white"
              >
                {step === 1 ? 'Next' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ApplyLeave = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    reason: Yup.string().required('*Reason is required*'),
    fromDate: Yup.date().required('*From Date is required*').nullable(),
    toDate: Yup.date()
      .required('*To Date is required*')
      .nullable()
      .min(Yup.ref('fromDate'), '*To Date cannot be before From Date*'), // Custom date validation
    leaveType: Yup.string().required('*Leave Type is required*'),
    rejoiningDate: Yup.date().required('*Rejoining Date is required*').nullable(),
    medicalFile: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      reason: '',
      fromDate: '',
      toDate: '',
      leaveType: 'casual',
      rejoiningDate: '',
      medicalFile: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('email', user?.email || '');
      for (const key in values) {
        if (key === 'medicalFile' && values[key] instanceof File) {
          data.append(key, values[key], values[key].name);
        } else {
          data.append(key, values[key]);
        }
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:5000/api/leave', {
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const text = await response.json();
          throw new Error(text.error || 'Something went wrong');
        }

        alert('Leave application submitted successfully');
        navigate('/confirmation');
      } catch (error) {
        console.error('Error submitting leave application:', error);
        setErrorMessage(error.message);
      }
    },
  });

  const handleCancel = () => {
    navigate('/userDashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-900">Apply Leave</h2>
        {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input type="hidden" name="userId" value={user?.id || ''} />
          <div>
            <label className="block mb-1 text-gray-700">Reason</label>
            <input
              type="text"
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.reason && formik.errors.reason ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.reason && formik.errors.reason && <div className="text-red-500 text-sm">{formik.errors.reason}</div>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.fromDate && formik.errors.fromDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.fromDate && formik.errors.fromDate && <div className="text-red-500 text-sm">{formik.errors.fromDate}</div>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formik.values.toDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.toDate && formik.errors.toDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.toDate && formik.errors.toDate && <div className="text-red-500 text-sm">{formik.errors.toDate}</div>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Leave Type</label>
            <select
              name="leaveType"
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.leaveType && formik.errors.leaveType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="casual">Casual</option>
              <option value="medical">Medical</option>
              <option value="annual">Annual</option>
            </select>
            {formik.touched.leaveType && formik.errors.leaveType && <div className="text-red-500 text-sm">{formik.errors.leaveType}</div>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Rejoining Date</label>
            <input
              type="date"
              name="rejoiningDate"
              value={formik.values.rejoiningDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${formik.touched.rejoiningDate && formik.errors.rejoiningDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.rejoiningDate && formik.errors.rejoiningDate && <div className="text-red-500 text-sm">{formik.errors.rejoiningDate}</div>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Medical File</label>
            <input
              type="file"
              name="medicalFile"
              onChange={(event) => {
                formik.setFieldValue('medicalFile', event.currentTarget.files[0]);
              }}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';  // Use useAuth hook

const PendingApplicationsPage = () => {
  const [applications, setApplications] = useState({
    teacherLeaves: [],
    studentLeaves: [],
  });
  
  const [selectedApp, setSelectedApp] = useState(null);
  const { user, loading } = useAuth();  // Correctly use useAuth to get user and loading
  const [formData, setFormData] = useState({
    applicationStatus: '',
    managerRemarks: '',
    directorRemarks: '',
    hrRemarks: ''
  });
  const [errors, setErrors] = useState({});
  const userRole = localStorage.getItem('role'); // Assuming user role is stored in localStorage
  const classId = localStorage.getItem('class_id'); // Assuming class_id is stored in localStorage
  const userId = user?.id; // Add userId from the user object
  const openMedicalFile = (filePath) => {
    const fileUrl = `http://localhost:5000${filePath}`; // Prefix the backend base URL
    console.log('Opening file at:', fileUrl); // Debugging
    window.open(fileUrl, '_blank');
  };
  
  useEffect(() => {
    // This will refetch the pending applications after a successful update
    if (selectedApp === null) {
      fetch('http://localhost:5000/api/getPendingApplicationsForHOD', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.pendingApplications) {
            setApplications({
              teacherLeaves: data.pendingApplications.teacherLeaves || [],
              studentLeaves: data.pendingApplications.studentLeaves || [],
            });
          } else {
            setError("No applications found or unauthorized access.");
          }
        })
        .catch(err => {
          setError('Error fetching applications');
          console.error(err);
        });
    }
  }, [selectedApp]);
  
  
   // Add userId to dependencies
  
  

  const handleUpdateClick = (app) => {
    setSelectedApp(app);
    setFormData({
      applicationStatus: app.application_status || '',
      managerRemarks: app.manager_remarks || 'none',
      directorRemarks: app.director_remarks || 'none',
      hrRemarks: app.hr_remarks || 'none',
    });
    
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.applicationStatus) newErrors.applicationStatus = '*Status is Required*';
    if (!formData.managerRemarks) newErrors.managerRemarks = '*Manager Remarks Required*';
    if (!formData.directorRemarks) newErrors.directorRemarks = '*Director Remarks Required*';
    if (!formData.hrRemarks) newErrors.hrRemarks = '*HR Remarks Required*';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:5000/api/updateLeave/${selectedApp.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        });
        
  
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 403) {
            alert('Access denied: You cannot update this leave application.');
          } else {
            console.error('Error updating application:', errorData);
            alert('An error occurred while updating the application.');
          }
          return;
        }
  
        alert('Application updated successfully!');
        setSelectedApp(null);
  
        // Update the applications list with the new status
        setApplications((prevState) => {
          const updatedTeacherLeaves = prevState.teacherLeaves.map((app) =>
            app.id === selectedApp.id ? { ...app, application_status: formData.applicationStatus } : app
          );
          const updatedStudentLeaves = prevState.studentLeaves.map((app) =>
            app.id === selectedApp.id ? { ...app, application_status: formData.applicationStatus } : app
          );
          return {
            teacherLeaves: updatedTeacherLeaves,
            studentLeaves: updatedStudentLeaves,
          };
        });
      } catch (error) {
        console.error('Error updating application:', error);
        alert('An unexpected error occurred.');
      }
    }
  };
  

  const handleCancel = () => {
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Pending Leave Applications</h2>
      {selectedApp ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center text-blue-900">Update Application</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Application Status</label>
              <select
                name="applicationStatus"
                value={formData.applicationStatus}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.applicationStatus && <div className="text-red-500 text-sm">{errors.applicationStatus}</div>}
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Tutor's Remarks</label>
              <input
                type="text"
                name="managerRemarks"
                value={formData.managerRemarks}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.managerRemarks ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.managerRemarks && <div className="text-red-500 text-sm">{errors.managerRemarks}</div>}
            </div>
            <div>
              <label className="block mb-1 text-gray-700">HOD's Remarks</label>
              <input
                type="text"
                name="directorRemarks"
                value={formData.directorRemarks}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.directorRemarks ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.directorRemarks && <div className="text-red-500 text-sm">{errors.directorRemarks}</div>}
            </div>
         
          </form>
          <div className="flex justify-between mt-4">
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700">Update</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render Teacher Leaves */}
        {Array.isArray(applications.teacherLeaves) && applications.teacherLeaves.length > 0 ? (
          applications.teacherLeaves.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold text-blue-900">Application #{app.id}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Reason:</strong> {app.reason}</p>
              <p><strong>From Date:</strong> {app.from_date}</p>
              <p><strong>To Date:</strong> {app.to_date}</p>
              <p><strong>Leave Type:</strong> {app.leave_type}</p>
              <p><strong>Rejoining Date:</strong> {app.rejoining_date}</p>
              <p><strong>Medical File:</strong>     {app.medical_file_attachments && (
            <button
              onClick={() => openMedicalFile(`${app.medical_file_attachments}`)}
              className="btn btn-primary"
            >
              View Medical File
            </button>
          )}</p>
              <button
                onClick={() => handleUpdateClick(app)}
                className="mt-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No teacher pending applications found.</p>
        )}
      
        {/* Render Student Leaves */}
        {Array.isArray(applications.studentLeaves) && applications.studentLeaves.length > 0 ? (
          applications.studentLeaves.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold text-blue-900">Application #{app.id}</h3>
              <p><strong>Reason:</strong> {app.reason}</p>
              <p><strong>From Date:</strong> {app.from_date}</p>
              <p><strong>To Date:</strong> {app.to_date}</p>
              <p><strong>Leave Type:</strong> {app.leave_type}</p>
              <p><strong>Rejoining Date:</strong> {app.rejoining_date}</p>
              <p><strong>Medical File:</strong>     {app.medical_file_attachments && (
            <button
              onClick={() => openMedicalFile(`${app.medical_file_attachments}`)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-0 px-1 rounded hover:bg-green-600 transition duration-300"
            >
              View Medical File
            </button>
          )}</p>
              <button
                onClick={() => handleUpdateClick(app)}
                className="mt-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No student pending applications found.</p>
        )}
      </div>
      
      
      )}
    </div>
  );
};

export default PendingApplicationsPage;

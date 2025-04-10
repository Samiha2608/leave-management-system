import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa'; // Import icons from react-icons
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const UserDashboardPage = () => {
  const { user, loading } = useContext(AuthContext); // Use AuthContext to get user and loading state
  const [userDetails, setUserDetails] = useState({});
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({
    casualLeaves: 0,
    annualLeaves: 0,
    medicalLeaves: 0,
  });
  const navigate = useNavigate();
  const openMedicalFile = (filePath) => {
    const fileUrl = `http://localhost:5000${filePath}`; // Prefix the backend base URL
    console.log('Opening file at:', fileUrl); // Debugging
    window.open(fileUrl, '_blank');
  };
  
  
  useEffect(() => {
    if (!loading && user) { // Ensure the user is available and loading is complete
      fetchUserDetails(user.id, user.role);
      fetchLeaveApplications(user.email);
      fetchLeaveBalance(); // Fetch leave balance only if user is logged in
    } else if (!loading && !user) {
      navigate('/login'); // Redirect to login if user is not logged in
    }
  }, [loading, user, navigate]);

  const fetchUserDetails = async (userId, userRole) => {
    try {
      let url = '';
      switch (userRole) {
        case 'teacher':
          url = `http://localhost:5000/api/teachers/${userId}`;
          break;
        case 'student':
          url = `http://localhost:5000/api/students/${userId}`;
          break;
        case 'hod':
          url = `http://localhost:5000/api/hods/${userId}`;
          break;
        case 'tutor':
          url = `http://localhost:5000/api/teachers/${userId}`;
          break;
        default:
          throw new Error('Unknown user role');
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchLeaveBalance = async (email) => {
    try {
      if (!user) {
        throw new Error('User not logged in or user data not available');
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
  
      const response = await fetch(`http://localhost:5000/api/leaveBalance/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Leave balance response:", data); // Log the response for debugging
  
      if (data && data.leaveBalance) {
        setLeaveBalance(data.leaveBalance); // Ensure this matches the data structure
      } else {
        console.error("Invalid leave balance data format:", data);
      }
    } catch (error) {
      console.error('Error fetching leave balance:', error);
    }
  };

  const fetchLeaveApplications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/myApplications/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Leave Applications Data:', data);

      if (data && Array.isArray(data.leaves)) {
        setLeaveApplications(data.leaves);
      } else {
        console.error('Expected an array of leaves but got:', data);
        setLeaveApplications([]);
      }
    } catch (error) {
      console.error('Error fetching leave applications:', error);
      setLeaveApplications([]);
    }
  };

  const downloadLeaveReport = (application) => {
    const doc = new jsPDF();

    // Title of the Report
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Leave Application Report', 20, 20);

    // Personal Information Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${user.first_name} ${user.last_name}`, 20, 40);
    doc.text(`Email: ${user.email}`, 20, 50);
    doc.text(`Department: ${user.department || 'Not Provided'}`, 20, 60);


    // Leave Application Details
    doc.setFontSize(12);
    doc.text('Leave Application Details:', 20, 90);
    
    doc.autoTable({
      head: [['Field', 'Details']],
      body: [
        ['Leave Type', application.leave_type],
        ['From Date', application.from_date],
        ['To Date', application.to_date],
        ['Reason for Leave', application.reason],
        ['Rejoining Date', application.rejoining_date],
        ['No. of Leave Days', application.no_of_leaves],
        ['Tutor Remarks', application.manager_remarks || 'None'],
        ['HOD Remarks', application.director_remarks || 'None'],
        ['Status', application.application_status],
      ],
      startY: 100, // Start table after personal info
      theme: 'striped', // Style for the table
      styles: { fontSize: 10 },
    });

    // Medical File Section (if applicable)
    if (application.medical_file_attachments) {
      doc.text('Medical File: Attached', 20, doc.autoTable.previous.finalY + 10);
    }

    // Save PDF
    doc.save(`Leave_Report_${application.id}.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="./images/Logo.png" alt="Logo" className="h-12 w-12 mr-2" /> {/* Logo */}
          <div className="text-xl font-bold">Online Leave Management System</div>
        </div>
        <div className="flex items-center">
          {user?.profile_picture && (
            <img src={`http://localhost:5000${user.profile_picture}`} alt="Profile" className="h-8 w-8 rounded-full mr-2"/>
          )}
          <span>{user.first_name}</span>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/');
            }}
            className="bg-red-600 py-2 px-4 rounded hover:bg-red-700 ml-4">
            Logout
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center">My Own Applications</h2>
          <div className="font-bold text-center inline-block bg-orange-400 px-2 py-1 rounded-full mt-2">
            {leaveApplications.length}
          </div>
        </div>
        <div className="text-right mb-6">
          <Link to="/applyLeave">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
              Apply Leave
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded shadow-md flex flex-col items-center justify-between">
            <div className="text-lg font-bold">{user.first_name} {user.last_name}</div>

            <div className="flex justify-between w-full mt-4">
              <p className="font-bold">Email:</p>
              <p>{user.email}</p>
            </div>
          
            <div className="flex justify-between w-full">
              <p className="font-bold">Dept Name:</p>
              <p>{user.department}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded shadow-md col-span-2">
            <h3 className="text-lg font-bold">LEAVE RECORDS</h3>
            <div className="mt-4">
              <div className="flex justify-between">
                <p className="font-bold">Casual Leaves:</p>
                <p>{leaveBalance.casualLeaves}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Accumulative Annual Leaves:</p>
                <p>{leaveBalance.annualLeaves}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Medical Leaves:</p>
                <p>{leaveBalance.medicalLeaves}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
          <h3 className="text-lg font-bold mb-4 text-purple-700">My Own Applications</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason for Leave</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejoining Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Leave Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager's Remarks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director's Remarks</th>
          
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical File's Attachments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download Report</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveApplications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.application_status === 'approved' && <FaCheckCircle className="text-green-500 inline" />}
                    {application.application_status === 'rejected' && <FaTimesCircle className="text-red-500 inline" />}
                    {application.application_status === 'pending' && <FaHourglassHalf className="text-yellow-500 inline" />}
                    {application.application_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.from_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.to_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.rejoining_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.no_of_leaves}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.leave_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.manager_remarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.director_remarks}</td>
              
                 <td> {application.medical_file_attachments && (
            <button
              onClick={() => openMedicalFile(`${application.medical_file_attachments}`)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-0 px-1 rounded hover:bg-green-600 transition duration-300"
            >
              View Medical File
            </button>
          )}
          </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => downloadLeaveReport(application)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;

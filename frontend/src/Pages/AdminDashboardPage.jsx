import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PendingApplicationsPage from './PendingApplicationsPage';
import ApprovedApplicationsPage from './ApprovedApplicationsPage';
import NotApprovedApplicationsPage from './NotApprovedApplicationsPage';
import MyApplicationsPage from './MyApplicationsPage';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('pending');
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('user'));
    setAdmin(storedAdmin);
  }, []);
  // Sample data for demonstration
  const pendingApplications = [
    {
      id: 1,
      employeeName: 'John Doe',
      designation: 'Software Engineer',
      department: 'Engineering',
      fromDate: '2024-06-25',
      toDate: '2024-06-28',
      reason: 'Vacation',
      rejoiningDate: '2024-06-29',
      numOfLeaveDays: 4,
      status: 'Pending',
      projectName: 'Project A',
      managerName: 'Manager X',
      managerRemarks: 'None',
      submittedOn: 'None',
      attachments: 'None'
    },
    {
      id: 2,
      employeeName: 'Alice Williams',
      designation: 'QA Analyst',
      department: 'Quality Assurance',
      fromDate: '2024-07-01',
      toDate: '2024-07-05',
      reason: 'Personal leave',
      rejoiningDate: '2024-07-06',
      numOfLeaveDays: 5,
      status: 'Pending',
      projectName: 'Project D',
      managerName: 'Manager Y',
      managerRemarks: 'None',
      submittedOn: 'None',
      attachments: 'None'
    }
  ];



  const myApplications = [
    {
      id: 1,
      applicationStatus: 'Approved',
      fromDate: '2024-06-10',
      toDate: '2024-06-12',
      reason: 'Medical leave',
      rejoiningDate: '2024-06-13',
      numOfLeaveDays: 3,
      leaveType: 'Medical',
      managerRemarks: 'Approved',
      directorRemarks: 'None',
      hrRemarks: 'None',
      inSession: '2024-06',
      medicalAttachments: 'None',
      submittedOn: '2024-06-09',
      attachments: 'None'
    },
    {
      id: 2,
      applicationStatus: 'Submitted',
      fromDate: '2024-07-05',
      toDate: '2024-07-10',
      reason: 'Vacation',
      rejoiningDate: '2024-07-11',
      numOfLeaveDays: 6,
      leaveType: 'Vacation',
      managerRemarks: 'Pending',
      directorRemarks: 'None',
      hrRemarks: 'None',
      inSession: '2024-07',
      medicalAttachments: 'None',
      submittedOn: '2024-06-30',
      attachments: 'None'
    }
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'pending':
        return <PendingApplicationsPage applications={pendingApplications} />;
      case 'approved':
        return <ApprovedApplicationsPage applications={approvedApplications} />;
      case 'notApproved':
        return <NotApprovedApplicationsPage applications={notApprovedApplications} />;
      case 'myApplications':
        return <MyApplicationsPage applications={myApplications} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="./images/Logo.png" alt="Logo" className="h-12 w-12 mr-2" /> {/* Logo */}
          <div className="text-xl font-bold">Online Leave Management System</div>
        </div>
        <div className="flex items-center">
        {admin?.profile_picture && (
            <img 
              src={`http://localhost:5000${admin.profile_picture}`} // Use the actual path to the profile picture
              alt="Profile"
              className="h-10 w-10 rounded-full mr-4"
            />
          )}
          <span>{admin?.first_name} </span>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-600 py-2 px-4 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Tabs */}
        <div className="flex mb-6 space-x-4">
          <button
            className={`flex-1 py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${
              currentTab === 'pending' ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-white' : 'bg-white text-orange-600 border border-orange-600'
            }`}
            onClick={() => setCurrentTab('pending')}
          >
            <span className="flex flex-col items-center justify-center">
              <span className="text-lg font-semibold">Pending Applications</span>
              <span className="mt-2 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold">3</span>
            </span>
          </button>
        
       
          <button
            className={`flex-1 py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${
              currentTab === 'myApplications' ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' : 'bg-white text-cyan-600 border border-cyan-600'
            }`}
            onClick={() => setCurrentTab('myApplications')}
          >
            <span className="flex flex-col items-center justify-center">
              <span className="text-lg font-semibold">My Applications</span>
              <span className="mt-2 bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold">2</span>
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-md rounded p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

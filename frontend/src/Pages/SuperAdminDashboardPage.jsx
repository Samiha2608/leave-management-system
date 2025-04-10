import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CreateTeacherPage from './CreateTeacherPage';
import AssignTutorsPage from './AssignTutorsPage';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('createUser');
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('user'));
    setAdmin(storedAdmin);
  }, []);

  // Render the selected tab content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'createUser':
        return <CreateTeacherPage />;
      case 'assignTutors':
        return <AssignTutorsPage />;
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
          <div className="text-xl font-bold">Super Admin Dashboard</div>
        </div>
        <div className="flex items-center">
          {admin?.profile_picture && (
            <img
              src={`http://localhost:5000${admin.profile_picture}`} // Use the actual path to the profile picture
              alt="Profile"
              className="h-10 w-10 rounded-full mr-4"
            />
          )}
          <span>{admin?.first_name}</span>
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
              currentTab === 'createUser' ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-white' : 'bg-white text-orange-600 border border-orange-600'
            }`}
            onClick={() => setCurrentTab('createUser')}
          >
            <span className="text-lg font-semibold">Create Users</span>
          </button>
          <button
            className={`flex-1 py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${
              currentTab === 'assignTutors' ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white' : 'bg-white text-cyan-600 border border-cyan-600'
            }`}
            onClick={() => setCurrentTab('assignTutors')}
          >
            <span className="text-lg font-semibold">Assign Tutors to Classes</span>
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

export default SuperAdminDashboard;

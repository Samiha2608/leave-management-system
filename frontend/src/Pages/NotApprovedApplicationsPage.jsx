import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { getStatusIcon } from './utils';

const NotApprovedApplicationsPage = ({ applications }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-red-700">Not Approved Applications</h2>
      <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason for Leave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejoining Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Leave Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager's Remarks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director's Remarks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR's Remarks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id} className="bg-red-100 hover:bg-red-200">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <FaTimesCircle className="text-red-500 mr-2" /> Not Approved
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{app.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.fromDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.toDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.rejoiningDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.numOfLeaveDays}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.manager_remarks}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.hr_remarks}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.director_remarks}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.submittedOn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.attachments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotApprovedApplicationsPage;

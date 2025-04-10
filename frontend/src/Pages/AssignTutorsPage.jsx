import React, { useState, useEffect } from 'react';

const AssignTutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [tutor, setTutor] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [message, setMessage] = useState('');

  const fetchTutorsAndClasses = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      // Fetch tutors with authorization token
      const tutorsResponse = await fetch('http://localhost:5000/api/auth/get-teachers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'application/json',
        },
      });

      // Fetch classes with authorization token
      const classesResponse = await fetch('http://localhost:5000/api/auth/get-classes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'application/json',
        },
      });

      // Check if either response is not ok
      if (!tutorsResponse.ok || !classesResponse.ok) {
        const errorData = await tutorsResponse.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }

      const tutorsData = await tutorsResponse.json();
      const classesData = await classesResponse.json();

      setTutors(tutorsData);
      setClasses(classesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to load tutors or classes. Please check your authentication.');
    }
  };

  useEffect(() => {
    fetchTutorsAndClasses();
  }, []);

  const handleAssignTutor = async (e) => {
    e.preventDefault();
    if (!tutor || !classRoom) {
      setMessage('Please select both a tutor and a class.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/assign-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for assigning tutor
        },
        body: JSON.stringify({ tutor, classRoom }),
      });

      if (response.ok) {
        setMessage('Tutor assigned successfully');
        setTutor('');
        setClassRoom('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Failed to assign tutor. Try again later.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assign Tutors to Classes</h2>
      <form onSubmit={handleAssignTutor} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Tutor</label>
          <select
            value={tutor}
            onChange={(e) => setTutor(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a Tutor</option>
            {tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.first_name} {tutor.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Class</label>
          <select
            value={classRoom}
            onChange={(e) => setClassRoom(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a Class</option>
            {classes.map((classRoom) => (
              <option key={classRoom.id} value={classRoom.id}>
                {classRoom.class_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Assign Tutor
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AssignTutorsPage;

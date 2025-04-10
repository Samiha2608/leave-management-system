import React, { useState , useEffect} from 'react';


const CreateTeacherPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  
  const [classData, setClassData] = useState(''); // For class creation
  const [createdClasses, setCreatedClasses] = useState([]); // Store created classes
  const [selectedClass, setSelectedClass] = useState(null); // Store selected class for adding students
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword:'',
    department: '',
    registrationNumber: '',
  });
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState('createTeacher'); // Manage active tab

  const [superadminData, setSuperadminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  const [hodData, setHodData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSuperadminChange = (e) => {
    const { name, value } = e.target;
    setSuperadminData({
      ...superadminData,
      [name]: value,
    });
  };
  const handleHodChange = (e) => {
    const { name, value } = e.target;
    setHodData({
      ...hodData,
      [name]: value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleClassChange = (e) => {
    setClassData(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    const teacherData = {
      ...formData,
      isTutor: null, // Set isTutor to null
      tutorClass: null, // Set tutorClass to null
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/create-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(teacherData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Teacher created successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: '',
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('An error occurred while creating the teacher.');
    }
  };
  useEffect(() => {
    const storedClasses = localStorage.getItem('createdClasses');
    if (storedClasses) {
      setCreatedClasses(JSON.parse(storedClasses));
    }
  }, []);
  const handleClassSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/create-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          className: classData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      alert('Class created successfully!');

      const updatedClasses = [...createdClasses, classData];
      setCreatedClasses(updatedClasses);
      localStorage.setItem('createdClasses', JSON.stringify(updatedClasses)); // Store in localStorage

      setClassData(''); // Reset class input field
    } catch (error) {
      console.error('Error creating class:', error);
      alert('An error occurred while creating the class.');
    }
  };
  const handleSuperadminSubmit = async (e) => {
    e.preventDefault();
    if (superadminData.password !== superadminData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/create-superadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(superadminData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Superadmin created successfully!');
        setSuperadminData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: '',
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating superadmin:', error);
      alert('An error occurred while creating the superadmin.');
    }
  };
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (studentData.password !== studentData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/add-student', {  // Adjust the route if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...studentData,
          className: selectedClass,  // Ensure the backend expects this field to associate the student with a class
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Student added successfully!');
        setStudentData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword:'',
          department: '',
          registrationNumber: '',
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('An error occurred while adding the student.');
    }
  };
  const handleHodSubmit = async (e) => {
    e.preventDefault();
    if (hodData.password !== hodData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/create-hod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hodData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('HOD created successfully!');
        setHodData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: '',
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating HOD:', error);
      alert('An error occurred while creating the HOD.');
    }
  };
  
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-indigo-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-3 rounded-md ${currentTab === 'createTeacher' ? 'bg-indigo-700' : 'hover:bg-indigo-600'}`}
            onClick={() => setCurrentTab('createTeacher')}
          >
            Create Teacher
          </li>
          <li
            className={`cursor-pointer p-3 rounded-md ${currentTab === 'createClass' ? 'bg-indigo-700' : 'hover:bg-indigo-600'}`}
            onClick={() => setCurrentTab('createClass')}
          >
            Create Class
          </li>
          <li
            className={`cursor-pointer p-3 rounded-md ${currentTab === 'createSuperadmin' ? 'bg-indigo-700' : 'hover:bg-indigo-600'}`}
            onClick={() => setCurrentTab('createSuperadmin')}
          >
            Create Superadmin
          </li>
          <li
            className={`cursor-pointer p-3 rounded-md ${currentTab === 'createHod' ? 'bg-indigo-700' : 'hover:bg-indigo-600'}`}
            onClick={() => setCurrentTab('createHod')}
          >
            Create HOD
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="w-3/4 p-10 bg-gray-100">
        {currentTab === 'createTeacher' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Create Teacher</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex flex-col">
                <label className="font-semibold">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

             


              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Create Teacher
              </button>
            </form>
          </div>
        )}
    {currentTab === 'createClass' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Create Class</h1>
            <form onSubmit={handleClassSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="font-semibold">Class Name (Format: XXXX-XX-X)</label>
                <input
                  type="text"
                  value={classData}
                  onChange={handleClassChange}
                  className="p-3 border border-gray-300 rounded-md"
                  placeholder="e.g. 2021-SE-A"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Create Class
              </button>
            </form>

            <h2 className="text-3xl font-bold text-gray-800 mt-10">Created Classes</h2>
            {createdClasses.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {createdClasses.map((className, index) => (
                  <li key={index} className="flex justify-between items-center p-4 bg-white rounded-md shadow-md">
                    <span>{className}</span>
                    <button
                      onClick={() => setSelectedClass(className)}
                      className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                      Add Students
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No classes created yet.</p>
            )}

           {selectedClass && (
             <div className="mt-10">
               <h3 className="text-2xl font-bold text-gray-800">Add Student to {selectedClass}</h3>
               <form onSubmit={handleStudentSubmit} className="space-y-6 mt-6">
                 <div className="flex flex-col">
                   <label className="font-semibold">First Name</label>
                   <input
                     type="text"
                     name="firstName"
                     value={studentData.firstName}
                     onChange={handleStudentChange}
                     className="p-3 border border-gray-300 rounded-md"
                     required
                   />
                 </div>
                 <div className="flex flex-col">
                   <label className="font-semibold">Last Name</label>
                   <input
                     type="text"
                     name="lastName"
                     value={studentData.lastName}
                     onChange={handleStudentChange}
                     className="p-3 border border-gray-300 rounded-md"
                     required
                   />
                 </div>
                 <div className="flex flex-col">
                   <label className="font-semibold">Email</label>
                   <input
                     type="email"
                     name="email"
                     value={studentData.email}
                     onChange={handleStudentChange}
                     className="p-3 border border-gray-300 rounded-md"
                     required
                   />
                 </div>
                 <div className="flex flex-col">
                   <label className="font-semibold">Password</label>
                   <input
                     type="password"
                     name="password"
                     value={studentData.password}
                     onChange={handleStudentChange}
                     className="p-3 border border-gray-300 rounded-md"
                     required
                   />
                 </div>
                 <div className="flex flex-col">
                <label className="font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={studentData.confirmPassword}
                  onChange={handleStudentChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

                 <div className="flex flex-col">
                   <label className="font-semibold">Department</label>
                   <input
                     type="text"
                     name="department"
                     value={studentData.department}
                     onChange={handleStudentChange}
                     className="p-3 border border-gray-300 rounded-md"
                     required
                   />
                 </div>
                 <div className="flex flex-col">
                   <label className="font-semibold">Registration Number</label>
                   <input
                     type="text"
                     name="registrationNumber"
                     value={studentData.registrationNumber}
                     onChange={handleStudentChange}
                     className="p-3 border border-gray-300 rounded-md"
                     required
                   />
                 </div>

                 <button
                   type="submit"
                   className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
                 >
                   Add Student
                 </button>
               </form>
             </div>
         )}
         </div>
       )}
       {currentTab === 'createSuperadmin' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Create Superadmin</h1>
            <form className="space-y-6" onSubmit={handleSuperadminSubmit}>
              <div className="flex flex-col">
                <label className="font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={superadminData.firstName}
                  onChange={handleSuperadminChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={superadminData.lastName}
                  onChange={handleSuperadminChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={superadminData.email}
                  onChange={handleSuperadminChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={superadminData.password}
                  onChange={handleSuperadminChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={superadminData.confirmPassword}
                  onChange={handleSuperadminChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Department</label>
                <input
                  type="text"
                  name="department"
                  value={superadminData.department}
                  onChange={handleSuperadminChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Create Superadmin
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        )}
         {currentTab === 'createHod' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Create HOD</h1>
            <form className="space-y-6" onSubmit={handleHodSubmit}>
              <div className="flex flex-col">
                <label className="font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={hodData.firstName}
                  onChange={handleHodChange}
                  required
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={hodData.lastName}
                  onChange={handleHodChange}
                  required
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={hodData.email}
                  onChange={handleHodChange}
                  required
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={hodData.password}
                  onChange={handleHodChange}
                  required
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={hodData.confirmPassword}
                  onChange={handleHodChange}
                  required
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Department</label>
                <select
                  name="department"
                  value={hodData.department}
                  onChange={handleHodChange}
                  required
                  className="border border-gray-400 p-2 rounded-md"
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                  {/* Add other departments as needed */}
                </select>
              </div>
              <button type="submit" className="bg-indigo-600 text-white p-3 rounded-md">
                Create HOD
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTeacherPage;

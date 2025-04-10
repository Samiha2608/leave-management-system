const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const leaveRoutes = require('./routes/leaveRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware, leaveRoutes); // Apply auth middleware to protected routes

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// Create Class Endpoint
app.post('/create-class', (req, res) => {
  const { className } = req.body;

  // Validate class name
  if (!className || !/^20\d{2}-[A-Z]{2}-[A-Z]$/.test(className)) {
    return res.status(400).json({ error: 'Invalid class format. It should be like 2021-SE-A' });
  }

  // Check if class already exists in the 'classes' table
  db.query('SELECT * FROM classes WHERE class_name = ?', [className], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Class already exists' });
    }

    // Insert a new class into the 'classes' table
    db.query('INSERT INTO classes (class_name) VALUES (?)', [className], (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Class created successfully', classId: results.insertId });
    });
  });
});


app.post('/add-student', async (req, res) => {
  const { firstName, lastName, email, password, department, registrationNumber, className } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !email || !password || !department || !registrationNumber || !className) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fetch the class ID from the 'classes' table
    db.query('SELECT id FROM classes WHERE class_name = ?', [className], (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(400).json({ error: 'Class does not exist' });
      }

      const classId = results[0].id;

      // Insert the student data into the 'students' table
      db.query(
        `INSERT INTO students (first_name, last_name, email, password, department, registration_number, class_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, hashedPassword, department, registrationNumber, classId],
        (err, results) => {
          if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: err.message });
          }

          // Return success response
          res.status(201).json({ message: 'Student added successfully', studentId: results.insertId });
        }
      );
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
// Login Route
// Leave Application Route for both Students and Teachers
// Leave Application Route for both Students and Teachers
// Leave Application Route for Students, Teachers, and Tutors
// Assuming you have `classes`, `students`, and `tutors` tables properly related

app.post('/api/leave', authMiddleware, upload.single('medicalFile'), async (req, res) => {
  const { reason, fromDate, toDate, leaveType, rejoiningDate } = req.body;
  const medicalFile = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const { email, role, id: userId } = req.user; // Fetch email, role, and user ID

    // Fetch class_id from classes table based on userId from students table
    const [classResult] = await db.query(`
      SELECT c.id AS class_id
      FROM students s
      JOIN classes c ON s.class_id = c.id
      WHERE s.id = ?`, 
      [userId]
    );

    const classId = classResult ? classResult.class_id : null; // Ensure classResult is not null

    const applicationStatus = 'pending';
    const submittedOn = new Date().toISOString();

    const targetTable = role === 'teacher' ? 'teacher_leaves' : 'student_leaves';

    const query = `
      INSERT INTO ${targetTable} 
      (email, reason, fromDate, toDate, leaveType, rejoiningDate, medical_file_attachments, applicationStatus, submittedOn, class_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert leave into the correct table based on role, including the class_id
    await db.query(query, [email, reason, fromDate, toDate, leaveType, rejoiningDate, medicalFile, applicationStatus, submittedOn, classId]);
    
    res.status(201).json({ message: 'Leave application submitted successfully!' });
  } catch (error) {
    console.error('Error submitting leave application:', error);
    res.status(500).json({ error: error.message || 'Failed to submit leave application' });
  }
});


// Fetch user details
app.get('/api/auth/user/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// app.get('/api/leave-applications', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming user is authenticated
//     const userRole = req.user.role; // e.g., 'tutor', 'hod'
    
//     let leaves = [];

//     if (userRole === 'tutor') {
//       // Get the tutor's assigned class
//       const [tutorClass] = await db.query('SELECT class_id FROM tutors WHERE tutor_id = ?', [userId]);

//       // If the tutor has an assigned class, get leave applications for students in that class
//       if (tutorClass) {
//         leaves = await db.query(`
//           SELECT * FROM student_leaves
//           WHERE class_id = ? AND applicationStatus = 'pending'
//         `, [tutorClass.class_id]);
//       }

//     } else if (userRole === 'HOD') {
//       // HOD sees all pending leave applications for students with leave days > 3, and all pending teacher applications
//       leaves = await db.query(`
//         SELECT * FROM student_leaves WHERE application_status = 'pending' AND DATEDIFF(to_date, from_date) > 3
//         UNION
//         SELECT * FROM teacher_leaves WHERE application_status = 'pending'
//       `);
//     } else {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }

//     res.status(200).json(leaves);
//   } catch (error) {
//     console.error('Error fetching leave applications:', error);
//     res.status(500).json({ error: 'Failed to fetch leave applications' });
//   }
// });




// Fetch all teachers
app.get('api/auth/get-teachers', (req, res) => {
  db.query('SELECT id, first_name, last_name FROM teachers', (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
});

// Fetch all classes
app.get('api/auth/get-classes', (req, res) => {
  db.query('SELECT id, class_name FROM classes', (err, results) => {
    if (err) {
      console.error('Error fetching classes:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
});

// Assign a teacher as a tutor to a class
app.post('api/auth/assign-tutor', (req, res) => {
  const { tutor, classRoom } = req.body;

  if (!tutor || !classRoom) {
    return res.status(400).json({ error: 'Tutor and Class are required' });
  }

  db.query(
    'INSERT INTO tutors (teacher_id, class_id) VALUES (?, ?)',
    [tutor, classRoom],
    (err, results) => {
      if (err) {
        console.error('Error assigning tutor:', err.message);
        return res.status(500).json({ error: 'Server error' });
      }
      res.status(201).json({ message: 'Tutor assigned successfully' });
    }
  );
});

// Leave Application Route for both Students and Teachers
app.post('/api/leave', authMiddleware, upload.single('medicalFile'), async (req, res) => {
  const { reason, fromDate, toDate, leaveType, rejoiningDate } = req.body;
  const medicalFile = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const { email, role } = req.user; // Fetch email and role of logged-in user from decoded token
    const applicationStatus = 'pending';
    const submittedOn = new Date().toISOString();

    const targetTable = role === 'teacher' ? 'teacher_leaves' : 'student_leaves';

    const query = `
      INSERT INTO ${targetTable} 
      (email, reason, fromDate, toDate, leaveType, rejoiningDate, medical_file_attachments, applicationStatus, submittedOn)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert leave into the correct table based on role
    await db.query(query, [email, reason, fromDate, toDate, leaveType, rejoiningDate, medicalFile, applicationStatus, submittedOn]);
    res.status(201).json({ message: 'Leave application submitted successfully!' });
  } catch (error) {
    console.error('Error submitting leave application:', error);
    res.status(500).json({ error: error.message || 'Failed to submit leave application' });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();
const Student = require('../models/Student');
const HOD = require('../models/HOD')
const Teacher = require('../models/Teacher');



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// Helper function to validate class name and registration number pattern
const validateClassAndRegistration = (className, registrationNumber) => {
  const classPattern = /^20\d{2}-(SE|CS)-[A-Z]$/;
  const registrationPattern = new RegExp(`^${className.split('-').slice(0, 2).join('-')}-\\d+$`);
  return classPattern.test(className) && registrationPattern.test(registrationNumber);
};


// In your authController.js or similar file
exports.createHod = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, department } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  try {
    // Check for duplicate email
    db.query('SELECT * FROM hods WHERE email = ?', [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert HOD into the `hods` table
      db.query(
        'INSERT INTO hods (first_name, last_name, email, password, department) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword, department || 'Computer Science'],
        (err, results) => {
          if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Database error' });
          }
          return res.status(200).json({ message: 'HOD created successfully' });
        }
      );
    });
  } catch (err) {
    console.error('Error creating HOD:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create Teacher
exports.createTeacher = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, department } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  try {
    // Check for duplicate email or password
    db.query('SELECT * FROM teachers WHERE email = ? OR password = ?', [email, password], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email or Password already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert teacher into the `teachers` table
      db.query(
        'INSERT INTO teachers (first_name, last_name, email, password, department) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword, department || 'Computer Science'],
        (err, results) => {
          if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Database error' });
          }
          return res.status(200).json({ message: 'Teacher created successfully' });
        }
      );
    });
  } catch (err) {
    console.error('Error creating teacher:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.createSuperadmin = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, department } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  try {
    // Check for duplicate email
    db.query('SELECT * FROM superadmins WHERE email = ?', [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert superadmin into the `superadmins` table
      db.query(
        'INSERT INTO superadmins (first_name, last_name, email, password, department) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword, department || 'Computer Science'],
        (err, results) => {
          if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Database error' });
          }
          return res.status(200).json({ message: 'Superadmin created successfully' });
        }
      );
    });
  } catch (err) {
    console.error('Error creating superadmin:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
// Create Class
exports.createClass = (req, res) => {
  const { className } = req.body;

  // Validate the class name format
  if (!className || !/^20\d{2}-(SE|CS)-[A-Z]$/.test(className)) {
    return res.status(400).json({ error: 'Invalid class format. It should be like 2021-SE-A or 2021-CS-B' });
  }

  // Check if the class already exists
  db.query('SELECT * FROM classes WHERE class_name = ?', [className], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Class already exists' });
    }

    // Insert new class
    db.query('INSERT INTO classes (class_name) VALUES (?)', [className], (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({ message: 'Class created successfully', classId: results.insertId });
    });
  });
};

// Add Student
exports.addStudent = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, department, registrationNumber, className } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  if (!validateClassAndRegistration(className, registrationNumber)) {
    return res.status(400).json({ error: 'Invalid registration number format' });
  }

  try {
    // Check for duplicate email, password, or registration number
    db.query(
      'SELECT * FROM students WHERE email = ? OR password = ? OR registration_number = ?',
      [email, password, registrationNumber],
      async (err, results) => {
        if (results.length > 0) {
          return res.status(400).json({ error: 'Email, Password, or Registration number already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get class ID
        db.query('SELECT id FROM classes WHERE class_name = ?', [className], (err, classResults) => {
          if (err || classResults.length === 0) {
            return res.status(400).json({ error: 'Class not found' });
          }

          const classId = classResults[0].id;

          // Insert student data
          db.query(
            'INSERT INTO students (first_name, last_name, email, password, department, registration_number, class_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword, department, registrationNumber, classId],
            (err, results) => {
              if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ error: 'Database error' });
              }

              res.status(201).json({ message: 'Student added successfully' });
            }
          );
        });
      }
    );
  } catch (err) {
    console.error('Error adding student:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getTeachers = (req, res) => {
  db.query('SELECT id, first_name, last_name, role FROM teachers', (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
};
// Fetch all classes
exports.getClasses = (req, res) => {
  db.query('SELECT id, class_name FROM classes', (err, results) => {
    if (err) {
      console.error('Error fetching classes:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
};
// Assign a teacher as a tutor to a class
exports.assignTutor = (req, res) => {
  const { tutor, classRoom } = req.body;

  if (!tutor || !classRoom) {
    return res.status(400).json({ error: 'Tutor and Class are required' });
  }

  // Begin a transaction
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Transaction error' });
    }

    // Insert the tutor assignment into the tutors table
    db.query(
      'INSERT INTO tutors (teacher_id, class_id) VALUES (?, ?)',
      [tutor, classRoom],
      (err, results) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error assigning tutor:', err.message);
            return res.status(500).json({ error: 'Server error' });
          });
        }

        // Update the teacher's role to 'tutor'
        db.query(
          'UPDATE teachers SET role = ? WHERE id = ?',
          ['tutor', tutor],
          (err, results) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error updating role:', err.message);
                return res.status(500).json({ error: 'Server error' });
              });
            }

            // Commit the transaction
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Transaction commit error:', err.message);
                  return res.status(500).json({ error: 'Server error' });
                });
              }

              res.status(201).json({ message: 'Tutor assigned and role updated successfully' });
            });
          }
        );
      }
    );
  });
};


exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  let query;
  let table;

  // Determine which table to query based on the role
  switch (role) {
    case 'student':
      table = 'students';
      break;
    case 'teacher':
      table = 'teachers';
      break;
    case 'tutor':
      table = 'teachers';  // Ensure this table exists in your database
      break;
    case 'HOD':
      table = 'hods';
      break;
    case 'superadmin':
      table = 'superadmins';
      break;
    default:
      return res.status(400).json({ error: 'Invalid role provided' });
  }

  // Query to get the user by email from the selected table
  query = `SELECT * FROM ${table} WHERE email = ?`;

  try {
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Create the payload for the JWT
      const payload = {
        id: user.id,
        role: role  // Using the provided role in the payload
      };

      // Sign the token with the payload
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, user });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};



// Create Class
// Importing necessary modules


// Assuming 'db' is your MySQL database connection








// Get User Details (existing)
// Get User Details (existing)
exports.getUserDetails = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  console.log(`Fetching details for user ID: ${userId}, Role: ${userRole}`);

  try {
    let userDetails;

    switch (userRole) {
      case 'student':
        userDetails = await Student.findOne({
          attributes: ['id', 'first_name', 'last_name', 'email', 'department'],
          where: { id: userId },
        });
        break;

      case 'teacher':
        userDetails = await Teacher.findOne({
          attributes: ['id', 'first_name', 'last_name', 'email', 'department'],
          where: { id: userId },
        });
        break;

      case 'tutor':  // Add this case for tutors
        userDetails = await Teacher.findOne({
          attributes: ['id', 'first_name', 'last_name', 'email', 'department'],
          where: { id: userId },
        });
        break;

      case 'HOD':
        userDetails = await HOD.findOne({
          attributes: ['id', 'first_name', 'last_name', 'email', 'department'],
          where: { id: userId },
        });
        break;

      default:
        return res.status(403).json({ error: 'Role not recognized' });
    }

    if (!userDetails) {
      console.log(`User not found for role: ${userRole}, ID: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userDetails);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};



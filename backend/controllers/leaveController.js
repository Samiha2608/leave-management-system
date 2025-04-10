const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const Student = require('../models/Student');
const StudentLeaves = require('../models/StudentLeaves');
const Teacher = require('../models/Teacher');
const TeacherLeave = require('../models/TeacherLeave');
const Tutor = require('../models/Tutor');
const db = require('../config/db');

exports.submitLeave = async (req, res) => {
  const {
    fromDate,
    toDate,
    reason,
    leaveType,
    rejoiningDate,
  } = req.body;

  const userId = req.user.id;
  const userRole = req.user.role;
  const medicalFile = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Common logic to check for overlapping leave applications
    let existingLeaves;

    if (userRole === 'student') {
      existingLeaves = await StudentLeaves.findAll({
        where: {
          email: req.user.email,
          from_date: { [Op.lte]: toDateObj },
          to_date: { [Op.gte]: fromDateObj },
        },
      });
    } else if (userRole === 'teacher' || userRole === 'tutor') {
      existingLeaves = await TeacherLeave.findAll({
        where: {
          email: req.user.email,
          from_date: { [Op.lte]: toDateObj },
          to_date: { [Op.gte]: fromDateObj },
        },
      });
    }

    if (existingLeaves && existingLeaves.length > 0) {
      return res.status(400).json({ error: 'Leave application for the requested dates already exists.' });
    }

    const noOfLeaves = Math.ceil((toDateObj - fromDateObj) / (1000 * 60 * 60 * 24)) + 1;

    let newLeave;
    let assignedTo = 'tutor';

    if (userRole === 'student') {
      const student = await Student.findByPk(userId);
      if (!student) return res.status(400).json({ error: 'Student not found' });

      const classId = student.class_id;

      if (noOfLeaves > 3) {
        assignedTo = 'hod';
      } else {
        const tutor = await Teacher.findOne({ where: { class_id: classId } });
        if (tutor) assignedTo = tutor.id;
      }

      newLeave = await StudentLeaves.create({
        email: student.email,
        from_date: fromDateObj,
        to_date: toDateObj,
        reason,
        leave_type: leaveType,
        rejoining_date: rejoiningDate,
        no_of_leaves: noOfLeaves,
        medical_file_attachments: medicalFile,
        application_status: 'pending',
        submitted_on: new Date(),
        assigned_to: assignedTo,
        class_id: classId, // Store class_id in student_leaves table
      });

    } else if (userRole === 'teacher' || userRole === 'tutor') {
      const teacher = await Teacher.findByPk(userId);
      if (!teacher) return res.status(400).json({ error: 'Teacher not found' });

      newLeave = await TeacherLeave.create({
        email: teacher.email,
        from_date: fromDateObj,
        to_date: toDateObj,
        reason,
        leave_type: leaveType,
        rejoining_date: rejoiningDate,
        no_of_leaves: noOfLeaves,
        medical_file_attachments: medicalFile,
        application_status: 'pending',
        submitted_on: new Date(),
        assigned_to: 'hod',
      });
    }

    res.status(201).json({ message: 'Leave application submitted successfully', leave: newLeave });
  } catch (error) {
    console.error('Error submitting leave application:', error);
    res.status(500).json({ error: 'An error occurred while submitting the leave application' });
  }
};


// Backend: Get Leave Balance
// Backend: Get Leave Balance
exports.getLeaveBalance = async (req, res) => {
  try {
    const userEmail = req.user.email; // Extract email from JWT token payload
    const userRole = req.user.role; // Extract role from JWT token payload

    // Initialize leave balances for casual, medical, and annual leaves
    let leaveBalance = {
      casualLeaves: 0,
      medicalLeaves: 0,
      annualLeaves: 0,
    };

    // Fetch approved leaves for the user based on their role and email
    let approvedLeaves;

    if (userRole === 'student') {
      approvedLeaves = await StudentLeaves.findAll({
        where: {
          email: userEmail,
          application_status: 'approved', // Only approved leaves
        },
      });
    } else if (userRole === 'teacher' || userRole === 'tutor') {
      approvedLeaves = await TeacherLeave.findAll({
        where: {
          email: userEmail,
          application_status: 'approved', // Only approved leaves
        },
      });
    }

    // If no approved leaves found, return empty balance
    if (!approvedLeaves || approvedLeaves.length === 0) {
      return res.status(200).json({ leaveBalance, email: userEmail, leaves: [] });
    }

    // Sum the number of leaves based on leave type
    approvedLeaves.forEach((leave) => {
      switch (leave.leave_type) {
        case 'casual':
          leaveBalance.casualLeaves += leave.no_of_leaves;
          break;
        case 'medical':
          leaveBalance.medicalLeaves += leave.no_of_leaves;
          break;
        case 'annual':
          leaveBalance.annualLeaves += leave.no_of_leaves;
          break;
        default:
          break; // Leave type unrecognized
      }
    });

    // Return the calculated leave balance along with the list of approved leaves
    res.status(200).json({ leaveBalance, email: userEmail, leaves: approvedLeaves });
  } catch (error) {
    console.error('Error fetching leave balance:', error);
    res.status(500).json({ error: 'An error occurred while fetching leave balance' });
  }
};






// Fetch leave applications based on role
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT payload
    const userEmail = req.user.email; // Get user email from JWT payload
    const userRole = req.user.role; // Get user role from JWT payload

    let leaves;

    // Fetch leave applications based on the user's role and email
    if (userRole === 'tutor') {
      // Fetch leave applications for the logged-in tutor by email
      leaves = await TeacherLeave.findAll({ where: { email: userEmail } });
    } else if (userRole === 'teacher') {
      // Fetch leave applications for other teachers
      leaves = await TeacherLeave.findAll({ where: { email: userEmail } });
    } else if (userRole === 'student') {
      // Fetch leave applications for students
      leaves = await StudentLeaves.findAll({ where: { email: userEmail } });
    }

    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ error: 'No leave applications found' });
    }

    res.status(200).json({ leaves });
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ error: 'An error occurred while fetching leave applications' });
  }
};

exports.getPendingApplicationsForHOD = async (req, res) => {
  try {
    const role = req.user.role;
    console.log("User Role:", role); // Logs user role

    // Ensure only HOD or Tutor have access
    if (role !== 'HOD' && role !== 'tutor') {
      return res.status(403).json({ error: 'Unauthorized access. Only HODs or Tutors can view these applications.' });
    }

    // Initialize arrays to hold leave data
    let teacherLeaves = [];
    let studentLeaves = [];

    // Fetch teacher leaves assigned to the HOD
    if (role === 'HOD') {
      teacherLeaves = await TeacherLeave.findAll({
        where: {
          application_status: 'pending',
          assigned_to: 'hod'
        },
      });
      console.log("Teacher Leaves Query Result:", teacherLeaves);
    }

    // Fetch pending student leaves assigned to HOD (with more than 3 days)
    if (role === 'HOD') {
      studentLeaves = await StudentLeaves.findAll({
        where: {
          application_status: 'pending',
          assigned_to: 'hod',
          no_of_leaves: { [Op.gt]: 3 }
        },
      });
      console.log("Student Leaves Query Result (HOD):", studentLeaves);
    }

    // Fetch tutor's class_id from the Tutor table if the role is Tutor
    if (role === 'tutor') {
      const tutor = await Tutor.findOne({
        where: {
          teacher_id: req.user.id // Assuming teacher_id is same as user ID in your system
        },
        attributes: ['class_id']
      });

      if (!tutor) {
        return res.status(404).json({ error: 'Tutor not found' });
      }

      const tutorClassId = tutor.class_id;
      console.log("Tutor's Class ID:", tutorClassId); // Log tutor's class_id

      // Fetch pending student leaves assigned to the tutor and filter by class_id
      studentLeaves = await StudentLeaves.findAll({
        where: {
          application_status: 'pending',
          assigned_to: 'tutor',
          class_id: tutorClassId
        },
      });

      console.log("Student Leaves Query Result (Tutor):", studentLeaves); // Log all leaves for the tutor
      console.log("Filtering student leaves for tutor's class_id:", tutorClassId);

      // Log class_id from student_leaves table for debugging
      studentLeaves.forEach(leave => {
        console.log("Student Leave Class ID:", leave.class_id); // Log class_id of each leave
      });
    }

    // Respond with the pending applications for either the HOD or Tutor
    res.status(200).json({
      pendingApplications: {
        teacherLeaves,
        studentLeaves
      }
    });

  } catch (error) {
    console.error('Error fetching pending applications for HOD/Tutor:', error);
    res.status(500).json({ error: 'An error occurred while fetching pending applications.' });
  }
};


exports.updateLeaveApplication = async (req, res) => {
  const { id } = req.params; // Leave application ID
  const { applicationStatus, managerRemarks, directorRemarks, hrRemarks } = req.body;
  const { role, id: userId } = req.user;

  try {
    let leave = null;

    // Tutors can only update student leaves assigned to their class
    if (role === 'tutor') {
      const tutor = await Tutor.findOne({
        where: { teacher_id: userId },
        attributes: ['class_id'],
      });

      if (!tutor) {
        return res.status(403).json({ error: 'Access denied: Tutor not found or unauthorized.' });
      }

      leave = await StudentLeaves.findOne({
        where: { id, class_id: tutor.class_id, assigned_to: 'tutor' },
      });
    } 
    // HOD can update leaves assigned to them
    else if (role === 'HOD') {
      leave = await StudentLeaves.findOne({ where: { id, assigned_to: 'hod' } }) ||
              await TeacherLeave.findOne({ where: { id, assigned_to: 'hod' } });
    }

    if (!leave) {
      return res.status(404).json({ error: 'Leave application not found or access denied.' });
    }

    // Update the leave application
    await leave.update({
      application_status: applicationStatus,
      manager_remarks: managerRemarks || leave.manager_remarks,
      director_remarks: directorRemarks || leave.director_remarks,
      hr_remarks: hrRemarks || leave.hr_remarks,
    });

    res.status(200).json({ message: 'Leave application updated successfully.' });
  } catch (error) {
    console.error('Error updating leave application:', error);
    res.status(500).json({ error: 'An error occurred while updating the leave application.' });
  }
};

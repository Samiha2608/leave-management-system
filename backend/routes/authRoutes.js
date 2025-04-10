// routes/authRoutes.js
const express = require('express');

const authController = require('./authController');
const upload = require('../config/multerConfig'); // If you have multer config
const auth = require('../middleware/auth');

const router = express.Router();

// User Routes

router.post('/login', authController.loginUser);
router.get('/user', auth, authController.getUserDetails);

// New Routes
router.post('/create-teacher', authController.createTeacher);
router.post('/create-class', authController.createClass);
router.post('/add-student', authController.addStudent);

router.get('/get-teachers', authController.getTeachers);
router.get('/get-classes', authController.getClasses);
router.post('/assign-tutor', authController.assignTutor);

router.post('/create-superadmin', authController.createSuperadmin);
router.post('/create-hod', authController.createHod);



module.exports = router;

const express = require('express');
const multer = require('multer');
const leaveController = require('../controllers/leaveController');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/leave', auth, upload.single('medicalFile'), leaveController.submitLeave);
router.get('/myApplications', auth, leaveController.getUserApplications);
// router.get('/allPendingApplications', auth, leaveController.getAllPendingApplications);
router.put('/updateLeave/:id', auth, leaveController.updateLeaveApplication);
router.get('/leaveBalance/:email', auth, leaveController.getLeaveBalance);
router.get('/leaves/:email', leaveController.getUserApplications);
// leaveRoutes.js

router.get('/getPendingApplicationsForHOD', auth, leaveController.getPendingApplicationsForHOD);

module.exports = router;

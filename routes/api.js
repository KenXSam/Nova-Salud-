const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Rutas para pacientes
router.get('/patients', patientController.getAllPatients);
router.get('/patients/search', patientController.searchPatients);
router.get('/patients/:id', patientController.getPatientById);
router.post('/patients', patientController.createPatient);
router.put('/patients/:id', patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);

// Aquí se pueden agregar más rutas en el futuro
// router.get('/doctors', doctorController.getAllDoctors);
// router.post('/appointments', appointmentController.createAppointment);
// etc.

module.exports = router;
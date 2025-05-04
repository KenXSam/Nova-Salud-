const { Patient } = require('../models');

// Controlador para operaciones relacionadas con pacientes
const patientController = {
  // Obtener todos los pacientes
  async getAllPatients(req, res) {
    try {
      const patients = await Patient.getAll();
      res.status(200).json({
        success: true,
        count: patients.length,
        data: patients
      });
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener pacientes',
        error: error.message
      });
    }
  },

  // Obtener un paciente por ID
  async getPatientById(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.getById(id);
      
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: `No se encontró paciente con ID ${id}`
        });
      }
      
      res.status(200).json({
        success: true,
        data: patient
      });
    } catch (error) {
      console.error(`Error al obtener paciente con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener paciente',
        error: error.message
      });
    }
  },

  // Crear un nuevo paciente
  async createPatient(req, res) {
    try {
      // Validación básica
      const { name, last_name, email } = req.body;
      if (!name || !last_name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Por favor proporcione nombre, apellido y email'
        });
      }
      
      const newPatient = await Patient.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Paciente creado exitosamente',
        data: newPatient
      });
    } catch (error) {
      console.error('Error al crear paciente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear paciente',
        error: error.message
      });
    }
  },

  // Actualizar un paciente
  async updatePatient(req, res) {
    try {
      const { id } = req.params;
      const updatedPatient = await Patient.update(id, req.body);
      
      if (!updatedPatient) {
        return res.status(404).json({
          success: false,
          message: `No se encontró paciente con ID ${id}`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Paciente actualizado exitosamente',
        data: updatedPatient
      });
    } catch (error) {
      console.error(`Error al actualizar paciente con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar paciente',
        error: error.message
      });
    }
  },

  // Eliminar un paciente
  async deletePatient(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Patient.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `No se encontró paciente con ID ${id}`
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Paciente eliminado exitosamente'
      });
    } catch (error) {
      console.error(`Error al eliminar paciente con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar paciente',
        error: error.message
      });
    }
  },

  // Buscar pacientes
  async searchPatients(req, res) {
    try {
      const { term } = req.query;
      
      if (!term) {
        return res.status(400).json({
          success: false,
          message: 'Por favor proporcione un término de búsqueda'
        });
      }
      
      const patients = await Patient.search(term);
      
      res.status(200).json({
        success: true,
        count: patients.length,
        data: patients
      });
    } catch (error) {
      console.error(`Error al buscar pacientes con término '${req.query.term}':`, error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar pacientes',
        error: error.message
      });
    }
  }
};

module.exports = patientController;
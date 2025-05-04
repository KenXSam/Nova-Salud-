const { pool } = require('../config/database');

class Patient {
  // Obtener todos los pacientes
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM patients');
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener pacientes: ${error.message}`);
    }
  }

  // Obtener un paciente por ID
  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      throw new Error(`Error al obtener paciente: ${error.message}`);
    }
  }

  // Crear un nuevo paciente
  static async create(patientData) {
    try {
      const { name, last_name, email, phone, birth_date, gender, medical_history } = patientData;
      
      const [result] = await pool.query(
        'INSERT INTO patients (name, last_name, email, phone, birth_date, gender, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, last_name, email, phone, birth_date, gender, medical_history]
      );
      
      return { id: result.insertId, ...patientData };
    } catch (error) {
      throw new Error(`Error al crear paciente: ${error.message}`);
    }
  }

  // Actualizar un paciente
  static async update(id, patientData) {
    try {
      const { name, last_name, email, phone, birth_date, gender, medical_history } = patientData;
      
      const [result] = await pool.query(
        'UPDATE patients SET name = ?, last_name = ?, email = ?, phone = ?, birth_date = ?, gender = ?, medical_history = ? WHERE id = ?',
        [name, last_name, email, phone, birth_date, gender, medical_history, id]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return { id, ...patientData };
    } catch (error) {
      throw new Error(`Error al actualizar paciente: ${error.message}`);
    }
  }

  // Eliminar un paciente
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM patients WHERE id = ?', [id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error al eliminar paciente: ${error.message}`);
    }
  }

  // Buscar pacientes por nombre o email
  static async search(term) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM patients WHERE name LIKE ? OR last_name LIKE ? OR email LIKE ?',
        [`%${term}%`, `%${term}%`, `%${term}%`]
      );
      
      return rows;
    } catch (error) {
      throw new Error(`Error al buscar pacientes: ${error.message}`);
    }
  }
}

module.exports = Patient;
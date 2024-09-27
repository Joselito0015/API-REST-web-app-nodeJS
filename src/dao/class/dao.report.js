const { Incident, Report } = require('../models/company.model');

class ReportDAO {
  // Post a report
  async subirReporte(reportData) {
    try {
        const newReport = new Report(reportData);
        const savedReport = await newReport.save();
        return savedReport; 
    } catch (error) {
        console.error('Error original:', error); // Registrar el error original
        error.message = 'Error al subir el reporte: ' + error.message; // Agregar más detalle al mensaje de error
        throw error; // Lanzar el error original
    }
}

  async getReportByIncidentId(incidentId) {
    try {  
      const report = await Report.findOne({ incidentId: incidentId });
      if (!report) {
        throw new Error('Reporte no encontrado');
      }
      return report;
    } catch (error) {
      throw error;
    }
  }
  
}



module.exports = ReportDAO;

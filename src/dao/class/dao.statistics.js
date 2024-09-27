const { Company, Incident } = require('../models/company.model');
// let cache = {};
// let cacheUserCompany = {};
// let cacheUserCompanyEachMonth = {};
class StatsDAO {
  // Get statistics by company
  async getStatisticsByCompanyId(companyId) {
    let Cuentas = {
      Casco: 0,
      Chaleco: 0,
      Guantes: 0,
      Lentes: 0,
      Celular: 0,
      Zapatos: 0,
    };
    try {
      Cuentas.Casco = await Incident.count({ ID_company: companyId, EPPs: 'Casco' });
      Cuentas.Chaleco = await Incident.count({ ID_company: companyId, EPPs: 'Chaleco' });
      Cuentas.Guantes = await Incident.count({ ID_company: companyId, EPPs: 'Guantes' });
      Cuentas.Lentes = await Incident.count({ ID_company: companyId, EPPs: 'Lentes' });
      Cuentas.Celular = await Incident.count({ ID_company: companyId, EPPs: 'Celular' });
      Cuentas.Zapatos = await Incident.count({ ID_company: companyId, EPPs: 'Zapatos' });

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by company sorted by month
  async getStatisticsByCompanyIdEachMonth(companyId) {
    try {
      let Cuentas = {
        Mes: [],
      };
      // Count number of incidents by each month of the current year
      const incidentsByYear = await Incident.find({ ID_company: companyId, date: { $gte: new Date(new Date().getFullYear(), 0, 1), $lt: new Date(new Date().getFullYear() + 1, 0, 1) } });

      // Meses del año
      const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      const incidentsByMonth = incidentsByYear.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);

      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: new Date(2024, index).toLocaleString('es-ES', { month: 'long' }),
          Registrados: 0,
          Amonestados: 0,
          Descartados: 0,
          Casco: 0,
          Chaleco: 0,
          Guantes: 0,
          Lentes: 0,
          Celular: 0,
          Zapatos: 0,
          Total: 0
        };

        incidents.forEach(incident => {
          CuentasMes.Total++;
          if (incident.Deleted) {
            CuentasMes.Descartados++;
            if (incident.Reported) {
              CuentasMes.Amonestados++;
            }
          } else {
            CuentasMes.Registrados++;
          }

          incident.EPPs.forEach(epp => {
            if (CuentasMes.hasOwnProperty(epp)) {
              CuentasMes[epp]++;
            }
          });
        });

        return CuentasMes;
      });
      
      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get incidents by intervals of 5 days each month
  // 1-5, 6-10, 11-15, 16-20, 21-25, 26-End
  async getIncidentsByIntervals(companyId) {
    try {
      let Cuentas = {
        Mes: [],
      };

      const incidentsByYear = await Incident.find({ ID_company: companyId, date: { $gte: new Date(new Date().getFullYear(), 0, 1), $lt: new Date(new Date().getFullYear() + 1, 0, 1) } });
      
      const incidentsByMonth = incidentsByYear.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);

      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: new Date(2024, index).toLocaleString('es-ES', { month: 'long' }),
          '1-5': 0,
          '6-10': 0,
          '11-15': 0,
          '16-20': 0,
          '21-25': 0,
          '26-End': 0,
          Total: 0
        };

        incidents.forEach(incident => {
          CuentasMes.Total++;
          const day = incident.date.getDate();
          if (day <= 5) {
            CuentasMes['1-5']++;
          } else if (day <= 10) {
            CuentasMes['6-10']++;
          } else if (day <= 15) {
            CuentasMes['11-15']++;
          } else if (day <= 20) {
            CuentasMes['16-20']++;
          } else if (day <= 25) {
            CuentasMes['21-25']++;
          } else {
            CuentasMes['26-End']++;
          }
        });

        return CuentasMes;
      });

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by user's company (for Supervisor)
  async getStatisticsByUserCompany(companyId, userId) {
    try {
      const users = await Company.findById(companyId, 'users -_id');
      const user = users.users.id(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      let Cuentas = {
        Nombre: user.name,
        Registrados: 0,
        Amonestados: 0,
        Descartados: 0,
        Casco: 0,
        Chaleco: 0,
        Guantes: 0,
        Lentes: 0,
        Celular: 0,
        Zapatos: 0,
        Total: 0
      };

      Cuentas.Total = await Incident.find({ ID_company: companyId, supervisor: user.name }).count();
      Cuentas.Registrados = await Incident.find({ ID_company: companyId, supervisor: user.name, Deleted: false }).count();
      Cuentas.Descartados = await Incident.find({ ID_company: companyId, supervisor: user.name, Deleted: true, Reported: false }).count();
      Cuentas.Amonestados = await Incident.find({ ID_company: companyId, supervisor: user.name, Deleted: true, Reported: true }).count();
      Cuentas.Casco = await Incident.find({ ID_company: companyId, supervisor: user.name, EPPs: 'Casco' }).count();
      Cuentas.Chaleco = await Incident.find({ ID_company: companyId, supervisor: user.name, EPPs: 'Chaleco' }).count();
      Cuentas.Guantes = await Incident.find({ ID_company: companyId, supervisor: user.name, EPPs: 'Guantes' }).count();
      Cuentas.Lentes = await Incident.find({ ID_company: companyId, supervisor: user.name, EPPs: 'Lentes' }).count();
      Cuentas.Celular = await Incident.find({ ID_company: companyId, supervisor: user.name, EPPs: 'Celular' }).count();
      Cuentas.Zapatos = await Incident.find({ ID_company: companyId, supervisor: user.name, EPPs: 'Zapatos' }).count();

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by all areas by each month
  async getStatisticsByAreasEachMonth(companyId) {
    try {
      const company = await Company.findById(companyId, 'areas -_id');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      const incidentsByYear = await Incident.find({ ID_company: companyId, date: { $gte: new Date(new Date().getFullYear(), 0, 1), $lt: new Date(new Date().getFullYear() + 1, 0, 1) } });
      const areas = company.areas;
      
      let Cuentas = {};

      // Count total of incidents by each area
      areas.forEach(area => {
        Cuentas[area.Name] = incidentsByYear.filter(incident => incident.areaName === area.Name).length;
      });

      // Count total of non area incidents
      Cuentas['Sin Área'] = incidentsByYear.filter(incident => !incident.areaName).length;

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics by user's company sorted by month (for User)
  async getStatisticsByUserCompanyEachMonth (companyId, userId) {
    
    try {
      const users = await Company.findById(companyId, 'users');
      const user = users.users.id(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      let Cuentas = {
        Nombre: user.name,
        Mes: [],
      };

      const incidentsCurrentYearWithSupervisor = await Incident.find({ ID_company: companyId, supervisor: user.name, date: { $gte: new Date(new Date().getFullYear(), 0, 1), $lt: new Date(new Date().getFullYear() + 1, 0, 1) } });
  
      const incidentsByMonth = incidentsCurrentYearWithSupervisor.reduce((acc, incident) => {
        const month = incident.date.getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(incident);
        return acc;
      }, []);
  
      Cuentas.Mes = incidentsByMonth.map((incidents, index) => {
        let CuentasMes = {
          nombre: new Date(2020, index).toLocaleString('es-ES', { month: 'long' }),
          Registrados: 0,
          Amonestados: 0,
          Descartados: 0,
          Casco: 0,
          Chaleco: 0,
          Guantes: 0,
          Lentes: 0,
          Celular: 0,
          Zapatos: 0,
          Total: 0
        };
  
        incidents.forEach(incident => {
          if (incident.supervisor !== user.name) {
            return;
          }
  
          CuentasMes.Total++;
          if (incident.Deleted) {
            CuentasMes.Descartados++;
            if (incident.Reported) {
              CuentasMes.Amonestados++;
            }
          } else {
            CuentasMes.Registrados++;
          }
  
          incident.EPPs.forEach(epp => {
            if (CuentasMes.hasOwnProperty(epp)) {
              CuentasMes[epp]++;
            }
          });
        });
  
        return CuentasMes;
      });

      return Cuentas;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StatsDAO;

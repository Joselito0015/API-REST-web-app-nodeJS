const {Company} = require('../models/company.model');
let cache = {};
class AreaDAO {
  async getAreasByCompanyId(companyId) {
    const cachedData = cache[companyId];
    if (cachedData) {
      // Every day in milliseconds
      const oneHour = 24 * 60 * 60 * 1000;
      const now = Date.now();
      if (now - cachedData.timestamp < oneHour) {
        return cachedData.data;
      }
    }
    try {
      const company = await Company.findById(companyId, 'areas');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }
      // Update the cache with the new data and the current timestamp
      cache[companyId] = {
        data: company.areas,
        timestamp: Date.now()
      };
      return company ? company.areas : [];
    } catch (error) {
      throw error;
    }
  }

  async getAreaById(companyId, areaId) {
    try {
      const company = await Company.findById(companyId, 'areas');
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const area = company.areas.find(area => area._id.toString() === areaId);
      if (!area) {
        throw new Error('Área no encontrada');
      }

      return area;
    } catch (error) {
      throw error;
    }
  }

  async addArea(companyId, areaData) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const newArea = {
        Name: areaData.Name
      };

      company.areas.push(newArea);
      const savedCompany = await company.save();
      return savedCompany.areas[savedCompany.areas.length - 1];
    } catch (error) {
      throw error;
    }
  }

  async updateArea(companyId, areaId, newData) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const area = company.areas.find(area => area._id.toString() === areaId);
      if (!area) {
        throw new Error('Área no encontrada');
      }

      area.Name = newData.Name;
      await company.save();
      return area;
    } catch (error) {
      throw error;
    }
  }

  async deleteArea(companyId, areaId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Compañía no encontrada');
      }

      const areaIndex = company.areas.findIndex(area => area._id.toString() === areaId);
      if (areaIndex === -1) {
        throw new Error('Área no encontrada');
      }

      const deletedArea = company.areas.splice(areaIndex, 1);
      await company.save();
      return deletedArea[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AreaDAO;

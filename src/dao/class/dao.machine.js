const {Company} = require('../models/company.model');

class MachineDAO {
    async getMachinesByCompanyId(companyId) {
        try {
            const company = await Company.findById(companyId, 'machines');
            return company.machines;
        }
        catch (error) {
            throw error;
        }
    }
    async addMachine(companyId, machineData) {
        try {
            const company = await Company.findById(companyId);
            if (!company.machines.includes(machineData)) {
                company.machines.push(machineData);
                const savedCompany = await company.save();
                return savedCompany.machines[savedCompany.machines.length - 1];
            } else {
                throw new Error('Machine ya existe');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteMachine(companyId, machineId) {
        try {
            const company = await Company.findById(companyId);
            const machineIndex = company.machines.findIndex(machine => machine._id.toString() === machineId);
            if (machineIndex === -1) {
                throw new Error('Machine not found');
            }
            company.machines.splice(machineIndex, 1);
            await company.save();
        }
        catch (error) {
            throw error;
        }
    }
};

module.exports = MachineDAO;
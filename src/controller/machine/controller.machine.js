const express = require('express');
const router = express.Router();
const MachineDAO = require('../../dao/class/dao.machine');

const Machine = new MachineDAO;

router.get('/:companyId/machines', async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const machines = await Machine.getMachinesByCompanyId(companyId);
        res.status(200).json(machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.post('/:companyId/machines', async (req, res) => {
    const companyId = req.params.companyId;
    const machineData = req.body;

    try {
        const newMachine = await Machine.addMachine(companyId, machineData);
        res.status(201).json({machine:newMachine, message: 'Oe parala pe causa. Todo el dia reportando huevadas.'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

module.exports = router;
const express = require('express');
const router = express.Router();
const MqttDAO = require('../../dao/class/dao.mqtt');

const Mqtt = new MqttDAO;

router.post('/:companyId/mensaje', async (req, res) => {
    const topic = req.body.topic;    
    const message = req.body.message; 

    try {
        const response = await Mqtt.sendAndReceive(topic, JSON.stringify(message)); 
        res.status(200).json({ topic, receivedMessage: response }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
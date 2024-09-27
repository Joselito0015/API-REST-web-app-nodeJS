const express = require('express');
const router = express.Router();
const IncidentDAO = require('../../dao/class/dao.incident');
const TokenDAO = require('../../dao/class/dao.token');
const cloudinary = require('cloudinary').v2;
const { Expo } = require('expo-server-sdk');

const Token = new TokenDAO;
const Incident = new IncidentDAO;
const expo = new Expo();

cloudinary.config({
  cloud_name: 'dmbtlv0hg',
  api_key: '381815326731569',
  api_secret: 'yBoghdZkYzBETXFy5Dlt9VgWnP8',
});

// Number of incidents by company
router.get('/:companyId/incidents/number', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const number = await Incident.numberIncidentsByCompanyId(companyId);
    res.status(200).json(number);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all incidents by company
router.get('/:companyId/incidents', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const incidents = await Incident.getAllIncidentsByCompanyId(companyId);
    //const incidents = await Incident.getIncidentsByCompanyId(companyId);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});
// Get all not deleted incidents by company
router.post('/:companyId/incidents/notdeleted', async (req, res) => {
  const companyId = req.params.companyId;
  const { limit, offset } = req.body;
  try {
    const incidents = await Incident.getAllIncidentsNotDeletedByCompanyId(companyId, limit, offset);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get the last 4 incidents by company
router.get('/:companyId/incidents/last', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const incidents = await Incident.getLastIncidentsByCompanyId(companyId);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get deleted incidents by company but limit
router.post('/:companyId/incidents/deleted/limit', async (req, res) => {
  const companyId = req.params.companyId;
  const { limit, offset } = req.body;
  try {
    const incidents = await Incident.getIncidentsDeletedByCompanyId(companyId, limit, offset);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all deleted incidents by company
router.get('/:companyId/incidents/deleted', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const incidents = await Incident.getAllIncidentsDeletedByCompanyId(companyId);
    //const incidents = await Incident.getIncidentsDeletedByCompanyId(companyId);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get specific incident by ID
router.get('/incidents/:id', async (req, res) => {
  const incidentId = req.params.id;
  try {
    const incident = await Incident.getIncidentByIdAndCompanyId(incidentId);
    //const incident = await Incident.getIncidentById(companyId, incidentId);
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Postea la IA
router.post('/:companyId/incidents', async (req, res) => {
  let url = [];
  // const companyId = req.params.companyId;
  const incidentData = req.body;
  // Verificar si hay datos de incidente en la solicitud
  if (!incidentData) {
    return res.status(400).json({ message: "Datos de entrada inválidos" });
  }
  try {
    // const tokens = await Token.getTokensByCompanyId(companyId);
    // const listTokens = tokens.map(token => token.token);
    // Verificar si hay una imagen en la solicitud
    if (incidentData.imageUrls && incidentData.imageUrls.length > 0) {
      // Subir la imagen a Cloudinary si está presente
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${incidentData.imageUrls[0]}`);
      url[0] = result.secure_url;
      incidentData.imageUrls = url;
    }
    // Agregar el incidente a la base de datos
    const newIncident = await Incident.addIncidentByCompany(incidentData);
    // const newIncident = await Incident.addIncident(companyId, incidentData);
    res.status(201).json(newIncident);
    // if (!newIncident.supervisor) {
    //   for (let token of listTokens) {
    //     if (!Expo.isExpoPushToken(token)) {
    //         throw new Error(`Push token ${token} is not a valid Expo push token`);
    //     }
    //     expo.sendPushNotificationsAsync([
    //         {
    //             to: token,
    //             title: `Nueva alerta de incidente`,
    //             body: `Se ha registrado un nuevo incidente en el área de ${newIncident.areaName} por la IA`,
    //         },
    //     ]);
    //   }
    // } else {
    //     for (let token of listTokens) {
    //       if (!Expo.isExpoPushToken(token)) {
    //           throw new Error(`Push token ${token} is not a valid Expo push token`);
    //       }
    //       expo.sendPushNotificationsAsync([
    //           {
    //               to: token,
    //               title: `Nueva alerta de incidente`,
    //               body: `Se ha registrado un nuevo incidente en el área de ${newIncident.areaName} por ${newIncident.supervisor}`,
    //           },
    //       ]);
    //     }
    // }
  } catch (error) {
    res.status(500).json({ message: "Surgió un error al crear el incidente" });
  }
});
// Postear incidente con url de imagen
router.post('/:companyId/incidents/image', async (req, res) => {
  // const companyId = req.params.companyId;
  const incidentData = req.body;
  // Verificar si hay datos de incidente en la solicitud
  if (!incidentData) {
    return res.status(400).json({ message: "Datos de entrada inválidos" });
  }
  try {
    // const tokens = await Token.getTokensByCompanyId(companyId);
    // const listTokens = tokens.map(token => token.token);
    const newIncident = await Incident.addIncidentByCompany(incidentData);
    res.status(201).json(newIncident);
    // if (!newIncident.supervisor) {
    //   for (let token of listTokens) {
    //     if (!Expo.isExpoPushToken(token)) {
    //         throw new Error(`Push token ${token} is not a valid Expo push token`);
    //     }
    //     expo.sendPushNotificationsAsync([
    //         {
    //             to: token,
    //             title: `Nueva alerta de incidente`,
    //             body: `Se ha registrado un nuevo incidente en el área de ${newIncident.areaName} por la IA`,
    //         },
    //     ]);
    //   }
    // } else {
    //     for (let token of listTokens) {
    //       if (!Expo.isExpoPushToken(token)) {
    //           throw new Error(`Push token ${token} is not a valid Expo push token`);
    //       }
    //       expo.sendPushNotificationsAsync([
    //           {
    //               to: token,
    //               title: `Nueva alerta de incidente`,
    //               body: `Se ha registrado un nuevo incidente en el área de ${newIncident.areaName} por ${newIncident.supervisor}`,
    //           },
    //       ]);
    //     }
    // }
  } catch (error) {
    res.status(500).json({ message: "Surgió un error al crear el incidente" });
  }
});
// Postear muchos incidentes
router.post('/:companyId/incidents/many', async (req, res) => {
  // const companyId = req.params.companyId;
  const incidentsData = req.body;
  // Verificar si hay datos de incidente en la solicitud
  if (!incidentsData || incidentsData.length === 0) {
    return res.status(400).json({ message: "Datos de entrada inválidos" });
  }
  try {
    // const tokens = await Token.getTokensByCompanyId(companyId);
    // const listTokens = tokens.map(token => token.token);
    const newIncidents = await Incident.addIncidentsByCompany(incidentsData);
    res.status(201).json(newIncidents);
    // for (let incident of newIncidents) {
    //   if (!incident.supervisor) {
    //     for (let token of listTokens) {
    //       if (!Expo.isExpoPushToken(token)) {
    //           throw new Error(`Push token ${token} is not a valid Expo push token`);
    //       }
    //       expo.sendPushNotificationsAsync([
    //           {
    //               to: token,
    //               title: `Nueva alerta de incidente`,
    //               body: `Se ha registrado un nuevo incidente en el área de ${incident.areaName} por la IA`,
    //           },
    //       ]);
    //     }
    //   } else {
    //       for (let token of listTokens) {
    //         if (!Expo.isExpoPushToken(token)) {
    //             throw new Error(`Push token ${token} is not a valid Expo push token`);
    //         }
    //         expo.sendPushNotificationsAsync([
    //             {
    //                 to: token,
    //                 title: `Nueva alerta de incidente`,
    //                 body: `Se ha registrado un nuevo incidente en el área de ${incident.areaName} por ${incident.supervisor}`,
    //             },
    //         ]);
    //       }
    //   }
    // }
  } catch (error) {
    res.status(500).json({ message: "Surgió un error al crear los incidentes" });
  }
});
// Actualizar un incidente existente
router.put('/:companyId/incidents/:incidentId', async (req, res) => {
  const incidentId = req.params.incidentId;
  const newData = req.body;
  await Incident.updateIncidentByCompany(incidentId, newData).then((result) => {
    res.status(201).json({ message: "Incidente actualizado" });
  }).catch((error) => {
    res.status(500).json({ message: "Error al actualizar" });
  });
  // const updatedIncident = await Incident.updateIncident(companyId, incidentId, newData);
});
// Ruta para eliminar un incidente
router.delete('/:companyId/incidents/:incidentId', async (req, res) => {
  const incidentId = req.params.incidentId;
  await Incident.deleteIncidentByCompany(incidentId).then((result) => {
    res.status(200).json({ message: "Incidente eliminado" });
  }).catch((error) => {
    res.status(500).json({ message: "Error al eliminar el incidente" });
  });
});

// Endpoint para obtener el resumen de incidentes del día
router.get('/:companyId/incidents/summary', async (req, res) => {
  const companyId = req.params.companyId;

  try {
    // Obtener la fecha actual en el huso horario de Lima (UTC-5)
    const limaTimezone = 'America/Lima';
    const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: limaTimezone }));

    // Obtener todos los incidentes del día para la compañía específica
    const incidents = await Incident.getIncidentsByCompanyIdAndDate(companyId,currentDate);

    // Calcular el resumen
    const summary = {
      Detections: incidents.length,
      IncompleteEPPs: incidents.reduce((total, incident) => total + incident.EPPs.length, 0),
      Reports: incidents.filter(incident => incident.Reported).length
    };

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:companyId/incidents/statistics', async (req, res) => {
  try {
    const weeklyStats = await Incident.getWeeklyStatistics();
    const monthlyStats = await Incident.getMonthlyStatistics();
    res.json({ weeklyStats, monthlyStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

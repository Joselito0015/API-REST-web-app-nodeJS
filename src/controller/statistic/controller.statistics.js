const { Router } = require('express')
const router = Router()
const StatsDAO = require('../../dao/class/dao.statistics');
const Statistics = new StatsDAO();

// Get all statistics by company
router.get('/:companyId/statistics', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const statistics = await Statistics.getStatisticsByCompanyId(companyId);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all statistics by user's company
router.get('/:companyId/statistics/:userId', async (req, res) => {
  const companyId = req.params.companyId;
  const userId = req.params.userId;
  try {
    const statistics = await Statistics.getStatisticsByUserCompany(companyId, userId);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get statistics by company by each month
router.get('/:companyId/stats/month', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const statistics = await Statistics.getStatisticsByCompanyIdEachMonth(companyId);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stats by intervals of 5 days each month during current year
router.get('/:companyId/stats/interval' , async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const statistics = await Statistics.getIncidentsByIntervals(companyId);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all statistics by all areas by each month
router.get('/:companyId/stats/areas', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const statistics = await Statistics.getStatisticsByAreasEachMonth(companyId);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Get all statistics by user's company by each month
router.get('/:companyId/statistics/:userId/month', async (req, res) => {
  const companyId = req.params.companyId;
  const userId = req.params.userId;
  try {
    const statistics = await Statistics.getStatisticsByUserCompanyEachMonth(companyId, userId);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const { Router } = require('express')

const router = Router()

const CompanyDAO = require('../../dao/class/dao.company');

const Company = new CompanyDAO;

// Obtener todas las compañías
router.get('/', async (req, res) => {
  try {
    const companies = await Company.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una compañía por su ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.getCompanyById(id);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva compañía
router.post('/', async (req, res) => {
  const companyData = req.body;
  try {
    const newCompany = await Company.createCompany(companyData);
    res.json(newCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una compañía
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const updatedCompany = await Company.updateCompany(id, newData);
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una compañía
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCompany = await Company.deleteCompany(id);
    res.json(deletedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/telegram/:telegramID', async (req, res) => {
  const telegramID = req.params.telegramID;
  try {
    const company = await Company.getCompanyByTelegramID(telegramID);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
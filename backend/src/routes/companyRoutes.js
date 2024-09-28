const express = require('express');
const { scrapeWebsite, getCompanies, getCompanyById } = require('../controllers/companyController');
const router = express.Router();

router.post('/scrape', scrapeWebsite);
router.get('/companies', getCompanies);
router.get('/company/:id', getCompanyById);
module.exports = router;

const express = require('express');
const { scrapeWebsite, getCompanies } = require('../controllers/companyController');
const router = express.Router();

router.post('/scrape', scrapeWebsite);
router.get('/companies', getCompanies);

module.exports = router;

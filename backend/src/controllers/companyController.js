const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Company = require('../models/Company');

const scrapeWebsite = async (req, res) => {
  const { domain } = req.body;

  try {
    const { data } = await axios.get(domain);
    const $ = cheerio.load(data);

    const name = $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const logo = $('link[rel="icon"]').attr('href');
    
    // Example social profile scraping
    const facebook = $('a[href*="facebook.com"]').attr('href');
    const linkedin = $('a[href*="linkedin.com"]').attr('href');
    const twitter = $('a[href*="twitter.com"]').attr('href');
    const instagram = $('a[href*="instagram.com"]').attr('href');

    // Scrape other information like phone, email, etc.
    const phoneNumber = '...'; // Add logic here
    const email = '...'; // Add logic here
    const address = '...'; // Add logic here

    // Use Puppeteer to get a screenshot of the website
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(domain);
    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    // Save company data in MongoDB
    const company = new Company({
      name, description, logo, website: domain,
      socialProfiles: { facebook, linkedin, twitter, instagram },
      address, phoneNumber, email, screenshot
    });
    
    await company.save();
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scraping website');
  }
};

const getCompanies = async (req, res) => {
  const companies = await Company.find();
  res.status(200).json(companies);
};

module.exports = { scrapeWebsite, getCompanies };

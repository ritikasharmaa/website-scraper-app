const puppeteer = require('puppeteer');
const Company = require('../models/Company');

const scrapeWebsite = async (req, res) => {
  const { domain } = req.body;

  try {
    // Use Puppeteer to scrape the website
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set User-Agent and other headers to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    });

    // Navigate to the domain
    await page.goto(domain, { waitUntil: 'networkidle2' });

    // Extract data using page.evaluate to run code in the page's context
    const scrapedData = await page.evaluate(() => {
      const name = document.querySelector('title')?.innerText || 'No title';
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || 'No description';
      const logo = document.querySelector('link[rel="icon"]')?.getAttribute('href') || 'No logo';

      // Scrape address, phone, and email
      const address = document.querySelector('address')?.innerText || 'Address not found'; // Adjust selector as needed
      const phone = document.querySelector('a[href^="tel:"]')?.innerText || 'Phone not found'; // Adjust selector as needed
      const email = document.querySelector('a[href^="mailto:"]')?.innerText || 'Email not found'; // Adjust selector as needed

      // Social media links (Example)
      const facebook = document.querySelector('a[href*="facebook.com"]')?.getAttribute('href') || 'No Facebook';
      const linkedin = document.querySelector('a[href*="linkedin.com"]')?.getAttribute('href') || 'No LinkedIn';
      const twitter = document.querySelector('a[href*="twitter.com"]')?.getAttribute('href') || 'No Twitter';
      const instagram = document.querySelector('a[href*="instagram.com"]')?.getAttribute('href') || 'No Instagram';

      return { name, description, logo, address, phone, email, facebook, linkedin, twitter, instagram };
    });

    // Take a screenshot of the website
    const screenshot = await page.screenshot({ encoding: 'base64' });

    // Close Puppeteer browser
    await browser.close();

    // Save the scraped data in MongoDB
    const company = new Company({
      name: scrapedData.name,
      description: scrapedData.description,
      logo: scrapedData.logo,
      address: scrapedData.address,
      phone: scrapedData.phone,
      email: scrapedData.email,
      website: domain,
      socialProfiles: {
        facebook: scrapedData.facebook,
        linkedin: scrapedData.linkedin,
        twitter: scrapedData.twitter,
        instagram: scrapedData.instagram,
      },
      screenshot: screenshot,
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
const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving company data' });
  }
};

module.exports = { scrapeWebsite, getCompanies, getCompanyById };

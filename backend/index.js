const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./src/routes/companyRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://root:password@localhost:27017/scraper?authSource=admin', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
app.use('/api', companyRoutes);

app.listen(5500, () => {
  console.log('Server running on port 5500');
});

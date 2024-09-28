const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/scraper', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', companyRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

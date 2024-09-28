import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';

const App = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList companies={companies} />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </Router>
  );
};

export default App;


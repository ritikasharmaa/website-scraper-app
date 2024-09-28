import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchDataForm from './components/FetchDataForm';
import CompanyList from './components/Company/CompanyList';
import CompanyDetail from './components/Company/CompanyDetail';

const App: React.FC = () => {
  return (
    <div className='bg-gray-50'>
    <Router>
      <FetchDataForm />
      <Routes>
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
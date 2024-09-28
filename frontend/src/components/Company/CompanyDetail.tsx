import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

interface Company {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
  socialProfiles: {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  address: string;
  phoneNumber: string;
  email: string;
  screenshot: string;
}

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/company/${id}`)
      .then(response => setCompany(response.data))
      .catch(error => console.error('Error fetching company details:', error));
  }, [id]);

  if (!company) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
     

        <nav className="text-sm mb-4">
          <span className="text-gray-500">Home</span> &gt; <span>{company.name}</span>
        </nav>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-24 h-24 mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
              <div className="flex items-center mb-2">
  <i className="fa fa-info-circle w-4 h-4 mr-2"></i>
  <span className="text-gray-600">Description</span>
</div>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="flex items-center mb-2">
                <i className="fa fa-phone w-4 h-4 mr-2"></i>
                <span>{company.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <i className="fa fa-envelope w-4 h-4 mr-2"></i>
                <span>{company.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Company Details</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fa fa-globe w-4 h-4 mr-2"></i>
                <span>{company.website}</span>
              </div>
              <div className="flex items-start">
                <i className="fa fa-globe w-4 h-4 mr-2 mt-1"></i>
                <p className="flex-1">{company.description}</p>
              </div>
              <div className="flex items-center">
                <i className="fa fa-envelope w-4 h-4 mr-2"></i>
                <span>{company.email}</span>
              </div>
              <div className="flex items-center">
                <i className="fa fa-facebook w-4 h-4 mr-2"></i>
                <a href={company.socialProfiles.facebook} className="text-blue-600">{company.socialProfiles.facebook.replace('https://www.facebook.com/', '')}</a>
              </div>
              <div className="flex items-center">
                <i className="fa fa-instagram w-4 h-4 mr-2"></i>
                <a href={company.socialProfiles.instagram} className="text-blue-600">{company.socialProfiles.instagram.replace('https://www.instagram.com/', '')}</a>
              </div>
              <div className="flex items-center">
                <i className="fa fa-twitter w-4 h-4 mr-2"></i>
                <a href={company.socialProfiles.twitter} className="text-blue-600">{company.socialProfiles.twitter.replace('https://twitter.com/', '')}</a>
              </div>
              <div className="flex items-center">
                <i className="fa fa-linkedin w-4 h-4 mr-2"></i>
                <a href={company.socialProfiles.linkedin} className="text-blue-600">{company.socialProfiles.linkedin.replace('https://www.linkedin.com/company/', '')}</a>
              </div>
              <div className="flex items-center">
                <i className="fa fa-map-marker w-4 h-4 mr-2"></i>
                <span>{company.address}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Screenshot of Webpage</h2>
            <img
              src={`data:image/png;base64,${company.screenshot}`}
              alt={`${company.name} website screenshot`}
              className="w-full rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Company {
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
    axios.get(`http://localhost:5000/api/companies/${id}`)
      .then(response => setCompany(response.data))
      .catch(error => console.error('Error fetching company details:', error));
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <p>{company.description}</p>
      <img src={company.logo} alt={`${company.name} logo`} className="w-20 h-20" />
      <div className="mt-4">
        <h2 className="font-bold">Contact Details</h2>
        <p>Email: {company.email}</p>
        <p>Phone: {company.phoneNumber}</p>
        <p>Address: {company.address}</p>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Social Profiles</h2>
        <p>Facebook: {company.socialProfiles.facebook}</p>
        <p>LinkedIn: {company.socialProfiles.linkedin}</p>
        <p>Twitter: {company.socialProfiles.twitter}</p>
        <p>Instagram: {company.socialProfiles.instagram}</p>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Website Screenshot</h2>
        <img src={`data:image/png;base64,${company.screenshot}`} alt="Website screenshot" />
      </div>
    </div>
  );
};

export default CompanyDetail;

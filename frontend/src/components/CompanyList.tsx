import React from 'react';
import { Link } from 'react-router-dom';

interface Company {
  _id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const CompanyList = ({ companies }: { companies: Company[] }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Companies</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>
                <Link to={`/company/${company._id}`} className="text-blue-500">{company.name}</Link>
              </td>
              <td>{company.description}</td>
              <td>{company.address}</td>
              <td>{company.phoneNumber}</td>
              <td>{company.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;

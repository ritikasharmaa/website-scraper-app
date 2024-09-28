import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useFetchCompanies } from './Company/hooks/useFetchCompanies';

const FetchDataForm: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {fetchCompanies} = useFetchCompanies()
const navigate = useNavigate()

  const handleFetchData = async () => {
    if (!domain) {
      setError('Please enter a domain URL.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/scrape`, { domain });

      
      if (response.status === 200) {
        setDomain("")
        fetchCompanies()
        navigate("/companies")
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-4 p-6 bg-white">
      <div>

      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain URL"
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      </div>
      <div>

      <button
        onClick={handleFetchData}
        disabled={loading}
        className="bg-violet-300 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
      >
        {loading ? 'Fetching...' : 'Fetch & Save Details'}
      </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FetchDataForm;

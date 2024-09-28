import { useEffect, useState } from "react";
import { Company } from "../../../types";
import { convertSocialProfiles } from "../../../helper";
import axios from "axios";

export const useFetchCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  
    const fetchCompanies = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/companies`;
        const response = await axios.get(apiUrl);
        
        // Convert the incoming data to include social profiles as an array
        const formattedData = response.data.map((company: any) => ({
          ...company,
          socialProfiles: convertSocialProfiles(company.socialProfiles),
        }));
  
        setCompanies(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to load companies');
        setLoading(false);
      }
    };
  
    // Fetch companies on mount
    useEffect(() => {
      fetchCompanies();
    }, []);
  
    return { companies, loading, error, fetchCompanies, setCompanies };
}
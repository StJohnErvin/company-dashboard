import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import CompanyCard from '../components/CompanyCard';
import DeleteButton from '../components/DeleteButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { Company } from '../interfaces/Company';
import React from 'react';

const Home = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch for page 1
    fetchCompanies(page);
  }, [page]);

  const fetchCompanies = async (pageNumber: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/companies`, {
        params: { page: pageNumber, limit: 5 },
      });
      const data: Company[] = response.data;

      if (data.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        // Append new companies to the previous list
        setCompanies((prev) => (pageNumber === 1 ? data : [...prev, ...data]));
      }
    } catch (error) {
      setError('Failed to load companies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectCompany = (id: number) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const handleDeleteRequest = () => {
    console.log('Deleting data for companies:', selectedCompanies);
    setSelectedCompanies([]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Company Dashboard</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <InfiniteScroll
        dataLength={companies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={<p className="text-center">No more companies to load</p>}
        style={{ overflow: 'auto', height: '80vh' }} // Ensure scrolling
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isSelected={selectedCompanies.includes(company.id)}
              toggleSelect={toggleSelectCompany}
            />
          ))}
        </div>
      </InfiniteScroll>

      <DeleteButton
        selectedCompanies={selectedCompanies}
        handleDelete={handleDeleteRequest}
      />
    </div>
  );
};

export default Home;

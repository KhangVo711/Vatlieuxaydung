import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TableRepo from './tableRepo/TableRepo.jsx';

export default function Repo() {
  const [repo, setRepo] = useState([]);
  const [months, setMonths] = useState([]);
  const [filters, setFilters] = useState({ month: '', search: '' });

  const fetchData = async (filters) => {
    try {
      const params = new URLSearchParams();
      if (filters.month) params.append('month', filters.month);
      const response = await axios.get(`http://localhost:5001/getRepo?${params.toString()}`);
      if (response.status === 200) setRepo(response.data.repo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMonths = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/getAvailableMonths`);
      if (res.status === 200) setMonths(res.data.months);
    } catch (error) {
      console.error('Error fetching months:', error);
    }
  };

  useEffect(() => {
    fetchMonths();
    fetchData(filters);
  }, []);

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  return (
    <div id="home" className="px-8 pt-5">
      <div className="w-full flex items-center justify-between mb-8 mt-3">
        <nav className="text-sm font-semibold">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center text-blue-500">
              <a href="#" className="text-gray-700">Kho hàng</a>
              <ChevronRightIcon className="w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <a href="#" className="text-gray-600">Thông tin kho hàng</a>
            </li>
          </ol>
        </nav>
      </div>

      <TableRepo repo={repo} months={months} onFilterChange={setFilters} />
    </div>
  );
}

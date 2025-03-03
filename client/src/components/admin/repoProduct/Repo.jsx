import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef, useContext } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../Context.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import TableRepo from './tableRepo/TableRepo.jsx';

export default function Repo() {


    const [repo, setRepo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getRepoSumAllMonth`);
                if (response.status === 200) {
                    setRepo(response.data.repo);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);
  
  return (
    <>
    <div id="home" className='px-8 pt-5'>
      {/* Nav*/}
      <div className='w-full flex items-center justify-between mb-8 mt-3'>
        <nav className="text-sm font-semibold">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center text-blue-500">
              <a href="#" className="text-gray-700">Kho hàng</a>
              <ChevronRightIcon className="w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <a href='#' className="text-gray-600">Thông tin kho hàng</a>
            </li>
          </ol>
        </nav>
      </div>

      <TableRepo repo={repo}  />

     
    </div>
    </>

  )
}
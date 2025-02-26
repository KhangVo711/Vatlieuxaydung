import React, {useState, useEffect, useContext} from 'react'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import {formatCurrency} from '../../../../utils/currency.jsx';
import {formatDateTime} from '../../../../utils/dateTime.jsx';
import axios from 'axios'
import ReactPaginate from 'react-paginate';

import { Context } from '../../../Context.jsx';

export default function TableOrder({handleEditClick, handleViewClick}) {
  const { loadStatus, setLoadStatus } = useContext(Context);
  const [dataOrder, setDataOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;


  const offset = currentPage * itemsPerPage;
  const currentOrder = dataOrder.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(dataOrder.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

    
  useEffect(() => {
    const fetchOrderData = () => {
        axios.get('http://localhost:5001/getOrder')
            .then((response) => {
                setDataOrder(response.data.order);
                setLoadStatus(false);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    };

    fetchOrderData();

    // Đặt interval để gọi lại API
    const interval = setInterval(fetchOrderData, 3000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
}, []); 

    return (
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Mã đơn hàng
              </th>
              <th scope="col" className="px-8 py-3">
                Mã khách hàng / Mã form
              </th>
              <th scope="col" className="px-4 py-3">
                Đơn vị vận chuyển
              </th>
              <th scope="col" className="px-4 py-3">
                Thời gian đặt
              </th>

              <th scope="col" className="px-4 py-3 text-right">
                Tổng giá
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Trạng thái
              </th>
              <th scope="col" className="text-center px-6 py-3 ">
                Hành động
              </th>
              
            </tr>
          </thead>
          <tbody>
            {currentOrder.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-4 py-4" >
                  {item.madh}
                </th>
                <td className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.makh ? item.makh : item.maform}
                </td>
                <td className="px-10 py-3 font-medium whitespace-nowrap dark:text-white">
                  {item.tendvvc}
                </td>
                <td className="px-4 py-3">
                  {formatDateTime(item.ngaydat)}
                </td>
            
                <td className="px-4 py-3 text-right">
                  {formatCurrency(item.tonggia+item.phivanchuyen)}
                </td>
                <td className="px-2.5 py-3 text-right">
                  {item.trangthai}
                </td>
            
                <td className="items-center justify-center px-6 py-4 flex">
                  <button onClick={() => handleViewClick(item)} className="transition duration-200 ease-out "><EyeIcon className="h-5 w-5 text-gray-500 dark:text-white hover:text-gray-400" /></button>
                  <button onClick={()=>handleEditClick(item)} className="transition duration-200 ease-out mx-2"><PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"← Trước"}
        nextLabel={"Sau →"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={
          "flex justify-center mt-4 space-x-2 fixed bottom-5 left-1/2 p-2 rounded-md"
        }
        pageClassName={
          "mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-800 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
        }
        previousClassName={
          "text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
        }
        nextClassName={
          "text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
        }
        activeClassName={
          "font-bold !bg-gray-800 text-white px-3 py-1 rounded-md "
        }
      />
      </>
    )
}
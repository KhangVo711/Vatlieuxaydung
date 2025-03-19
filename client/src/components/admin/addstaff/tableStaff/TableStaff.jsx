import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import {formatCurrency} from '../../../../utils/currency.jsx';
import { useState} from 'react';
import ReactPaginate from 'react-paginate';

export default function TableStaff({staff, handleEditStaffClick, handleDeleteStaffClick}) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; 

  
  const offset = currentPage * itemsPerPage;
  const currentStaff = staff.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(staff.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
    return(
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-pink-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
  <th scope="col" className="px-4 py-3">
    Mã nhân viên
  </th>
  <th scope="col" className="px-4 py-3">
    Tên nhân viên
  </th>
  <th scope="col" className="px-4 py-3">
    Email
  </th>
  <th scope="col" className="px-4 py-3">
    Số điện thoại
  </th>
  <th scope="col" className="px-7 py-3">
    Địa chỉ
  </th>
  <th scope="col" className="px-4 py-3">
    Chức vụ
  </th>
  <th scope="col" className="text-center px-4 py-3">
    Tổng lương
  </th>
  <th scope="col" className="text-center px-4 py-3">
    Hành động
  </th>
</tr>

          </thead>
          <tbody>
            {currentStaff.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-4 py-3" >
                  {item.manv}
                </th>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.tennv}
                </td>
                <td className="px-4 py-3">
                  {item.emailnv}
                </td>
            
                <td className="px-4 py-3">
                  {item.sdtnv}
                </td>
                <td className="px-7 py-3">
                  {item.diachinv}
                </td>
                <td className=" px-4 py-3">
                  {item.chucvunv}
                </td>
                <td className="px-10  py-3 text-center">
                  {formatCurrency(item.tongluong)}
                </td>
                <td className="items-center justify-center px-6 py-4 flex">
                  {/* <button onClick={() => handleViewStaffClick(item)} className="transition duration-200 ease-out "><EyeIcon className="h-5 w-5 text-gray-500 dark:text-white hover:text-gray-400" /></button> */}
                  <button onClick={()=>handleEditStaffClick(item)} className="transition duration-200 ease-out mx-2"><PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400" /></button>
                  <button onClick={()=>handleDeleteStaffClick(item)} className="transition duration-200 ease-out "><TrashIcon className="h-5 w-5 text-red-600 dark:text-red-500 hover:text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* React Paginate */}
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
import {formatCurrency} from '../../../../utils/currency.jsx';
import { useState} from 'react';
import ReactPaginate from 'react-paginate';

export default function TableViewUser({users}) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; 

  
  const offset = currentPage * itemsPerPage;
  const currentUsers = users.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
    return(
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
  <th scope="col" className="px-3 py-3">
    Mã khách hàng
  </th>
  <th scope="col" className="px-3 py-3">
    Tên khách hàng
  </th>
  <th scope="col" className="px-1 py-3">
    Email
  </th>
  <th scope="col" className="px-1 py-3">
    Số điện thoại
  </th>
  <th scope="col" className="px-14 py-3">
    Địa chỉ
  </th>
  <th scope="col" className="px-2 py-3">
    Số lần mua
  </th>
  <th scope="col" className="px-4 py-3">
    Tổng chi tiêu
  </th>
  
</tr>

          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-3 py-3" >
                  {item.makh}
                </th>
                <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.tenkh}
                </td>
                <td className="px-1 py-3">
                  {item.email}
                </td>
            
                <td className="px-1 py-3">
                  {item.sdt}
                </td>
                <td className="px-14 py-3">
                  {item.diachi}
                </td>
                <td className="px-10 py-3">
                  {item.so_lan_mua}
                </td>
                <td className="px-4 py-3 ">
                  {formatCurrency(item.tong_chi_tieu)}
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
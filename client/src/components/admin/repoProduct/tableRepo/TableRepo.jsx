import {formatCurrency} from '../../../../utils/currency.jsx';
import { useState} from 'react';
import ReactPaginate from 'react-paginate';

export default function TableRepo({repo}) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; 

  
  const offset = currentPage * itemsPerPage;
  const currentRepo = repo.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(repo.length / itemsPerPage);

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
    Mã sản phẩm
  </th>
  <th scope="col" className="px-20 py-3">
    Tên sản phẩm
  </th>
  <th scope="col" className="px-10 text-center py-3">
    Tổng số lượng nhập kho
  </th>
  {/* <th scope="col" className="px-1 py-3">
    Năm
  </th> */}
  
  
</tr>

          </thead>
          <tbody>
            {currentRepo.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-3 py-3" >
                  {item.masp}
                </th>
                <td className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.tensp}
                </td>
                <td className="px-10 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white py-3 ">
                  {item.total_quantity}
                </td>
                {/* <td className="px-1 py-3">
                  {item.year}
                </td> */}
                
               
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
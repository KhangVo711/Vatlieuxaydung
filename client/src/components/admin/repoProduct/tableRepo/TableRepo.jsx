import {formatCurrency} from '../../../../utils/currency.jsx';
import { useState} from 'react';
import ReactPaginate from 'react-paginate';

export default function TableRepo({repo}) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; 

  
  const offset = currentPage * itemsPerPage;
  const currentRepo = repo.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(repo.length / itemsPerPage);

 // Logic tính toán các trang hiển thị
 const getPageNumbers = () => {
  const maxDisplay = 3; // Hiển thị tối đa 3 trang
  let startPage = Math.max(0, currentPage - 1); // Bắt đầu từ trang trước trang hiện tại
  let endPage = Math.min(pageCount, startPage + maxDisplay); // Kết thúc sau 3 trang

  // Điều chỉnh nếu gần cuối
  if (endPage - startPage < maxDisplay && startPage > 0) {
    startPage = Math.max(0, endPage - maxDisplay);
  }

  const pages = [];
  for (let i = startPage; i < endPage; i++) {
    pages.push(i);
  }
  return pages;
};

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const pageNumbers = getPageNumbers();
    return(
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-pink-100 dark:bg-gray-700 dark:text-gray-400">
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
      {/* Phân trang tùy chỉnh */}
      <div className="flex justify-center mt-4 space-x-2 fixed bottom-5 left-1/2 p-2 rounded-md">
        {/* Nút Trước */}
        <button
          onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
          className="text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          disabled={currentPage === 0}
        >
          ← Trước
        </button>

        {/* Các số trang */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-800 hover:bg-gray-200 transition-all duration-200 cursor-pointer ${
              currentPage === page ? 'font-bold !bg-gray-800 text-white' : ''
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Nút Sau */}
        <button
          onClick={() => handlePageChange(Math.min(pageCount - 1, currentPage + 1))}
          className="text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          disabled={currentPage === pageCount - 1}
        >
          Sau →
        </button>
      </div>


      </>
    )
}
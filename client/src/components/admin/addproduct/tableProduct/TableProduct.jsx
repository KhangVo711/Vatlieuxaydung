import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../../../../utils/currency.jsx';
import { useState } from 'react';

export default function TableProduct({ product, handleEditProductClick, handleDeleteProductClick, handleViewProductClick }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState(''); // State for page input field
  const itemsPerPage = 6;

  const offset = currentPage * itemsPerPage;
  const currentProducts = product.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(product.length / itemsPerPage);

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
    if (page >= 0 && page < pageCount) {
      setCurrentPage(page);
      setPageInput(''); // Clear input after successful jump
    }
  };

  // Handle page input submission
  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10) - 1; // Convert to 0-based index
    if (!isNaN(pageNum) && pageNum >= 0 && pageNum < pageCount) {
      handlePageChange(pageNum);
    } else {
      setPageInput(''); // Clear invalid input
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-pink-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">Mã sản phẩm</th>
              <th scope="col" className="px-8 py-3">Tên sản phẩm</th>
              <th scope="col" className="px-4 py-3">Loại</th>
              <th scope="col" className="px-4 py-3">Nhà sản xuất</th>
              {/* <th scope="col" className="px-2 py-3 text-right">Biến thể</th> */}
              <th scope="col" className="text-center px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-4 py-4">{item.masp}</th>
                <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.tensp}</td>
                <td className="px-4 py-4">{item.tenloai}</td>
                <td className="px-4 py-4">{item.tennsx}</td>
                {/* <td className="px-2 py-4 text-right">{item.cobienthe === 1 ? 'Có' : 'Không'}</td> */}
                <td className="items-center justify-center px-6 py-4 flex">
                  <button onClick={() => handleViewProductClick(item)} className="transition duration-200 ease-out">
                    <EyeIcon className="h-5 w-5 text-gray-500 dark:text-white hover:text-gray-400" />
                  </button>
                  <button onClick={() => handleEditProductClick(item)} className="transition duration-200 ease-out mx-2">
                    <PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400" />
                  </button>
                  <button onClick={() => handleDeleteProductClick(item)} className="transition duration-200 ease-out">
                    <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-500 hover:text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang tùy chỉnh */}
      <div className="flex justify-center mt-4 space-x-2 fixed bottom-5 left-[45%] p-2 rounded-md user-select-none">
        {/* Nút Trang đầu */}
        <button
          onClick={() => handlePageChange(0)}
          className="text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          disabled={currentPage === 0}
        >
          Trang đầu
        </button>

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

        {/* Nút Trang cuối */}
        <button
          onClick={() => handlePageChange(pageCount - 1)}
          className="text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          disabled={currentPage === pageCount - 1}
        >
          Trang cuối
        </button>

        {/* Nhập số trang */}
        {/* <form onSubmit={handlePageInputSubmit} className="flex items-center ml-4">
          <input
            type="number"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            placeholder={`1-${pageCount}`}
            className="w-16 px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            min="1"
            max={pageCount}
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 text-gray-800 font-medium rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            Đi
          </button>
        </form> */}
      </div>
    </>
  );
}
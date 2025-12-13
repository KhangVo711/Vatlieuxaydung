import { EyeIcon, PencilSquareIcon, TrashIcon} from '@heroicons/react/24/solid';
import { useState, useEffect} from 'react';

export default function TableProducer({producer, handleViewProductClick, handleEditProductClick, handleDeleteProductClick}) {
    const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const pageCount = Math.ceil(producer.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentProducer = producer.slice(offset, offset + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 0) return;
    if (page > pageCount - 1) return;
    setCurrentPage(page);
  };

  // Reset về trang đầu khi dữ liệu thay đổi
  useEffect(() => {
    setCurrentPage(0);
  }, [producer]);

  const getPageNumbers = () => {
    const maxDisplay = 3;
    let start = Math.max(0, currentPage - 1);
    let end = Math.min(pageCount, start + maxDisplay);

    if (end - start < maxDisplay && start > 0) {
      start = Math.max(0, end - maxDisplay);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();
    return(
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-pink-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                Mã NSX
                            </th>
                            <th scope="col" className="px-14 py-3">
                                Tên NSX
                            </th>
                        

                            <th scope="col" className="px-2 py-3 ">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducer.map((pro, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-4 py-4" >
                                    {pro.mansx}
                                </th>
                                <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {pro.tennsx}
                                </td>

                              
                                <td className="px-2 py-4 flex">
                                    <button onClick={() => handleViewProductClick(pro)} className="transition duration-200 ease-out "><EyeIcon className="h-5 w-5 text-gray-500 dark:text-white hover:text-gray-400" /></button>
                                    <button onClick={()=>handleEditProductClick(pro)} className="transition duration-200 ease-out mx-2"><PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400" /></button>
                                    <button onClick={() => handleDeleteProductClick(pro)} className="transition duration-200 ease-out "><TrashIcon className="h-5 w-5 text-red-600 dark:text-red-500 hover:text-red-400" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Phân trang tùy chỉnh */}
<div className="flex justify-center mt-4 space-x-2 fixed bottom-5 left-[45%] p-2 rounded-md select-none">

  {/* Trang đầu */}
  <button
    onClick={() => handlePageChange(0)}
    disabled={currentPage === 0}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === 0
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    Trang đầu
  </button>

  {/* Trước */}
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 0}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === 0
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    ← Trước
  </button>

  {/* Số trang */}
  {pageNumbers.map((page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`mx-1 px-3 py-1 rounded-md border transition-all duration-200
        ${currentPage === page
          ? 'bg-gray-800 text-white font-bold'
          : 'bg-white text-gray-800 hover:bg-gray-200'
        }`}
    >
      {page + 1}
    </button>
  ))}

  {/* Sau */}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === pageCount - 1}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === pageCount - 1
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    Sau →
  </button>

  {/* Trang cuối */}
  <button
    onClick={() => handlePageChange(pageCount - 1)}
    disabled={currentPage === pageCount - 1}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === pageCount - 1
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    Trang cuối
  </button>
</div>

    </>
    )
}
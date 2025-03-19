import { formatDateTime } from '../../../../utils/dateTime.jsx';
import { formatCurrency } from '../../../../utils/currency.jsx';
import { useState } from 'react';

import ReactPaginate from 'react-paginate';

export default function TableInvoice({ dataInvoice, handleViewProductClick }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;


  const offset = currentPage * itemsPerPage;
  const currentInvoice = dataInvoice.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(dataInvoice.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-6 px-5">
        {Array.isArray(dataInvoice) &&
          currentInvoice.map((invoice, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-pink-800 dark:border-pink-700"
            >
              <div className="pb-3">
                <div className="bg-pink-300 w-full rounded-t-lg p-1.5">
                  <h2 className="text-center font-bold">Mã phiếu: {invoice.mapn}</h2>
                </div>
                <h2 className="text-center mt-1 font-semibold">
                  {formatDateTime(invoice.ngaylap)}
                </h2>
                <div className="p-1">
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold text-gray-800 ml-1.5">Người lập:</span> {invoice.nguoi_phu_trach}
                  </p>
                  <h2 className="mb-1">
                    <span className="font-bold text-gray-800 ml-1.5">Tên phiếu:</span> {invoice.tenpn}
                  </h2>
                  <div className="text-center">
                    <h2>
                      <span className="font-bold text-gray-800">Tổng giá</span>
                    </h2>
                    <p>{formatCurrency(invoice.tong_gia_theo_mapn)}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleViewProductClick(invoice)}
                    className="px-2 py-1.5 bg-pink-500 rounded-sm hover:bg-pink-600 text-white font-semibold mt-2 transition ease-in-out duration-150"
                    aria-label={`View details for invoice ${invoice.mapn}`}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
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
  );
}

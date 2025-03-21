import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

// Utility function to format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle empty or undefined case
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function TableBranch({ branches, handleEditBranchClick, handleDeleteBranchClick }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const offset = currentPage * itemsPerPage;
    const currentBranches = branches.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(branches.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-pink-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                Mã cửa hàng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên cửa hàng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Địa chỉ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kinh độ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Vĩ độ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Giờ hoạt động
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ngày tạo
                            </th>
                            <th scope="col" className="px-1 py-3">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBranches.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-4 py-4">
                                    {item.id}
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.tencuahang}
                                </td>
                                <td className="px-6 py-4">
                                    {item.diachi}
                                </td>
                                <td className="px-6 py-4">
                                    {item.kinhdo}
                                </td>
                                <td className="px-6 py-4">
                                    {item.vido}
                                </td>
                                <td className="px-6 py-4">
                                    {item.giohoatdong}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(item.created_at)}
                                </td>
                                <td className="px-1 py-4 flex">
                                    <button
                                        onClick={() => handleEditBranchClick(item)}
                                        className="transition duration-200 ease-out mx-2"
                                    >
                                        <PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBranchClick(item)}
                                        className="transition duration-200 ease-out"
                                    >
                                        <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-500 hover:text-red-400" />
                                    </button>
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
                    "flex justify-center mt-4 space-x-2 fixed bottom-5 left-1/2 p-2 rounded-md user-select-none"
                }
                pageClassName={
                    "mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-800 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                }
                pageLinkClassName={
                    "block w-full h-full"
                }
                previousClassName={
                    "text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                }
                nextClassName={
                    "text-gray-800 font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                }
                activeClassName={
                    "font-bold !bg-gray-800 text-white px-3 py-1 rounded-md"
                }
            />
        </>
    );
}
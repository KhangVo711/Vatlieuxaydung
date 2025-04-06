import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Feedback() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/get-contact");
                setContacts(response.data.order);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
                setLoading(false);
                console.error("Error fetching contacts:", err);
            }
        };

        fetchContacts();

        const intervalId = setInterval(fetchContacts, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center gap-y-3 w-full p-6">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-fit flex flex-col items-center gap-y-3 w-full p-6">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="h-fit flex flex-col items-center gap-y-3 p-6">
            <div className='w-full flex items-center justify-between mt-2 ml-3 mb-1'>
                <nav className="text-sm font-semibold">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center text-pink-500">
                            <a href="#" className="text-gray-700">Phản hồi</a>
                            <ChevronRightIcon className="w-3 h-3 mx-3" />
                        </li>
                        <li className="flex items-center">
                            <a href='#' className="text-gray-600">Liên hệ</a>
                        </li>
                    </ol>
                </nav>
            </div>
            <h1 className="text-2xl font-bold mb-2 uppercase">Danh sách liên hệ</h1>
            {contacts.length === 0 ? (
                <p>Chưa có danh sách liên hệ.</p>
            ) : (
                <div className="w-full max-w-7xl shadow-md sm:rounded-lg">
                    <div className="overflow-x-auto rounded-md">
                        <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-pink-100  dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3">
                                        Mã liên hệ
                                    </th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3">
                                        Tên
                                    </th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3">
                                        Số điện thoại
                                    </th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3">
                                        Chủ đề
                                    </th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3">
                                        Nội dung
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.malienhe}
                                        </th>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 dark:text-white">
                                            {item.hoten}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 dark:text-white">
                                            {item.email}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 dark:text-white">
                                            {item.sodienthoai}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 dark:text-white">
                                            {item.chude}
                                        </td>
                                        <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 dark:text-white">
                                            {item.noidung}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
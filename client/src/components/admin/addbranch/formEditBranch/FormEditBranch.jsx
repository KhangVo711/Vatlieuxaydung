import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function FormEditBranch({ formRefEdit, selectedBranch, setSelectedBranch, setLoadBranch }) {
    const [message, setMessage] = useState(''); 
    const [colorMessage, setColorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('admin') || Cookies.get('staff');
        setIsLoading(true);
        // Exclude created_at from the data sent to the backend
        const { created_at, ...branchDataToUpdate } = selectedBranch;

        // Basic client-side validation
        if (!branchDataToUpdate.tencuahang || !branchDataToUpdate.diachi || !branchDataToUpdate.kinhdo || !branchDataToUpdate.vido || !branchDataToUpdate.giohoatdong) {
            setMessage('Vui lòng điền đầy đủ thông tin cửa hàng.');
            setColorMessage('text-red-500');
            handleError();
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5001/editBranch`, branchDataToUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            // Only 200 is considered success
            if (response.status === 200) {
                
                setTimeout(() => {
                    setMessage('');
                    setIsLoading(false);
                handleSuccess();
                setMessage(response.data.message);
                setLoadBranch(true);
                setColorMessage('text-green-500');
                }, 1500);
                setTimeout(() => {
                    setMessage('');
                   
                }, 2000);
                
            }
        } catch (error) {
            // Improved error handling
            const errorMsg = error.response?.data?.message || 'Đã xảy ra lỗi không xác định.';
            setMessage(errorMsg);
            setColorMessage('text-red-500');
            handleError();
        }
    };

    const handleSuccess = () => {
        toast.success("Sửa thành công!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleError = () => {
        toast.error("Có lỗi xảy ra!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
                <form onSubmit={handleSubmitEdit} ref={formRefEdit} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16">
                    <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Sửa cửa hàng</h2>
                    {message && <p className={`${colorMessage} text-sm text-center mb-3`}>{message}</p>}

                    <div className="mb-3">
                        <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã cửa hàng</label>
                        <p id="id" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{selectedBranch?.id || ""}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tencuahang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên cửa hàng</label>
                        <input
                            type="text"
                            id="tencuahang"
                            name="tencuahang"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={selectedBranch?.tencuahang || ""}
                            onChange={(e) => setSelectedBranch({ ...selectedBranch, tencuahang: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="diachi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input
                            type="text"
                            id="diachi"
                            name="diachi"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={selectedBranch?.diachi || ""}
                            onChange={(e) => setSelectedBranch({ ...selectedBranch, diachi: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="kinhdo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kinh độ</label>
                        <input
                            type="text"
                            id="kinhdo"
                            name="kinhdo"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={selectedBranch?.kinhdo || ""}
                            onChange={(e) => setSelectedBranch({ ...selectedBranch, kinhdo: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vĩ độ</label>
                        <input
                            type="text"
                            id="vido"
                            name="vido"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={selectedBranch?.vido || ""}
                            onChange={(e) => setSelectedBranch({ ...selectedBranch, vido: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="giohoatdong" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ hoạt động</label>
                        <input
                            type="text"
                            id="giohoatdong"
                            name="giohoatdong"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={selectedBranch?.giohoatdong || ""}
                            onChange={(e) => setSelectedBranch({ ...selectedBranch, giohoatdong: e.target.value })}
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="created_at" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày tạo</label>
                        <p id="created_at" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {selectedBranch?.created_at || ""}
                        </p>
                    </div> */}

                    <div className='flex items-center justify-center w-full'>
                    <button type="submit" disabled={isLoading} className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 transition duration-150 ease-in-out">{isLoading ? 'Đang xử lý...' : 'Đồng ý'}</button>
                    </div>
                </form>
            </div>
        </>
    );
}
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {formatDateTime} from '../../../../utils/dateTime.jsx';

export default function FormEditPromo({ formRefEdit, selectedPromo, setSelectedPromo, setLoadPromo }) {

    const [message, setMessage] = useState(''); 
    const [colorMessage, setColorMessage] = useState('');
    
    const formatDateTimeLocal = (dateTime) => {
        if (!dateTime) return '';
        return dateTime.split('.')[0]; // Bỏ phần giây và 'Z'
    };
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
                const token = Cookies.get('admin') || Cookies.get('staff');
                const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

                const startDate = new Date(new Date(selectedPromo?.thoigianbatdaukm).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
                const endDate = new Date(new Date(selectedPromo?.thoigianketthuckm).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
            
                const today = new Date(now.setHours(0, 0, 0, 0));
                const startDay = new Date(startDate.setHours(0, 0, 0, 0));
                const endDay = new Date(endDate.setHours(0, 0, 0, 0));
            
                // if (startDay < today) {
                //     setColorMessage('text-red-600');
                //     setMessage('Thời gian bắt đầu khuyến mãi phải từ ngày hiện tại trở đi.');
                //     return;
                // }
            
                if (endDay < today) {
                    setColorMessage('text-red-600');
                    setMessage('Thời gian kết thúc khuyến mãi không được nằm ở quá khứ.');
                    return;
                }
            
                if (endDay <= startDay) {
                    setColorMessage('text-red-600');
                    setMessage('Thời gian kết thúc phải ít nhất 1 ngày sau thời gian bắt đầu.');
                    return;
                }
            
                if (endDay.getTime() === startDay.getTime() && endDate <= startDate) {
                    setColorMessage('text-red-600');
                    setMessage('Giờ kết thúc phải lớn hơn giờ bắt đầu.');
                    return;
                }
        try {
            
        const response = await axios.post(`http://localhost:5001/editPromo`, selectedPromo, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            withCredentials: true

        });
        if (response.status === 200) {
            setMessage(response.data.message);
            setLoadPromo(true);
            setColorMessage('text-green-500');
            setTimeout(() => {
                setMessage('');
            }, 1500);
            handleSuccess();
        }
        if(response.status === 400){
            setMessage(response.data.message);
            setColorMessage('text-red-500');
        handleError();
            
        }
    } catch (error) {
        handleError();
        setMessage(error.response ? error.response.data.message : 'An error occurred');
        setColorMessage('text-red-500');
    }
    }
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
            <form onSubmit={handleSubmitEdit} ref={formRefEdit} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
                <h2 className=' uppercase font-bold tracking-wider text-lg text-center'>Sửa khuyến mãi</h2>
                <p className='mb-2 uppercase tracking-wider text-sm text-center'>Mã sản phẩm : <span className='font-bold'>{selectedPromo?.masp}</span></p>
                {message && <p className={`${colorMessage} text-sm text-center mb-3`}>{message}</p>}
                <div className="mb-3">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã khuyến mãi</label>
                    <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{selectedPromo?.makm || ""}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề khuyến mãi</label>
                    <input
                        type="text"
                        id="name"
                        name="tenkm"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={selectedPromo?.tenkm || ""}
                        onChange={(e) => setSelectedPromo({ ...selectedPromo, tenkm: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Khuyến mãi</label>
                    <input
                        type="text"
                        id="name"
                        name="km"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={selectedPromo?.km || ""}
                        onChange={(e) => setSelectedPromo({ ...selectedPromo, km: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian bắt đầu</label>
                    <input
                        type="hidden"
                        id="name"
                        name="thoigianbatdaukm"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={formatDateTimeLocal(selectedPromo?.thoigianbatdaukm) || ""}
                        onChange={(e) => setSelectedPromo({ ...selectedPromo, thoigianbatdaukm: e.target.value })}
                    />
                    <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{formatDateTime(selectedPromo?.thoigianbatdaukm)}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian kết thúc</label>
                    <input
                        type="datetime-local"
                        id="name"
                        name="thoigianketthuckm"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={formatDateTimeLocal(selectedPromo?.thoigianketthuckm) || ""}
                        onChange={(e) => setSelectedPromo({ ...selectedPromo, thoigianketthuckm: e.target.value })}
                    />
                </div>

                <div className='flex items-center justify-center w-full'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đồng ý</button>
                </div>
            </form>
        </div>
        </>
    )
}
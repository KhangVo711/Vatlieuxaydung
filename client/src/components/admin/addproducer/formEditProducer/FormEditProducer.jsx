import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FormEditProducer({ formRefEdit, selectedProducer, setSelectedProducer, setLoadProducer }) {
    const [message, setMessage] = useState('');
    const [colorMessage, setColorMessage] = useState('');


    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5001/editProducer`, selectedProducer, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                setLoadProducer(true);
                setColorMessage('text-green-500');
                setTimeout(() => {
                    setMessage('');
                }, 1500);
                handleSuccess();
            }
            if (response.status === 400) {
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
        <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
            <form onSubmit={handleSubmitEdit} ref={formRefEdit} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
                <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Sửa nhà sản xuất</h2>
                {message && <p className={`${colorMessage} text-sm text-center mb-3`}>{message}</p>}

                <div className="mb-5 flex">
                    <div className="w-1/3 mr-1">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã nhà sản xuất</label>
                        <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{selectedProducer?.mansx || ""}</p>
                    </div>
                    <div className="w-2/3 ml-1">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên nhà sản xuất</label>
                        <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder='Tên nhà sản xuất'
                            name='tennsx'
                            value={selectedProducer?.tennsx || ""}
                            onChange={(e) => setSelectedProducer({ ...selectedProducer, tennsx: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder='Email'
                        name='email'
                        value={selectedProducer?.email || ""}
                        onChange={(e) => setSelectedProducer({ ...selectedProducer, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                    <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder='Địa chỉ'
                        name='diachi'
                        value={selectedProducer?.diachi || ""}
                        onChange={(e) => setSelectedProducer({ ...selectedProducer, diachi: e.target.value })}
                    />
                </div>


                <div className='flex items-center justify-center w-full'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đồng ý</button>
                </div>
            </form>
        </div>
    )
}